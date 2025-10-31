// src/pages/Producao/SequenciamentoPage.jsx - ATUALIZADO (com Drag-and-Drop)
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

// 1. Importações necessárias do dnd-kit
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ---
// 2. Componente "Card da Ordem" que pode ser arrastável
// ---
function SortableOrdemCard({ ordem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, // Estado para saber se está sendo arrastado
  } = useSortable({ id: ordem.id_ordem });

  // Estilos para o "drag" e para destacar quando arrastado
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderLeft: `5px solid ${ordem.prioridade === 'Alta' ? '#e74c3c' : '#3498db'}`,
    padding: '15px',
    backgroundColor: isDragging ? '#333' : 'rgba(255, 255, 255, 0.1)', // Destaque
    borderRadius: '8px',
    marginBottom: '10px',
    cursor: 'grab', // Muda o cursor
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 100 : 10,
    position: 'relative',
    boxShadow: isDragging ? '0 5px 15px rgba(0,0,0,0.3)' : 'none'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <strong>{ordem.codigo_ordem}</strong> (Prioridade: {ordem.prioridade})
      <p style={{ margin: '5px 0 0', color: '#ccc' }}>
        {ordem.ambiente || 'Sem ambiente'}
      </p>
      <small>Cliente: {ordem.cliente ? ordem.cliente.nome_razao_social : 'N/A'}</small>
    </div>
  );
}

// ---
// 3. Componente principal da página
// ---
function SequenciamentoPage() {
  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Configuração dos sensores do Dnd-Kit (para clique/toque)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Começa a arrastar após mover 5px (evita cliques acidentais)
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/ordens-producao');
        // Filtra para mostrar apenas ordens "Abertas" ou "Em Execução"
        const pendentes = response.data.filter(
          o => o.status === 'Aberta' || o.status === 'Em Execução'
        );
        // NOTA: No futuro, você deve ordenar 'pendentes' com base
        // em uma coluna "ordem_sequencia" do seu banco de dados.
        setOrdens(pendentes);
      } catch (error) {
        console.error("Erro ao buscar ordens:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrdens();
  }, []);

  // 4. Esta função é chamada QUANDO VOCÊ SOLTA um card
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setOrdens((items) => {
        const oldIndex = items.findIndex(item => item.id_ordem === active.id);
        const newIndex = items.findIndex(item => item.id_ordem === over.id);
        
        // 'arrayMove' é uma função helper do dnd-kit que reordena o array
        return arrayMove(items, oldIndex, newIndex);
      });

      // --- IMPORTANTE ---
      // Aqui você deve fazer uma chamada à API para salvar a nova ordem no backend.
      // Exemplo (requer implementação no backend):
      // const novaSequencia = ordens.map(o => o.id_ordem);
      // api.post('/api/producao/sequenciar', { sequencia: novaSequencia });
    }
  }

  return (
    <div>
      <h1>↔️ Sequenciamento de Produção (REQ004)</h1>
      <p>Arraste e solte as ordens abaixo para definir a fila de produção.</p>
      
      <div style={{
        marginTop: '30px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3 style={{ textAlign: 'left', color: '#f55f29' }}>Fila de Produção</h3>
        {loading && <p>Carregando ordens...</p>}
        
        {/* 5. Envolvemos a lista com os contextos do Dnd-Kit */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={ordens.map(o => o.id_ordem)} // Passa os IDs para o Dnd-Kit
            strategy={verticalListSortingStrategy}
          >
            {/* Lista de ordens */}
            {ordens.map(ordem => (
              <SortableOrdemCard key={ordem.id_ordem} ordem={ordem} />
            ))}
          </SortableContext>
        </DndContext>
        
        {ordens.length === 0 && !loading && <p>Nenhuma ordem pendente encontrada.</p>}
      </div>
    </div>
  );
}

export default SequenciamentoPage;
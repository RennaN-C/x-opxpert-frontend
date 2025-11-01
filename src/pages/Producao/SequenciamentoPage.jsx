
import React, { useState, useEffect } from 'react';
import api from '../../services/api';


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


function SortableOrdemCard({ ordem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, 
  } = useSortable({ id: ordem.id_ordem });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderLeft: `5px solid ${ordem.prioridade === 'Alta' ? '#e74c3c' : '#3498db'}`,
    padding: '15px',
    backgroundColor: isDragging ? '#333' : 'rgba(255, 255, 255, 0.1)', 
    borderRadius: '8px',
    marginBottom: '10px',
    cursor: 'grab', 
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



function SequenciamentoPage() {
  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      
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
       
        const pendentes = response.data.filter(
          o => o.status === 'Aberta' || o.status === 'Em Execução'
        );
      
        setOrdens(pendentes);
      } catch (error) {
        console.error("Erro ao buscar ordens:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrdens();
  }, []);

  
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setOrdens((items) => {
        const oldIndex = items.findIndex(item => item.id_ordem === active.id);
        const newIndex = items.findIndex(item => item.id_ordem === over.id);
        
        
        return arrayMove(items, oldIndex, newIndex);
      });

      
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
        
        {}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={ordens.map(o => o.id_ordem)} 
            strategy={verticalListSortingStrategy}
          >
            {}
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
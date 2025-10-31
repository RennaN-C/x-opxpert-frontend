// src/pages/Producao/OrdensProducao.jsx - ATUALIZADO
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

// Componente helper para a barra de progresso
const ProgressBar = ({ progresso }) => {
  const progress = Math.max(0, Math.min(100, progresso || 0));
  // Define a cor da barra com base no progresso
  const getBarColor = (p) => {
    if (p < 40) return '#e74c3c'; // Vermelho/Laranja
    if (p < 80) return '#3498db'; // Azul
    return '#2ecc71'; // Verde
  };

  return (
    <div className="progress-bar-container">
      <div 
        className="progress-bar" 
        style={{ width: `${progress}%`, backgroundColor: getBarColor(progress) }}
      >
        {progress}%
      </div>
    </div>
  );
};

// Componente helper para o status
const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Aberta':
      case 'Pendente':
        return 'status-pendente';
      case 'Em Execução':
      case 'Apontando': // Do protótipo
        return 'status-execucao';
      case 'Concluída':
        return 'status-concluida';
      case 'Cancelada':
        return 'status-cancelada';
      default:
        return 'status-default';
    }
  };
  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

function OrdensProducaoPage() {
  const [ordens, setOrdens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        const response = await api.get('/api/ordens-producao');
        setOrdens(response.data);
      } catch (error) {
        console.error("Erro ao buscar ordens de produção:", error);
        alert("Não foi possível carregar as ordens de produção.");
      }
    };
    fetchOrdens();
  }, []);

  // Função para navegar para detalhes (preparando o caminho)
  const handleRowClick = (id) => {
    // navigate(`/producao/ordens/${id}`); // Descomente quando a página de detalhe existir
    console.log(`Navegar para detalhes da ordem ${id}`);
  };

  return (
    <div>
      <h1>📋 Ordens de Produção</h1>
      <p>Acompanhe o status de todas as ordens de produção em tempo real.</p>
      <table className="tabela-interativa"> {/* Adicionada classe para hover */}
        <thead>
          <tr>
            <th>Código</th>
            <th>Ambiente</th> {/* Do protótipo */}
            <th>Cliente</th> {/* Do REQ001 */}
            <th>Data Início</th>
            <th>Prioridade</th> {/* Do REQ001 */}
            <th>Status</th> {/* REQ003 */}
            <th>Progresso</th> {/* Do Protótipo */}
          </tr>
        </thead>
        <tbody>
          {ordens.map(ordem => (
            <tr key={ordem.id_ordem} onClick={() => handleRowClick(ordem.id_ordem)} title="Clique para ver detalhes">
              <td>{ordem.codigo_ordem}</td>
              <td>{ordem.ambiente || 'N/A'}</td>
              {/* O backend agora envia o objeto 'cliente' aninhado */}
              <td>{ordem.cliente ? ordem.cliente.nome_razao_social : 'N/A'}</td>
              <td>{new Date(ordem.data_inicio).toLocaleDateString()}</td>
              <td>{ordem.prioridade || 'Média'}</td>
              <td>
                <StatusBadge status={ordem.status} />
              </td>
              <td>
                <ProgressBar progresso={ordem.progresso} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdensProducaoPage;
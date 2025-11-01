import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext'; 


const ApontamentoModal = ({ ordem, onClose, onSave }) => {
  const [quantidade, setQuantidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showNotification } = useNotification(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quantidade || parseInt(quantidade, 10) <= 0) {
      setError('A quantidade deve ser um número maior que zero.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await api.post(`/api/ordens-producao/${ordem.id_ordem}/apontar`, {
        quantidade_apontada: parseInt(quantidade, 10)
      });
      
      showNotification('Apontamento salvo com sucesso!', 'success');
      onSave(); 
    } catch (err) {
      
      setError(err.response?.data?.erro || 'Falha ao salvar apontamento.');
      setLoading(false);
    }
  };

 
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Apontamento de Produção</h2>
        <p>Ordem: <strong>{ordem.codigo_ordem}</strong></p>
        <p>Planejado: {ordem.quantidade_planejada} | Já Produzido: {ordem.quantidade_produzida}</p>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="quantidade_apontada">Quantidade Produzida (Agora):</label>
          <input
            type="number"
            id="quantidade_apontada"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Ex: 10"
            autoFocus
          />
          {error && <p className="modal-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={loading} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Salvando...' : 'Salvar Apontamento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const ProgressBar = ({ progresso }) => { const progress = Math.max(0, Math.min(100, progresso || 0)); const getBarColor = (p) => { if (p < 40) return '#e74c3c'; if (p < 80) return '#3498db'; return '#2ecc71'; }; return ( <div className="progress-bar-container"> <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: getBarColor(progress) }} > {progress}% </div> </div> ); };
const StatusBadge = ({ status }) => { const getStatusClass = (status) => { switch (status) { case 'Aberta': case 'Pendente': return 'status-pendente'; case 'Em Execução': case 'Apontando': return 'status-execucao'; case 'Concluída': return 'status-concluida'; case 'Cancelada': return 'status-cancelada'; default: return 'status-default'; } }; return (<span className={`status-badge ${getStatusClass(status)}`}>{status}</span>); };



function OrdensProducaoPage() {
  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalInfo, setModalInfo] = useState(null);
  const { showNotification } = useNotification(); 
  const navigate = useNavigate();

  const fetchOrdens = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/ordens-producao');
      setOrdens(response.data);
    } catch (error) {
      console.error("Erro ao buscar ordens de produção:", error);
      
      showNotification('Não foi possível carregar as ordens.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdens();
  }, []);

  const handleOpenModal = (ordem, e) => {
    e.stopPropagation(); 
    setModalInfo(ordem);
  };
  
  const handleSaveAndClose = () => {
    setModalInfo(null);
    fetchOrdens();
  };

  const handleRowClick = (id) => {
    console.log(`Navegar para detalhes da ordem ${id}`);
  };

  
  return (
    <div>
      {modalInfo && (
        <ApontamentoModal
          ordem={modalInfo}
          onClose={() => setModalInfo(null)}
          onSave={handleSaveAndClose}
        />
      )}
      <h1>📋 Ordens de Produção</h1>
      <p>Acompanhe o status de todas as ordens de produção em tempo real.</p>
      
      {loading && <p>Carregando ordens...</p>}
      
      <table className="tabela-interativa">
        <thead>
          <tr>
            <th>Código</th>
            <th>Ambiente</th>
            <th>Cliente</th>
            <th>Responsável (REQ006)</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Progresso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordens.map(ordem => (
            <tr key={ordem.id_ordem} onClick={() => handleRowClick(ordem.id_ordem)} title="Clique para ver detalhes">
              <td>{ordem.codigo_ordem}</td>
              <td>{ordem.ambiente || 'N/A'}</td>
              <td>{ordem.cliente ? ordem.cliente.nome_razao_social : 'N/A'}</td>
              <td>{ordem.responsavel ? ordem.responsavel.nome_completo : 'N/A'}</td>
              <td>{ordem.prioridade || 'Média'}</td>
              <td>
                <StatusBadge status={ordem.status} />
              </td>
              <td>
                <ProgressBar progresso={ordem.progresso} />
              </td>
              <td style={{ textAlign: 'center' }}>
                <button
                  className="btn-acao-apontar"
                  title="Apontar Produção"
                  onClick={(e) => handleOpenModal(ordem, e)}
                  disabled={ordem.status === 'Concluída' || ordem.status === 'Cancelada'}
                >
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdensProducaoPage;
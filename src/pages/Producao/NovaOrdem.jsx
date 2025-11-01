import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useNotification } from '../../context/NotificationContext'; 

function NovaOrdemPage() {
  const navigate = useNavigate();
  const { showNotification } = useNotification(); 
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    descricao: '',
    quantidade_planejada: '',
    data_inicio: new Date().toISOString().split('T')[0],
    id_cliente: '',
    prioridade: 'Média',
    ambiente: '',
    id_responsavel: ''
  });

  useEffect(() => {
    api.get('/api/clientes')
      .then(res => setClientes(res.data)) 
      .catch(err => console.error("Erro ao buscar clientes:", err));
      
    api.get('/api/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error("Erro ao buscar usuários:", err));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.quantidade_planejada) {
      
      showNotification('Por favor, preencha a quantidade planejada.', 'error');
      return;
    }
    
    try {
      await api.post('/api/ordens-producao', formData);
      
      showNotification('Ordem de produção criada com sucesso!', 'success');
      navigate('/producao/ordens');
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
     
      showNotification('Falha ao criar ordem de produção.', 'error');
    }
  };

  
  return (
    <div>
      <h1>➕ Nova Ordem de Produção</h1>
      <p>Preencha os dados para criar uma nova ordem.</p>
      <form onSubmit={handleSubmit} className="form-container">
        
        <label htmlFor="codigo_ordem_auto">Código da Ordem (REQ001)</label>
        <input 
          type="text" 
          id="codigo_ordem_auto"
          value="Será gerado automaticamente" 
          disabled 
          style={{ fontStyle: 'italic', color: '#999', backgroundColor: 'rgba(255,255,255,0.05)' }} 
        />

        <label htmlFor="id_cliente">Cliente (REQ001)</label>
        <select id="id_cliente" value={formData.id_cliente} onChange={handleChange}>
          <option value="">Selecione um cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id_cliente} value={cliente.id_cliente}>
              {cliente.nome_razao_social}
            </option>
          ))}
        </select>

        <label htmlFor="id_responsavel">Responsável (REQ006)</label>
        <select id="id_responsavel" value={formData.id_responsavel} onChange={handleChange}>
          <option value="">Atribuir a um usuário</option>
          {usuarios.map(usuario => (
            <option key={usuario.id_usuario} value={usuario.id_usuario}>
              {usuario.nome_completo} ({usuario.usuario})
            </option>
          ))}
        </select>

        <label htmlFor="ambiente">Ambiente (Ex: Sala, Cozinha)</label>
        <input type="text" id="ambiente" value={formData.ambiente} onChange={handleChange} placeholder="Ex: Cozinha 01" />

        <label htmlFor="descricao">Descrição</label>
        <textarea id="descricao" value={formData.descricao} onChange={handleChange}></textarea>

        <label htmlFor="quantidade_planejada">Quantidade Planejada</label>
        <input type="number" id="quantidade_planejada" value={formData.quantidade_planejada} onChange={handleChange} required />

        <label htmlFor="prioridade">Prioridade (REQ001)</label>
        <select id="prioridade" value={formData.prioridade} onChange={handleChange}>
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>

        <label htmlFor="data_inicio">Data de Início</label>
        <input type="date" id="data_inicio" value={formData.data_inicio} onChange={handleChange} />

        <button type="submit" className="btn-submit">Criar Ordem</button>
      </form>
    </div>
  );
}

export default NovaOrdemPage;
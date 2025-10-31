// src/pages/Producao/NovaOrdem.jsx - ATUALIZADO (CÓDIGO AUTOMÁTICO)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovaOrdemPage() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    // codigo_ordem FOI REMOVIDO DAQUI
    descricao: '',
    quantidade_planejada: '',
    data_inicio: new Date().toISOString().split('T')[0],
    id_cliente: '',
    prioridade: 'Média',
    ambiente: ''
  });

  useEffect(() => {
    api.get('/api/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error("Erro ao buscar clientes:", err));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação ATUALIZADA (remove a verificação do codigo_ordem)
    if (!formData.quantidade_planejada) {
      alert('Por favor, preencha a quantidade planejada.');
      return;
    }
    
    try {
      // O formData é enviado SEM o codigo_ordem. O backend irá gerá-lo.
      await api.post('/api/ordens-producao', formData);
      alert('Ordem de produção criada com sucesso!');
      navigate('/producao/ordens');
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      alert('Falha ao criar ordem de produção.');
    }
  };

  return (
    <div>
      <h1>➕ Nova Ordem de Produção</h1>
      <p>Preencha os dados para criar uma nova ordem.</p>
      <form onSubmit={handleSubmit} className="form-container">
        
        {/* CAMPO DE CÓDIGO SUBSTITUÍDO POR TEXTO INFORMATIVO */}
        <label htmlFor="codigo_ordem_auto">Código da Ordem </label>
        <input 
          type="text" 
          id="codigo_ordem_auto"
          value="Será gerado automaticamente" 
          disabled 
          style={{ fontStyle: 'italic', color: '#999', backgroundColor: 'rgba(255,255,255,0.05)' }} 
        />

        <label htmlFor="id_cliente">Cliente </label>
        <select id="id_cliente" value={formData.id_cliente} onChange={handleChange}>
          <option value="">Selecione um cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id_cliente} value={cliente.id_cliente}>
              {cliente.nome_razao_social}
            </option>
          ))}
        </select>

        <label htmlFor="ambiente">Ambiente (Ex: Sala, Cozinha)</label>
        <input type="text" id="ambiente" value={formData.ambiente} onChange={handleChange} placeholder="Ex: Cozinha 01" />

        <label htmlFor="descricao">Descrição</label>
        <textarea id="descricao" value={formData.descricao} onChange={handleChange}></textarea>

        <label htmlFor="quantidade_planejada">Quantidade Planejada</label>
        <input type="number" id="quantidade_planejada" value={formData.quantidade_planejada} onChange={handleChange} required />

        <label htmlFor="prioridade">Prioridade </label>
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
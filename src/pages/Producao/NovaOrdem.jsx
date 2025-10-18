// src/pages/Producao/NovaOrdem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovaOrdemPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codigo_ordem: '',
    descricao: '',
    quantidade_planejada: '',
    data_inicio: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.codigo_ordem || !formData.quantidade_planejada) {
      alert('Por favor, preencha o código da ordem e a quantidade.');
      return;
    }
    try {
      await api.post('/api/ordens-producao', formData);
      alert('Ordem de produção criada com sucesso!');
      navigate('/producao/ordens');
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      alert('Falha ao criar ordem de produção. Verifique se o código da ordem já existe.');
    }
  };

  return (
    <div>
      <h1>➕ Nova Ordem de Produção</h1>
      <p>Preencha os dados para criar uma nova ordem.</p>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="codigo_ordem">Código da Ordem</label>
        <input type="text" id="codigo_ordem" value={formData.codigo_ordem} onChange={handleChange} required />

        <label htmlFor="descricao">Descrição</label>
        <textarea id="descricao" value={formData.descricao} onChange={handleChange}></textarea>

        <label htmlFor="quantidade_planejada">Quantidade Planejada</label>
        <input type="number" id="quantidade_planejada" value={formData.quantidade_planejada} onChange={handleChange} required />

        <label htmlFor="data_inicio">Data de Início</label>
        <input type="date" id="data_inicio" value={formData.data_inicio} onChange={handleChange} />

        <button type="submit" className="btn-submit">Criar Ordem</button>
      </form>
    </div>
  );
}

export default NovaOrdemPage;
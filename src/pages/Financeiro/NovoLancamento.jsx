// src/pages/Financeiro/NovoLancamento.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovoLancamentoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo: 'Receita',
    descricao: '',
    valor: '',
    data_lancamento: new Date().toISOString().split('T')[0],
    status: 'Pendente'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/financeiro', formData);
      alert('Lançamento criado com sucesso!');
      navigate('/financeiro');
    } catch (error) {
      alert('Falha ao criar lançamento.');
    }
  };

  return (
    <div>
      <h1>+ Novo Lançamento Financeiro</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="tipo">Tipo</label>
        <select id="tipo" value={formData.tipo} onChange={handleChange}>
          <option>Receita</option>
          <option>Despesa</option>
        </select>
        <label htmlFor="descricao">Descrição</label>
        <input type="text" id="descricao" value={formData.descricao} onChange={handleChange} required />
        <label htmlFor="valor">Valor (R$)</label>
        <input type="number" step="0.01" id="valor" value={formData.valor} onChange={handleChange} required />
        <label htmlFor="data_lancamento">Data</label>
        <input type="date" id="data_lancamento" value={formData.data_lancamento} onChange={handleChange} />
        <label htmlFor="status">Status</label>
        <select id="status" value={formData.status} onChange={handleChange}>
          <option>Pendente</option>
          <option>Pago</option>
        </select>
        <button type="submit" className="btn-submit">Salvar</button>
      </form>
    </div>
  );
}

export default NovoLancamentoPage;
// src/pages/Relatorios/NovoRelatorio.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovoRelatorioPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: 'Produção' // Valor padrão
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome) {
      alert('O nome do relatório é obrigatório.');
      return;
    }
    try {
      await api.post('/api/relatorios', formData);
      alert('Relatório criado com sucesso!');
      navigate('/relatorios');
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
      alert('Falha ao criar o relatório.');
    }
  };

  return (
    <div>
      <h1>+ Novo Relatório</h1>
      <p>Preencha os dados do novo relatório a ser gerado.</p>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="nome">Nome do Relatório</label>
        <input type="text" id="nome" value={formData.nome} onChange={handleChange} required />

        <label htmlFor="tipo">Tipo de Relatório</label>
        <select id="tipo" value={formData.tipo} onChange={handleChange}>
          <option>Produção</option>
          <option>Financeiro</option>
          <option>Estoque</option>
          <option>Manutenção</option>
        </select>

        <label htmlFor="descricao">Descrição</label>
        <textarea id="descricao" value={formData.descricao} onChange={handleChange}></textarea>

        <button type="submit" className="btn-submit">Criar Relatório</button>
      </form>
    </div>
  );
}

export default NovoRelatorioPage;
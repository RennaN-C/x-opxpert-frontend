// src/pages/Estoque/NovoProduto.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovoProdutoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: '', descricao: '', unidade_medida: '', quantidade_atual: 0 });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/produtos', formData);
      alert('Produto cadastrado com sucesso!');
      navigate('/estoque/produtos');
    } catch (error) {
      alert('Falha ao cadastrar produto.');
    }
  };

  return (
    <div>
      <h1>+ Novo Produto</h1>
      <p>Preencha os dados do novo item de estoque.</p>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="nome">Nome do Produto</label>
        <input type="text" id="nome" value={formData.nome} onChange={handleChange} required />

        <label htmlFor="descricao">Descrição</label>
        <textarea id="descricao" value={formData.descricao} onChange={handleChange}></textarea>
        
        <label htmlFor="unidade_medida">Unidade de Medida (Ex: UN, KG, PC)</label>
        <input type="text" id="unidade_medida" value={formData.unidade_medida} onChange={handleChange} />
        
        <label htmlFor="quantidade_atual">Quantidade Inicial</label>
        <input type="number" id="quantidade_atual" value={formData.quantidade_atual} onChange={handleChange} />

        <button type="submit" className="btn-submit">Salvar Produto</button>
      </form>
    </div>
  );
}

export default NovoProdutoPage;
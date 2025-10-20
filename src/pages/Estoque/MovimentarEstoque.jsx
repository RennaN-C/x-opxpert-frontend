// src/pages/Estoque/MovimentarEstoque.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function MovimentarEstoquePage() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({ id_produto: '', quantidade: '', tipo: 'Entrada', observacao: '' });

  useEffect(() => {
    api.get('/api/produtos').then(res => setProdutos(res.data));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/movimentacoes-estoque', formData);
      alert('Movimentação registada com sucesso!');
      navigate('/estoque/produtos');
    } catch (error) {
      alert(error.response?.data?.erro || 'Falha ao registar movimentação.');
    }
  };

  return (
    <div>
      <h1>🔄 Movimentar Estoque</h1>
      <p>Registe uma entrada ou saída de material do estoque.</p>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="id_produto">Produto</label>
        <select id="id_produto" value={formData.id_produto} onChange={handleChange} required>
          <option value="">Selecione um produto</option>
          {produtos.map(p => <option key={p.id_produto} value={p.id_produto}>{p.nome}</option>)}
        </select>

        <label htmlFor="tipo">Tipo de Movimentação</label>
        <select id="tipo" value={formData.tipo} onChange={handleChange}>
          <option>Entrada</option>
          <option>Saída</option>
        </select>

        <label htmlFor="quantidade">Quantidade</label>
        <input type="number" id="quantidade" value={formData.quantidade} onChange={handleChange} required />
        
        <label htmlFor="observacao">Observação</label>
        <textarea id="observacao" value={formData.observacao} onChange={handleChange}></textarea>

        <button type="submit" className="btn-submit">Registar Movimentação</button>
      </form>
    </div>
  );
}

export default MovimentarEstoquePage;
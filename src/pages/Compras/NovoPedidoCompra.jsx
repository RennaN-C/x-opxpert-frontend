import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovoPedidoCompraPage() {
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState([]);
  const [formData, setFormData] = useState({
    id_fornecedor: '',
    valor_total: '',
    status: 'Pendente'
  });

  useEffect(() => {
    
    api.get('/api/fornecedores')
      .then(res => setFornecedores(res.data))
      .catch(err => console.error("Erro ao buscar fornecedores:", err));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id_fornecedor || !formData.valor_total) {
      alert('Fornecedor e Valor Total são obrigatórios.');
      return;
    }
    try {
      await api.post('/api/pedidos-compra', formData);
      alert('Pedido de compra criado com sucesso!');
      navigate('/compras/pedidos');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Falha ao criar o pedido de compra.');
    }
  };

  return (
    <div>
      <h1>+ Novo Pedido de Compra</h1>
      <p>Preencha os dados do novo pedido.</p>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="id_fornecedor">Fornecedor</label>
        <select id="id_fornecedor" value={formData.id_fornecedor} onChange={handleChange} required>
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map(f => (
            <option key={f.id_fornecedor} value={f.id_fornecedor}>
              {f.nome}
            </option>
          ))}
        </select>

        <label htmlFor="valor_total">Valor Total (R$)</label>
        <input type="number" step="0.01" id="valor_total" value={formData.valor_total} onChange={handleChange} required />

        <label htmlFor="status">Status</label>
        <select id="status" value={formData.status} onChange={handleChange}>
          <option>Pendente</option>
          <option>Aprovado</option>
          <option>Entregue</option>
          <option>Cancelado</option>
        </select>

        <button type="submit" className="btn-submit">Criar Pedido</button>
      </form>
    </div>
  );
}

export default NovoPedidoCompraPage;
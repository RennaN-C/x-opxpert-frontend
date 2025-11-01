import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function PedidosCompraPage() {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await api.get('/api/pedidos-compra');
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos de compra:", error);
        alert("Não foi possível carregar os pedidos.");
      }
    };
    fetchPedidos();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🧾 Pedidos de Compra</h1>
        <button className="btn-submit" style={{ width: 'auto' }} onClick={() => navigate('/compras/pedidos/novo')}>
          + Novo Pedido
        </button>
      </div>
      <p>Crie e acompanhe os pedidos de matéria-prima para a sua produção.</p>
      <table>
        <thead>
          <tr>
            <th>ID do Pedido</th>
            <th>Fornecedor</th>
            <th>Data do Pedido</th>
            <th>Valor Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id_pedido}>
              <td>{p.id_pedido}</td>
              {}
              <td>{p.fornecedor ? p.fornecedor.nome : 'N/A'}</td>
              <td>{new Date(p.data_pedido).toLocaleDateString()}</td>
              <td>R$ {parseFloat(p.valor_total).toFixed(2)}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PedidosCompraPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await api.get('/api/fornecedores');
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        alert("Não foi possível carregar os fornecedores.");
      }
    };
    fetchFornecedores();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🚚 Fornecedores</h1>
        <button className="btn-submit" style={{ width: 'auto' }} onClick={() => navigate('/compras/fornecedores/novo')}>
          + Novo Fornecedor
        </button>
      </div>
      <p>Consulte e gira os seus parceiros de fornecimento.</p>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Contacto</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(f => (
            <tr key={f.id_fornecedor}>
              <td>{f.nome}</td>
              <td>{f.cnpj}</td>
              <td>{f.contato}</td>
              <td>{f.email}</td>
              <td>{f.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FornecedoresPage;
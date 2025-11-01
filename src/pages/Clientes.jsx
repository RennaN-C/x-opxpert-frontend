
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/clientes').then(res => setClientes(res.data));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>👥 Gestão de Clientes</h1>
        <button className="btn-submit" style={{ width: 'auto' }} onClick={() => navigate('/clientes/novo')}>
          + Novo Cliente
        </button>
      </div>
      <p>Centralize as informações dos seus parceiros de negócio.</p>
      <table>
        <thead>
          <tr>
            <th>Nome / Razão Social</th>
            <th>CPF / CNPJ</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.id_cliente}>
              <td>{c.nome_razao_social}</td>
              <td>{c.cpf_cnpj}</td>
              <td>{c.email}</td>
              <td>{c.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ClientesPage;
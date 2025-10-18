import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    api.get('/api/clientes').then(res => setClientes(res.data));
  }, []);

  return (
    <div>
      <h1>👥 Gestão de Clientes</h1>
      <p>Centralize as informações dos seus parceiros de negócio.</p>
      {/* Adicionar um botão para novo cliente aqui */}
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
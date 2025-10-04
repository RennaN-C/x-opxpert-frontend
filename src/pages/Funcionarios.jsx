// src/pages/Funcionarios.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const carregarFuncionarios = async () => {
      try {
        const response = await api.get('/api/funcionarios');
        setFuncionarios(response.data);
      } catch (err) {
        alert("Erro ao carregar funcionários.");
      }
    };
    carregarFuncionarios();
  }, []);

  return (
    <div>
      <h1>Lista de Funcionários</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nome Completo</th><th>CPF</th><th>Cargo</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(f => (
            <tr key={f.id_funcionario}>
              <td>{f.id_funcionario}</td><td>{f.nome_completo}</td>
              <td>{f.cpf}</td><td>{f.cargo || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FuncionariosPage;
// src/pages/Producao/OrdensProducao.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function OrdensProducaoPage() {
  const [ordens, setOrdens] = useState([]);

  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        const response = await api.get('/api/ordens-producao');
        setOrdens(response.data);
      } catch (error) {
        console.error("Erro ao buscar ordens de produção:", error);
        alert("Não foi possível carregar as ordens de produção.");
      }
    };
    fetchOrdens();
  }, []);

  return (
    <div>
      <h1>📋 Ordens de Produção</h1>
      <p>Acompanhe o status de todas as ordens de produção em tempo real.</p>
      <table>
        <thead>
          <tr>
            <th>Código da Ordem</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Progresso</th>
            <th>Data de Início</th>
            <th>Qtd. Planejada</th>
          </tr>
        </thead>
        <tbody>
          {ordens.map(ordem => (
            <tr key={ordem.id_ordem}>
              <td>{ordem.codigo_ordem}</td>
              <td>{ordem.descricao}</td>
              <td>{ordem.status}</td>
              <td>{ordem.progresso || 0}%</td>
              <td>{new Date(ordem.data_inicio).toLocaleDateString()}</td>
              <td>{ordem.quantidade_planejada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdensProducaoPage;
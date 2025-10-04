// src/pages/Producao.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

// Este componente irá gerir as Ordens de Produção
function ProducaoPage() {
  const [ordens, setOrdens] = useState([]);

  useEffect(() => {
    // Busca as ordens de produção da sua API
    api.get('/api/ordens_producao') // Verifique se esta é a rota correta no seu backend
      .then(response => {
        setOrdens(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar ordens de produção:", error);
        alert("Não foi possível carregar os dados de produção.");
      });
  }, []);

  return (
    <div>
      <h1>🏭 Gestão de Produção</h1>
      <p>Acompanhe e gerencie as ordens de produção em tempo real.</p>
      {/* Aqui você pode adicionar botões para criar novas ordens, filtros, etc. */}
      
      <table>
        <thead>
          <tr>
            <th>Código da Ordem</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Data de Início</th>
            <th>Quantidade Planejada</th>
          </tr>
        </thead>
        <tbody>
          {ordens.map(ordem => (
            <tr key={ordem.id_ordem}>
              <td>{ordem.codigo_ordem}</td>
              <td>{ordem.descricao}</td>
              <td>{ordem.status}</td>
              <td>{new Date(ordem.data_inicio).toLocaleDateString()}</td>
              <td>{ordem.quantidade_planejada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProducaoPage;
// src/pages/Dashboard.jsx - Versão Renovada
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/dashboard.css'; // Novo CSS

function DashboardPage() {
  const [stats, setStats] = useState({ abertas: 0, emProducao: 0, concluidas: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/ordens-producao').then(response => {
      const ordens = response.data;
      const abertas = ordens.filter(o => o.status === 'Aberta').length;
      const emProducao = ordens.filter(o => o.status === 'Em Execução').length;
      const concluidas = ordens.filter(o => o.status === 'Concluída').length;
      setStats({ abertas, emProducao, concluidas });
    }).catch(error => console.error("Erro ao buscar dados para o dashboard:", error));
  }, []);

  return (
    <div>
      <h1>Painel de Controle</h1>
      <p>Visão geral do seu chão de fábrica em tempo real.</p>
      
      <div className="dashboard-grid">
        <div className="kpi-card">
          <p className="value">{stats.abertas}</p>
          <p className="label">Ordens Abertas</p>
        </div>
        <div className="kpi-card">
          <p className="value">{stats.emProducao}</p>
          <p className="label">Em Produção</p>
        </div>
        <div className="kpi-card">
          <p className="value">{stats.concluidas}</p>
          <p className="label">Ordens Concluídas</p>
        </div>

        <div className="main-chart">
           <h3>Performance da Produção (Exemplo)</h3>
           {/* Aqui você pode adicionar um gráfico real com a biblioteca de sua escolha */}
           <p>Gráficos de OEE e produtividade apareceriam aqui.</p>
        </div>

        <div className="quick-actions">
            <button className="btn" onClick={() => navigate('/producao')}>Nova Ordem</button>
            <button className="btn" onClick={() => navigate('/relatorios')}>Gerar Relatório</button>
            <button className="btn" onClick={() => navigate('/qualidade')}>Registrar Inspeção</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
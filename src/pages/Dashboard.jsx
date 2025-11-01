import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/dashboard.css'; 

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function DashboardPage() {
  const [stats, setStats] = useState({ abertas: 0, emProducao: 0, concluidas: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/relatorios/producao');
        const { kpis } = response.data;
        
        const abertas = kpis['Aberta']?.total || 0;
        const emProducao = kpis['Em Execução']?.total || 0;
        const concluidas = kpis['Concluída']?.total || 0;
        
        setStats({ abertas, emProducao, concluidas });
      } catch (error) {
        console.error("Erro ao buscar dados para o dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ['Abertas', 'Em Produção', 'Concluídas'],
    datasets: [
      {
        label: 'Status das Ordens',
        data: [stats.abertas, stats.emProducao, stats.concluidas],
        backgroundColor: [
          '#f39c12', // Cor Padrão Status Pendente
          '#3498db', // Cor Padrão Status Execução
          '#2ecc71', // Cor Padrão Status Concluída
        ],
        borderColor: '#111',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { 
          color: '#ccc',
          font: { size: 14 }
        }
      },
      title: {
        display: true,
        text: 'Visão Geral das Ordens de Produção',
        color: '#f55f29',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + ' Ordens';
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div>
      <h1>Painel de Controle</h1>
      <p>Visão geral do seu chão de fábrica em tempo real.</p>
      
      {loading ? (
        <p>Carregando dados...</p>
      ) : (
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
            <div style={{ height: '350px', position: 'relative' }}>
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="quick-actions">
            <button className="btn" onClick={() => navigate('/producao/nova')}>Nova Ordem</button>
            <button className="btn" onClick={() => navigate('/relatorios')}>Ver Relatórios</button>
            <button className="btn" onClick={() => navigate('/qualidade/novo')}>Registrar Inspeção</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
// src/pages/Dashboard.jsx
import React from 'react';
import '../assets/inicio.css'; // Importe o CSS

// Para o gráfico, você precisará instalar: npm install chart.js react-chartjs-2
// E então importar e configurar o componente Doughnut aqui.

function DashboardPage() {
  return (
    <div>
        {/* Você converterá o conteúdo do inicio.html para JSX aqui */}
        <h1>Dashboard</h1>
        <p>Bem-vindo ao X OPXpert!</p>

        <div className="top-section">
          <div className="card"><h2>12</h2><p>Ordens Abertas</p></div>
          <div className="card"><h2>8</h2><p>Em Produção</p></div>
          <div className="card"><h2>25</h2><p>Concluídas</p></div>
        </div>
        {/* Aqui entraria o componente do gráfico */}
    </div>
  );
}

export default DashboardPage;
// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Usamos NavLink para estilizar o link ativo
import '../assets/funcoes.css'; // Importa o CSS

function Sidebar() {
  // A lógica de abrir páginas agora é gerenciada pelo React Router
  return (
    <nav aria-label="Menu lateral" className="sidebar" role="navigation">
      <h2>X OPXpert</h2>
      <NavLink to="/dashboard" className="menu-item">📊 Dashboard</NavLink>
      <NavLink to="/producao" className="menu-item">🏭 Produção</NavLink>
      <NavLink to="/estoque" className="menu-item">📦 Estoque</NavLink>
      <NavLink to="/relatorios" className="menu-item">📑 Relatórios</NavLink>
      <NavLink to="/manutencao" className="menu-item">🛠 Manutenção</NavLink>
      <NavLink to="/funcionarios" className="menu-item">👥 Recursos Humanos</NavLink>
      <NavLink to="/financeiro" className="menu-item">💰 Financeiro</NavLink>
      <NavLink to="/agenda" className="menu-item">📅 Agenda</NavLink>
      <NavLink to="/configuracoes" className="menu-item">⚙ Configurações</NavLink>
    </nav>
  );
}

export default Sidebar;
// src/pages/Funcoes/Funcoes.jsx - CORRIGIDO
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 
import '../../assets/funcoesPage.css';

const menuItems = [
  { path: "/dashboard", icon: "📊", title: "Painel de Controle" },
  { path: "/clientes", icon: "👥", title: "Clientes" },
  { path: "/producao", icon: "🏭", title: "Produção" },
  { path: "/estoque", icon: "📦", title: "Estoque" },
  { path: "/compras", icon: "🛒", title: "Compras" },
  { path: "/qualidade", icon: "✅", title: "Qualidade" },
  { path: "/manutencao", icon: "🛠", title: "Manutenção" },
  { path: "/financeiro", icon: "💰", title: "Financeiro" },
  { path: "/relatorios", icon: "📑", title: "Relatórios" },
  { path: "/funcionarios", icon: "🧑‍💼", title: "Recursos Humanos" },
  { path: "/agenda", icon: "📅", title: "Agenda" },
  { path: "/configuracoes", icon: "⚙️", title: "Configurações" },
];

function FuncoesPage() {
  const navigate = useNavigate(); 
  const { logout } = useAuth(); 

  const handleLogout = () => {
    if (confirm("Tem a certeza de que deseja sair?")) {
      logout();
      // O ProtectedRoute irá agora tratar do redirecionamento
      // navigate('/login'); // <-- LINHA REMOVIDA
    }
  };

  return (
    <div className="funcoes-container">
      <button onClick={handleLogout} className="funcoes-logout-btn">
        Sair ⏏
      </button>

      <div className="funcoes-header">
        <img src="/logo.png" alt="X OPXpert Logo" className="funcoes-logo" />
        <h1>Módulos do Sistema</h1>
        <p>Selecione uma função para começar</p>
      </div>
      <div className="funcoes-grid">
        {menuItems.map(item => (
          <Link to={item.path} key={item.path} className="funcao-card">
            <div className="funcao-icon">{item.icon}</div>
            <div className="funcao-title">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FuncoesPage;
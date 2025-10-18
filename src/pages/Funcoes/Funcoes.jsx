import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="funcoes-container">
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
// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/header.css';

function Header() {
  const navigate = useNavigate();
  return (
    <header className="app-header">
      <Link to="/funcoes" className="header-logo">
        <h2>X OPXpert</h2>
      </Link>
      <nav className="header-nav">
        <button onClick={() => navigate('/funcoes')} className="nav-button">
          ❮ Voltar ao Menu
        </button>
        {/* Adicione outros botões aqui, como "Sair" */}
      </nav>
    </header>
  );
}

export default Header;
// src/components/Header.jsx - ATUALIZADO
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // 1. Importar o useAuth
import '../assets/header.css';

function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // 2. Obter a função de logout do contexto

  const handleLogout = () => {
    if (confirm("Tem a certeza de que deseja sair?")) {
      logout();
      // A navegação para /login será tratada automaticamente pelo ProtectedRoute
    }
  };

  return (
    <header className="app-header">
      <Link to="/funcoes" className="header-logo">
        <h2>X OPXpert</h2>
      </Link>
      
      {/* 3. Navegação atualizada */}
      <nav className="header-nav">
        <button 
          onClick={() => navigate(-1)} // 4. Altera para voltar uma página
          className="nav-button"
        >
          ❮ Voltar 
        </button>
        
        {/* 5. Novo botão de Logout */}
        <button 
          onClick={handleLogout} 
          className="nav-button nav-button-logout"
        >
          Sair ⏏
        </button>
      </nav>
    </header>
  );
}

export default Header;
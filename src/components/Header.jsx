import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import '../assets/header.css';

function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleLogout = () => {
    if (confirm("Tem a certeza de que deseja sair?")) {
      logout();
    }
  };

  return (
    <header className="app-header">
      <Link to="/funcoes" className="header-logo">
        <h2>X OPXpert</h2>
      </Link>
      
      {}
      <nav className="header-nav">
        <button 
          onClick={() => navigate(-1)} 
          className="nav-button"
        >
          ❮ Voltar 
        </button>
        
        {}
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
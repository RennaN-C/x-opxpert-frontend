import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import '../assets/header.css';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const handleLogout = () => {
    if (confirm("Tem a certeza de que deseja sair?")) {
      logout();
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <div 
          className="header-avatar" 
          onClick={() => navigate('/perfil')} 
          title="Ver Perfil"
        >
          {user ? getInitials(user.nome_completo) : '?'}
        </div>
        <Link to="/funcoes" className="header-logo">
          <h2>X OPXpert</h2>
        </Link>
      </div>
      
      <nav className="header-nav">
        <button 
          onClick={() => navigate(-1)} 
          className="nav-button"
        >
          ❮ Voltar 
        </button>
        
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
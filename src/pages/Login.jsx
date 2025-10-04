// client/src/pages/Login.jsx - Versão Corrigida

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../assets/login.css';

function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!usuario || !senha) {
      return alert("Por favor, preencha usuário e senha.");
    }
    try {
      // A chamada à API continua a mesma
      const response = await api.post('/login', { usuario, senha });
      
      // --- CORREÇÃO ESTÁ AQUI ---
      // Verificamos se a API deu uma resposta de sucesso (status 200)
      if (response.status === 200) {
        // Em vez de procurar por 'response.data.usuario', nós simplesmente usamos
        // o 'usuario' que já temos do formulário para guardar no nosso estado de login.
        login({ usuario: usuario }); 
        
        // E então, redirecionamos.
        navigate('/dashboard');
      }

    } catch (error) {
      // O erro da API (ex: "Senha incorreta") será mostrado aqui
      alert(error.response?.data?.mensagem || 'Erro ao fazer login.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Faça seu login!</h2>
        
        <form onSubmit={handleLogin}>
          <label htmlFor="usuario">Usuário:</label>
          <input 
            id="usuario" 
            placeholder="Usuário" 
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          
          <label htmlFor="senha">Senha:</label>
          <input 
            id="senha" 
            placeholder="Senha" 
            type="password" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          
          <a href="#">Esqueci minha senha</a>
          
          <button type="submit" className="btn-login">Login</button>
          
          <Link className="btn-cadastro" to="/cadastro">
            Precisa de acesso? Solicitar credenciais
          </Link>
        </form>
      </div>
      <div className="login-image"></div>
    </div>
  );
}

export default LoginPage;
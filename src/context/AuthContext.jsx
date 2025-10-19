// src/context/AuthContext.jsx - Versão com Verificação de Sessão
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // Importa a nossa instância do axios

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento para esperar a verificação

  useEffect(() => {
    // Função para verificar a sessão com o backend
    const verifySession = async () => {
      try {
        // Tenta aceder à nova rota /api/check-auth
        const response = await api.get('/api/check-auth');
        // Se a resposta for bem-sucedida (status 200), a sessão é válida
        setUser(response.data.usuarioLogado);
      } catch (error) {
        // Se der erro (ex: 401), a sessão não é válida
        console.log("Sessão não encontrada ou expirada.");
        setUser(null);
        localStorage.removeItem('user'); // Limpa qualquer lixo do localStorage
      } finally {
        // Finaliza o estado de carregamento, permitindo que a aplicação seja renderizada
        setLoading(false);
      }
    };

    verifySession();
  }, []); // O array vazio [] garante que isto só corre uma vez, quando a app carrega

  const login = (userData) => {
    // Guarda o objeto do utilizador no localStorage (opcional, mas bom para UI)
    localStorage.setItem('user', JSON.stringify(userData));
    // Atualiza o estado com o objeto do utilizador
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Opcional: notificar o backend sobre o logout para invalidar a sessão
    api.post('/logout');
  };

  // Enquanto a verificação estiver a decorrer, não mostra nada para evitar "piscar"
  if (loading) {
    return null; // Ou um ecrã de loading global
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto facilmente
export const useAuth = () => {
  return useContext(AuthContext);
};
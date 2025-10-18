// src/context/AuthContext.jsx - Versão Corrigida e Mais Robusta
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Adiciona um estado de carregamento

  useEffect(() => {
    // Tenta carregar o usuário do localStorage apenas uma vez, ao iniciar
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar dados do usuário:", error);
      // Limpa o armazenamento se os dados estiverem corrompidos
      localStorage.removeItem('user');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  }, []);

  const login = (userData) => {
    // Guarda o objeto do usuário no localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    // Atualiza o estado com o objeto do usuário
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Não renderiza nada até que a verificação inicial do usuário esteja completa
  if (loading) {
    return null; 
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
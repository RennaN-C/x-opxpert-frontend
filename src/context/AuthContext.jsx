import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const verifySession = async () => {
      try {
        
        const response = await api.get('/api/check-auth');
        
        setUser(response.data.usuarioLogado);
      } catch (error) {
        
        console.log("Sessão não encontrada ou expirada.");
        setUser(null);
        localStorage.removeItem('user'); 
      } finally {
        
        setLoading(false);
      }
    };

    verifySession();
  }, []); 

  const login = (userData) => {
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    
    api.post('/logout');
  };

  
  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
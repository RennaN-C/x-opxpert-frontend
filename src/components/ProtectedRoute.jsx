// client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // Se não há usuário, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // Se há usuário, renderiza a página solicitada (Dashboard, etc.)
  return <Outlet />;
};

export default ProtectedRoute;
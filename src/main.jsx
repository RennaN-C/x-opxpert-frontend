// client/src/main.jsx - ATUALIZADO
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx'; // 1. Importar

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider> {/* 2. Envolver a App */}
        <App />
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>,
);
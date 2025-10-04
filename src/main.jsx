// client/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Importa o nosso provedor de autenticação

// Este código encontra a div com id="root" no seu index.html e renderiza a sua aplicação React dentro dela
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos a aplicação com o AuthProvider para que o estado de login fique disponível em todo o lado */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
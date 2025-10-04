// client/src/App.jsx - Versão Final e Completa do Roteador

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// --- Importação dos Componentes ---
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

// --- Importação de Todas as Páginas ---
import LoginPage from './pages/Login';
import CadastroPage from './pages/Cadastro';
import DashboardPage from './pages/Dashboard';
import ProducaoPage from './pages/Producao';
import EstoquePage from './pages/Estoque';
import RelatoriosPage from './pages/Relatorios';
import ManutencaoPage from './pages/Manutencao';
import FuncionariosPage from './pages/Funcionarios';
import FinanceiroPage from './pages/Financeiro';
import AgendaPage from './pages/Agenda';
import ConfiguracoesPage from './pages/Configuracoes';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* --- Rotas Públicas --- */}
        {/* Estas rotas podem ser acessadas sem login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* --- Rotas Protegidas --- */}
        {/* Tudo dentro desta rota-pai exigirá que o usuário esteja logado. */}
        {/* O componente ProtectedRoute faz a verificação. */}
        <Route element={<ProtectedRoute />}>
          {/* O MainLayout aplica a sidebar e o footer a todas as páginas internas. */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/producao" element={<ProducaoPage />} />
            <Route path="/estoque" element={<EstoquePage />} />
            <Route path="/relatorios" element={<RelatoriosPage />} />
            <Route path="/manutencao" element={<ManutencaoPage />} />
            <Route path="/funcionarios" element={<FuncionariosPage />} />
            <Route path="/financeiro" element={<FinanceiroPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          </Route>
        </Route>

        {/* --- Redirecionamentos e Rotas Padrão --- */}

        {/* A rota raiz "/" verifica se o usuário está logado. */}
        {/* Se estiver, redireciona para o dashboard. Senão, para o login. */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />

        {/* Rota "catch-all" para qualquer URL não encontrada. */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Página Não Encontrada</h1>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
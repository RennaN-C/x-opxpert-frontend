// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import ContentLayout from './layouts/ContentLayout.jsx';

// --- Importação das Páginas ---
import LoginPage from './pages/Login.jsx';
import CadastroPage from './pages/Cadastro.jsx';
import HomePage from './pages/Home.jsx';
import FuncoesPage from './pages/Funcoes/Funcoes.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import ClientesPage from './pages/Clientes.jsx';
import ProducaoPage from './pages/Producao.jsx';
import OrdensProducaoPage from './pages/Producao/OrdensProducao.jsx';
import NovaOrdemPage from './pages/Producao/NovaOrdem.jsx';
import EstoquePage from './pages/Estoque.jsx';
import ComprasPage from './pages/Compras.jsx';
import FornecedoresPage from './pages/Compras/Fornecedores.jsx';
import NovoFornecedorPage from './pages/Compras/NovoFornecedor.jsx';
import PedidosCompraPage from './pages/Compras/PedidosCompra.jsx';
import NovoPedidoCompraPage from './pages/Compras/NovoPedidoCompra.jsx';
import QualidadePage from './pages/Qualidade.jsx';
import RelatoriosPage from './pages/Relatorios.jsx';
import NovoRelatorioPage from './pages/Relatorios/NovoRelatorio.jsx'; // NOVO
import ManutencaoPage from './pages/Manutencao.jsx';
import FuncionariosPage from './pages/Funcionarios.jsx';
import FinanceiroPage from './pages/Financeiro.jsx';
import AgendaPage from './pages/Agenda.jsx';
import ConfiguracoesPage from './pages/Configuracoes.jsx';
import AjudaPage from './pages/Ajuda.jsx';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/funcoes" element={<FuncoesPage />} />

          <Route element={<ContentLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/producao" element={<ProducaoPage />} />
            <Route path="/producao/ordens" element={<OrdensProducaoPage />} />
            <Route path="/producao/nova" element={<NovaOrdemPage />} />
            <Route path="/estoque" element={<EstoquePage />} />
            <Route path="/compras" element={<ComprasPage />} />
            <Route path="/compras/fornecedores" element={<FornecedoresPage />} />
            <Route path="/compras/fornecedores/novo" element={<NovoFornecedorPage />} />
            <Route path="/compras/pedidos" element={<PedidosCompraPage />} />
            <Route path="/compras/pedidos/novo" element={<NovoPedidoCompraPage />} />
            <Route path="/qualidade" element={<QualidadePage />} />
            <Route path="/manutencao" element={<ManutencaoPage />} />
            <Route path="/financeiro" element={<FinanceiroPage />} />
            <Route path="/relatorios" element={<RelatoriosPage />} />
            <Route path="/relatorios/novo" element={<NovoRelatorioPage />} /> {/* NOVO */}
            <Route path="/funcionarios" element={<FuncionariosPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
            <Route path="/ajuda" element={<AjudaPage />} />
          </Route>
        </Route>

        <Route 
          path="/" 
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
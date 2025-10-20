// src/App.jsx - Versão Final com todas as rotas
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import ContentLayout from './layouts/ContentLayout.jsx';

// --- Importação de Todas as Páginas ---
import LoginPage from './pages/Login.jsx';
import CadastroPage from './pages/Cadastro.jsx';
import HomePage from './pages/Home.jsx';
import FuncoesPage from './pages/Funcoes/Funcoes.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import PerfilPage from './pages/Perfil/Perfil.jsx';

// Módulos Principais e de Criação
import ClientesPage from './pages/Clientes.jsx';
import NovoClientePage from './pages/Clientes/NovoCliente.jsx';

import ProducaoPage from './pages/Producao.jsx';
import OrdensProducaoPage from './pages/Producao/OrdensProducao.jsx';
import NovaOrdemPage from './pages/Producao/NovaOrdem.jsx';

import EstoquePage from './pages/Estoque.jsx';
import ProdutosPage from './pages/Estoque/Produtos.jsx';
import NovoProdutoPage from './pages/Estoque/NovoProduto.jsx';
import MovimentarEstoquePage from './pages/Estoque/MovimentarEstoque.jsx';

import ComprasPage from './pages/Compras.jsx';
import FornecedoresPage from './pages/Compras/Fornecedores.jsx';
import NovoFornecedorPage from './pages/Compras/NovoFornecedor.jsx';
import PedidosCompraPage from './pages/Compras/PedidosCompra.jsx';
import NovoPedidoCompraPage from './pages/Compras/NovoPedidoCompra.jsx';

import QualidadePage from './pages/Qualidade.jsx';
import NovaInspecaoPage from './pages/Qualidade/NovaInspecao.jsx';

import RelatoriosPage from './pages/Relatorios.jsx';
import NovoRelatorioPage from './pages/Relatorios/NovoRelatorio.jsx';

import ManutencaoPage from './pages/Manutencao.jsx';
import NovaManutencaoPage from './pages/Manutencao/NovaManutencao.jsx';

import FuncionariosPage from './pages/Funcionarios.jsx';

import FinanceiroPage from './pages/Financeiro.jsx';
import NovoLancamentoPage from './pages/Financeiro/NovoLancamento.jsx';

import AgendaPage from './pages/Agenda.jsx';
import NovoEventoPage from './pages/Agenda/NovoEvento.jsx';

import ConfiguracoesPage from './pages/Configuracoes.jsx';
import AjudaPage from './pages/Ajuda.jsx';
import NotFoundPage from './pages/NotFound.jsx';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          {/* Páginas de ecrã completo */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/funcoes" element={<FuncoesPage />} />

          {/* Páginas com o layout principal (Sidebar + Header) */}
          <Route element={<ContentLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/clientes/novo" element={<NovoClientePage />} />
            
            <Route path="/producao" element={<ProducaoPage />} />
            <Route path="/producao/ordens" element={<OrdensProducaoPage />} />
            <Route path="/producao/nova" element={<NovaOrdemPage />} />
            
            <Route path="/estoque" element={<EstoquePage />} />
            <Route path="/estoque/produtos" element={<ProdutosPage />} />
            <Route path="/estoque/novo" element={<NovoProdutoPage />} />
            <Route path="/estoque/movimentar" element={<MovimentarEstoquePage />} />

            <Route path="/compras" element={<ComprasPage />} />
            <Route path="/compras/fornecedores" element={<FornecedoresPage />} />
            <Route path="/compras/fornecedores/novo" element={<NovoFornecedorPage />} />
            <Route path="/compras/pedidos" element={<PedidosCompraPage />} />
            <Route path="/compras/pedidos/novo" element={<NovoPedidoCompraPage />} />
            
            <Route path="/qualidade" element={<QualidadePage />} />
            <Route path="/qualidade/novo" element={<NovaInspecaoPage />} />

            <Route path="/manutencao" element={<ManutencaoPage />} />
            <Route path="/manutencao/novo" element={<NovaManutencaoPage />} />

            <Route path="/financeiro" element={<FinanceiroPage />} />
            <Route path="/financeiro/novo" element={<NovoLancamentoPage />} />

            <Route path="/relatorios" element={<RelatoriosPage />} />
            <Route path="/relatorios/novo" element={<NovoRelatorioPage />} />

            <Route path="/funcionarios" element={<FuncionariosPage />} />
            
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/agenda/novo" element={<NovoEventoPage />} />

            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
            <Route path="/ajuda" element={<AjudaPage />} />
          </Route>
        </Route>

        {/* Redirecionamentos e Página Não Encontrada */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MainLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main className="page-wrapper" id="page-wrapper" role="main">
        <div className="content-container" id="content-container">
          <Outlet /> {/* As páginas serão renderizadas aqui */}
        </div>
      </main>
      <footer>© 2025 X OPXpert - Todos os direitos reservados</footer>
    </div>
  );
}

export default MainLayout;
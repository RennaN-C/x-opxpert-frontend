// src/layouts/ContentLayout.jsx - ATUALIZADO
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Notification from '../components/Notification.jsx'; // 1. Importar
import '../assets/layout.css';

function ContentLayout() {
  return (
    <div className="content-layout">
      <Notification /> {/* 2. Adicionar o componente aqui */}
      <Header />
      <main className="content-area">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ContentLayout;
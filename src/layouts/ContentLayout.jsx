// src/layouts/ContentLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import '../assets/layout.css';

function ContentLayout() {
  return (
    <div className="content-layout">
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
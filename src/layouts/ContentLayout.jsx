import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Notification from '../components/Notification.jsx'; 
import '../assets/layout.css';

function ContentLayout() {
  return (
    <div className="content-layout">
      <Notification /> {}
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
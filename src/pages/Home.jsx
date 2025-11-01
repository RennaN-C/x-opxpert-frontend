
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx'; 
import '../assets/home.css';


const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 1.5, delayChildren: 1, }, }, };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeInOut" }, }, };
const buttonVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 5.5 } } }


function HomePage() {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleLogout = () => {
    if (confirm("Tem a certeza de que deseja sair?")) {
      logout();
    
    }
  };

  return (
    <div className="home-container">
      <button onClick={handleLogout} className="home-logout-btn">
        Sair ⏏
      </button>

      {}
      <video autoPlay muted loop className="background-video">
        <source src="/x.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />

      {}
      <motion.div
        className="home-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src="/logo.png"
          alt="X OPXpert Logo"
          className="home-logo"
          variants={itemVariants}
        />
        <motion.h1 className="welcome-title" variants={itemVariants}>
          O FUTURO DA GESTÃO É AGORA
        </motion.h1>
        <motion.p className="welcome-subtitle" variants={itemVariants}>
          Bem-vindo ao X-OPXpert.
        </motion.p>
        
      <motion.button
        onClick={() => navigate('/funcoes')}
        className="enter-button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        INICIAR
      </motion.button>
      </motion.div>
    </div>
  );
}

export default HomePage;
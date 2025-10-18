// src/pages/Home.jsx - Versão com a introdução animada "Dark"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/home.css';

// Variantes de animação para os elementos
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1.5, // Atraso entre a animação de cada filho
      delayChildren: 1,     // Atraso antes de começar a animar os filhos
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: "easeInOut" },
  },
};

const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1, delay: 5.5 } // Delay maior para o botão
    }
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Vídeo de Fundo */}
      <video autoPlay muted loop className="background-video">
        <source src="/x.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />

      {/* Conteúdo animado */}
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
          variants={buttonVariants}
        >
          INICIAR
        </motion.button>
      </motion.div>
    </div>
  );
}

export default HomePage;
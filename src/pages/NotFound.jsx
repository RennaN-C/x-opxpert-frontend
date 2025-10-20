// src/pages/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/404.css'; // Usaremos um CSS dedicado

// Variantes para orquestrar a animação de entrada
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Variantes para animar cada letra do "404" individualmente
const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Efeito de stagger para cada letra
        duration: 0.8,
        ease: "easeOut"
      },
    }),
};


function NotFoundPage() {
  const navigate = useNavigate();
  const title404 = "404";

  return (
    <div className="notfound-container">
        {/* Adiciona o mesmo vídeo de fundo da Home para consistência */}
        <video autoPlay muted loop className="background-video">
            <source src="/tech-background.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />

      <motion.div
        className="notfound-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
            <img src="/logo.png" alt="X OPXpert Logo" className="notfound-logo" />
        </motion.div>
        
        <motion.h1 className="notfound-title" aria-label="404">
            {/* Mapeia a string "404" para animar cada letra */}
            {title404.split("").map((char, index) => (
                <motion.span key={index} custom={index} variants={letterVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.h1>

        <motion.p className="notfound-subtitle" variants={itemVariants}>
          Página Não Encontrada
        </motion.p>
        <motion.p className="notfound-description" variants={itemVariants}>
          A rota que você tentou aceder não existe ou foi movida.
        </motion.p>
        <motion.div variants={itemVariants}>
            <button onClick={() => navigate('/home')} className="notfound-button">
                Voltar à Página Inicial
            </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
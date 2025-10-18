import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/funcoes.css'; // Reutilizaremos este CSS

function FeatureCard({ title, description, icon, linkTo }) {
  return (
    <Link to={linkTo} className="feature-card">
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default FeatureCard;
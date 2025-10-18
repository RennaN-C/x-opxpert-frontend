// src/pages/Compras.jsx - Versão com Cards
import React from 'react';
import FeatureCard from '../components/FeatureCard.jsx';

function ComprasPage() {
  return (
    <div>
      <h1>🛒 Compras & Fornecedores</h1>
      <p>Gira os seus fornecedores e ordens de compra de matéria-prima.</p>
      <div className="card-container">
        <FeatureCard
          icon="🚚"
          title="Fornecedores"
          description="Consulte e cadastre os seus fornecedores."
          linkTo="/compras/fornecedores"
        />
        <FeatureCard
          icon="🧾"
          title="Pedidos de Compra"
          description="Crie e acompanhe os pedidos de matéria-prima."
          linkTo="/compras/pedidos"
        />
      </div>
    </div>
  );
}

export default ComprasPage;
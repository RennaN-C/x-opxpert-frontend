import React from 'react';
import FeatureCard from '../components/FeatureCard.jsx';

function ProducaoPage() {
  return (
    <div>
      <h1>🏭 Gestão de Produção</h1>
      <p>Crie, acompanhe e gira as suas ordens de produção em tempo real.</p>
      <div className="card-container">
        <FeatureCard
          icon="📋"
          title="Visualizar Ordens"
          description="Acompanhe o status de todas as ordens de produção."
          linkTo="/producao/ordens"
        />
        <FeatureCard
          icon="➕"
          title="Nova Ordem de Produção"
          description="Crie e inicie uma nova ordem no sistema."
          linkTo="/producao/nova"
        />
        {}
        <FeatureCard
          icon="↔️"
          title="Sequenciar Produção"
          description="Defina a prioridade e a fila de execução das ordens."
          linkTo="/producao/sequenciamento"
        />
      </div>
    </div>
  );
}

export default ProducaoPage;
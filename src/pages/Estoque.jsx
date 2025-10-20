// src/pages/Estoque.jsx - Versão com Cards
import React from 'react';
import FeatureCard from '../components/FeatureCard.jsx';

function EstoquePage() {
    return (
        <div>
            <h1>📦 Controle de Estoque</h1>
            <p>Gira os seus produtos, quantidades e movimentações.</p>
            <div className="card-container">
                <FeatureCard
                    icon="🧊"
                    title="Visualizar Produtos"
                    description="Consulte todos os itens em estoque."
                    linkTo="/estoque/produtos"
                />
                <FeatureCard
                    icon="➕"
                    title="Novo Produto"
                    description="Adicione um novo item ao seu catálogo."
                    linkTo="/estoque/novo"
                />
                 <FeatureCard
                    icon="🔄"
                    title="Movimentar Estoque"
                    description="Registe entradas e saídas de materiais."
                    linkTo="/estoque/movimentar"
                />
            </div>
        </div>
    );
}

export default EstoquePage;
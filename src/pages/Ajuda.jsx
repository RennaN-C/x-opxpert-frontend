// src/pages/Ajuda.jsx
import React from 'react';

function AjudaPage() {
  return (
    <div>
      <h1>❓ Ajuda & Suporte</h1>
      <p>Encontre respostas para suas dúvidas ou entre em contato conosco.</p>
      <div style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto' }}>
        <h3>Perguntas Frequentes (FAQ)</h3>
        <h4>Como crio uma nova ordem de produção?</h4>
        <p>Vá para a seção "Produção" e clique em "Nova Ordem". Preencha os detalhes e salve.</p>
        <h4>Como altero minha senha?</h4>
        <p>Vá para "Configurações", depois "Meu Perfil" para alterar sua senha.</p>
        
        <hr style={{ margin: '30px 0' }} />

        <h3>Contatar Suporte</h3>
        <p>Se não encontrou a resposta que procurava, envie um e-mail para:</p>
        <p><strong>suporte@xopxpert.com</strong></p>
      </div>
    </div>
  );
}

export default AjudaPage;
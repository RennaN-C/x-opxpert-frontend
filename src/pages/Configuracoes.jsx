import React from 'react';
import '../assets/configuracoes.css';

function ConfiguracoesPage() {
  return (
    <main>
      <header>
        <h1>Configurações</h1>
      </header>
      <section>
        <h2>Segurança e Permissões</h2>
        <label htmlFor="nova-senha">Alterar senha:</label>
        <input id="nova-senha" placeholder="Nova senha" type="password" />
        <label htmlFor="permissoes">Permissões do usuário:</label>
        <select id="permissoes">
          <option>Administrador</option>
          <option>Editor</option>
          <option>Visualizador</option>
        </select>
        <button>Salvar alterações</button>
      </section>
      <section>
        <h2>Temas e Aparência</h2>
        <label htmlFor="tema">Escolher tema:</label>
        <select id="tema">
          <option>Claro</option>
          <option>Escuro</option>
          <option>Automático</option>
        </select>
        <button>Aplicar tema</button>
      </section>
    </main>
  );
}

export default ConfiguracoesPage;
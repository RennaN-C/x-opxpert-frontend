// src/pages/Perfil/Perfil.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import '../../assets/layout.css'; // Reutilizaremos o CSS de formulário

function PerfilPage() {
  const { user } = useAuth();

  if (!user) {
    return <p>A carregar dados do utilizador...</p>;
  }

  return (
    <div>
      <h1>Perfil do Utilizador</h1>
      <div className="form-container" style={{ maxWidth: '700px', margin: '30px auto' }}>
        <div className="profile-avatar-large">
          {user.nome_completo.charAt(0)}
        </div>
        <div className="form-group">
          <label>Nome Completo</label>
          <input type="text" value={user.nome_completo} disabled />
        </div>
        <div className="form-group">
          <label>Nome de Utilizador</label>
          <input type="text" value={user.usuario} disabled />
        </div>
        {/* Futuramente, você pode adicionar mais campos do perfil aqui */}
        <button className="btn-submit" style={{ marginTop: '20px' }}>Editar Perfil</button>
      </div>
    </div>
  );
}

export default PerfilPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovoClientePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome_razao_social: '', cpf_cnpj: '', email: '', telefone: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/clientes', formData);
      alert('Cliente cadastrado com sucesso!');
      navigate('/clientes');
    } catch (error) {
      alert('Falha ao cadastrar cliente.');
    }
  };

  return (
    <div>
      <h1>+ Novo Cliente</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="nome_razao_social">Nome / Razão Social</label>
        <input type="text" id="nome_razao_social" value={formData.nome_razao_social} onChange={handleChange} required />
        <label htmlFor="cpf_cnpj">CPF / CNPJ</label>
        <input type="text" id="cpf_cnpj" value={formData.cpf_cnpj} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} />
        <label htmlFor="telefone">Telefone</label>
        <input type="tel" id="telefone" value={formData.telefone} onChange={handleChange} />
        <button type="submit" className="btn-submit">Salvar Cliente</button>
      </form>
    </div>
  );
}

export default NovoClientePage;
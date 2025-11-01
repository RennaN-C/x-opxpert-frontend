import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovoFornecedorPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    contato: '',
    email: '',
    telefone: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome) {
      alert('O nome do fornecedor é obrigatório.');
      return;
    }
    try {
      await api.post('/api/fornecedores', formData);
      alert('Fornecedor cadastrado com sucesso!');
      navigate('/compras/fornecedores');
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
      alert('Falha ao cadastrar fornecedor.');
    }
  };

  return (
    <div>
      <h1>+ Novo Fornecedor</h1>
      <p>Preencha os dados do novo fornecedor.</p>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" value={formData.nome} onChange={handleChange} required />

        <label htmlFor="cnpj">CNPJ</label>
        <input type="text" id="cnpj" value={formData.cnpj} onChange={handleChange} />

        <label htmlFor="contato">Nome do Contacto</label>
        <input type="text" id="contato" value={formData.contato} onChange={handleChange} />
        
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="telefone">Telefone</label>
        <input type="tel" id="telefone" value={formData.telefone} onChange={handleChange} />

        <button type="submit" className="btn-submit">Salvar Fornecedor</button>
      </form>
    </div>
  );
}

export default NovoFornecedorPage;
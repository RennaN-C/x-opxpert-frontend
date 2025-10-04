// client/src/pages/Cadastro.jsx - Versão Completa e Corrigida

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../assets/cadastro.css';

function CadastroPage() {
  const navigate = useNavigate();
  // O estado inicial agora inclui todos os campos do formulário
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    usuario: '',
    cpf: '',
    telefone: '',
    departamento_id: '', // Note que este campo pode precisar de um ID numérico
    cargo: '',
    matricula: '',
    data_admissao: '',
    gerente_responsavel: '',
    senha: '',
  });
  const [confirmaSenha, setConfirmaSenha] = useState('');

  // Esta função agora funciona para todos os inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleCadastro = async (event) => {
    event.preventDefault();
    if (formData.senha !== confirmaSenha) {
      return alert("As senhas não coincidem.");
    }
    try {
      // Enviando o objeto formData completo para a API
      await api.post('/cadastro', formData);
      alert('Solicitação de acesso enviada com sucesso!');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.mensagem || 'Erro ao processar a solicitação.');
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-form">
        <h2>Solicitar Acesso!</h2>
        <form onSubmit={handleCadastro}>
          {/* --- TODOS OS CAMPOS DO FORMULÁRIO ESTÃO AQUI AGORA --- */}
          
          <label htmlFor="nome_completo">Nome completo:</label>
          <input id="nome_completo" placeholder="Digite seu nome" type="text" value={formData.nome_completo} onChange={handleChange} required />
          
          <label htmlFor="email">E-mail corporativo:</label>
          <input id="email" placeholder="Digite seu e-mail" type="email" value={formData.email} onChange={handleChange} required />
          
          <label htmlFor="usuario">Usuário:</label>
          <input id="usuario" placeholder="Escolha um usuário" type="text" value={formData.usuario} onChange={handleChange} required />
          
          <label htmlFor="cpf">CPF:</label>
          <input id="cpf" placeholder="Digite seu CPF" type="text" value={formData.cpf} onChange={handleChange} required />
          
          <label htmlFor="telefone">Telefone:</label>
          <input id="telefone" placeholder="(99) 99999-9999" type="tel" value={formData.telefone} onChange={handleChange} />
          
          <label htmlFor="departamento_id">Departamento:</label>
          <select id="departamento_id" value={formData.departamento_id} onChange={handleChange}>
            <option value="">Selecione</option>
            {/* O 'value' deve ser o ID do departamento no banco, não o texto */}
            <option value="1">TI</option>
            <option value="2">RH</option>
            <option value="3">Financeiro</option>
            <option value="4">Vendas</option>
            <option value="5">Marketing</option>
          </select>
          
          <label htmlFor="cargo">Cargo / Função:</label>
          <input id="cargo" placeholder="Digite seu cargo" type="text" value={formData.cargo} onChange={handleChange} />
          
          <label htmlFor="matricula">Matrícula:</label>
          <input id="matricula" placeholder="Número de matrícula" type="text" value={formData.matricula} onChange={handleChange} />
          
          <label htmlFor="data_admissao">Data de admissão:</label>
          <input id="data_admissao" type="date" value={formData.data_admissao} onChange={handleChange} />
          
          <label htmlFor="gerente_responsavel">Coordenador responsável:</label>
          <input id="gerente_responsavel" placeholder="Nome do Coordenador" type="text" value={formData.gerente_responsavel} onChange={handleChange} />
          
          <label htmlFor="senha">Senha:</label>
          <input id="senha" placeholder="Digite sua senha" type="password" value={formData.senha} onChange={handleChange} required />
          
          <label htmlFor="confirmaSenha">Confirmar senha:</label>
          <input id="confirmaSenha" placeholder="Confirme sua senha" type="password" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} required />
          
          <button type="submit" className="btn-cadastrar">Solicitar Acesso</button>
          
          <Link className="extra-link" to="/login">Já tem um acesso? Faça login</Link>
        </form>
      </div>
      <div className="cadastro-image"></div>
    </div>
  );
}

export default CadastroPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovaInspecaoPage() {
  const navigate = useNavigate();
  const [ordens, setOrdens] = useState([]);
  const [formData, setFormData] = useState({ id_ordem: '', responsavel: '', resultado: 'Aprovado', observacoes: '' });

  useEffect(() => {
    api.get('/api/ordens-producao').then(res => setOrdens(res.data));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/qualidade', formData);
      alert('Inspeção registada com sucesso!');
      navigate('/qualidade');
    } catch (error) {
      alert('Falha ao registar inspeção.');
    }
  };

  return (
    <div>
      <h1>+ Nova Inspeção de Qualidade</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="id_ordem">Ordem de Produção</label>
        <select id="id_ordem" value={formData.id_ordem} onChange={handleChange} required>
          <option value="">Selecione uma ordem</option>
          {ordens.map(o => <option key={o.id_ordem} value={o.id_ordem}>{o.codigo_ordem}</option>)}
        </select>
        <label htmlFor="responsavel">Responsável</label>
        <input type="text" id="responsavel" value={formData.responsavel} onChange={handleChange} required />
        <label htmlFor="resultado">Resultado</label>
        <select id="resultado" value={formData.resultado} onChange={handleChange}>
          <option>Aprovado</option>
          <option>Reprovado</option>
        </select>
        <label htmlFor="observacoes">Observações</label>
        <textarea id="observacoes" value={formData.observacoes} onChange={handleChange}></textarea>
        <button type="submit" className="btn-submit">Registar Inspeção</button>
      </form>
    </div>
  );
}

export default NovaInspecaoPage;
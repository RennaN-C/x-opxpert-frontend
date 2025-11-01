import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovaManutencaoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ equipamento: '', tipo: 'Preventiva', descricao: '', data_agendada: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/manutencoes', formData);
      alert('Manutenção agendada com sucesso!');
      navigate('/manutencao');
    } catch (error) {
      alert('Falha ao agendar manutenção.');
    }
  };

  return (
    <div>
      <h1>+ Agendar Manutenção</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="equipamento">Equipamento</label>
        <input type="text" id="equipamento" value={formData.equipamento} onChange={handleChange} required />
        <label htmlFor="tipo">Tipo</label>
        <select id="tipo" value={formData.tipo} onChange={handleChange}>
          <option>Preventiva</option>
          <option>Corretiva</option>
        </select>
        <label htmlFor="data_agendada">Data Agendada</label>
        <input type="date" id="data_agendada" value={formData.data_agendada} onChange={handleChange} />
        <label htmlFor="descricao">Descrição do Problema/Serviço</label>
        <textarea id="descricao" value={formData.descricao} onChange={handleChange}></textarea>
        <button type="submit" className="btn-submit">Agendar</button>
      </form>
    </div>
  );
}

export default NovaManutencaoPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovoEventoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ titulo: '', descricao: '', data_evento: '', hora_evento: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/agenda', formData);
      alert('Evento criado com sucesso!');
      navigate('/agenda');
    } catch (error) {
      alert('Falha ao criar evento.');
    }
  };

  return (
    <div>
      <h1>+ Novo Evento</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="titulo">Título</label>
        <input type="text" id="titulo" value={formData.titulo} onChange={handleChange} required />
        <label htmlFor="data_evento">Data</label>
        <input type="date" id="data_evento" value={formData.data_evento} onChange={handleChange} />
        <label htmlFor="hora_evento">Hora</label>
        <input type="time" id="hora_evento" value={formData.hora_evento} onChange={handleChange} />
        <label htmlFor="descricao">Descrição</label>
        <textarea id="descricao" value={formData.descricao} onChange={handleChange}></textarea>
        <button type="submit" className="btn-submit">Salvar Evento</button>
      </form>
    </div>
  );
}

export default NovoEventoPage;
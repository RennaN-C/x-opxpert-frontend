// src/pages/Agenda.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AgendaPage() {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/agenda').then(res => setEventos(res.data));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>📅 Agenda</h1>
        <button className="btn-submit" style={{ width: 'auto' }} onClick={() => navigate('/agenda/novo')}>
          + Novo Evento
        </button>
      </div>
      <p>Organize os seus compromissos, reuniões e prazos importantes.</p>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id_evento}>
              <td>{evento.titulo}</td>
              <td>{evento.descricao}</td>
              <td>{new Date(evento.data_evento).toLocaleDateString()}</td>
              <td>{evento.hora_evento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgendaPage;
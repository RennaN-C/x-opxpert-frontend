// src/pages/Agenda.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Usando nosso serviço de API
import '../assets/agenda.css'; // Crie e mova o CSS correspondente para esta pasta

function AgendaPage() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/api/agenda'); // Rota da sua API
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        alert("Não foi possível carregar a agenda.");
      }
    };

    fetchEventos();
  }, []); // Executa apenas uma vez ao carregar o componente

  return (
    <div>
      <h1>Agenda de Eventos</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {eventos.length > 0 ? (
            eventos.map((evento) => (
              <tr key={evento.id_evento}>
                <td>{evento.titulo}</td>
                <td>{evento.descricao}</td>
                <td>{new Date(evento.data_evento).toLocaleDateString()}</td>
                <td>{evento.hora_evento}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum evento encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AgendaPage;
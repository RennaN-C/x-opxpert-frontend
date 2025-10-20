// src/pages/Manutencao.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ManutencaoPage() {
    const [manutencoes, setManutencoes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/api/manutencoes')
            .then(response => setManutencoes(response.data))
            .catch(error => console.error("Erro ao buscar manutenções:", error));
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>🛠 Manutenção de Equipamentos</h1>
                <button className="btn-submit" style={{ width: 'auto' }} onClick={() => navigate('/manutencao/novo')}>
                  + Agendar Manutenção
                </button>
            </div>
            <p>Agende e acompanhe as ordens de serviço de manutenção.</p>
             <table>
              <thead>
                <tr>
                  <th>Equipamento</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Data Agendada</th>
                </tr>
              </thead>
              <tbody>
                {manutencoes.map(item => (
                  <tr key={item.id_manutencao}>
                    <td>{item.equipamento}</td>
                    <td>{item.tipo}</td>
                    <td>{item.status}</td>
                    <td>{new Date(item.data_agendada).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default ManutencaoPage;
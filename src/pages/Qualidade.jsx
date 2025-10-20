// src/pages/Qualidade.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function QualidadePage() {
  const [inspecoes, setInspecoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/qualidade').then(res => setInspecoes(res.data));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>✅ Controle de Qualidade</h1>
        <button className="btn-submit" style={{ width: 'auto' }} onClick={() => navigate('/qualidade/novo')}>
          + Nova Inspeção
        </button>
      </div>
      <p>Registe e consulte as inspeções de qualidade das ordens de produção.</p>
      <table>
        <thead>
          <tr>
            <th>ID Ordem</th>
            <th>Responsável</th>
            <th>Data</th>
            <th>Resultado</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {inspecoes.map(i => (
            <tr key={i.id_inspecao}>
              <td>{i.id_ordem}</td>
              <td>{i.responsavel}</td>
              <td>{new Date(i.data_inspecao).toLocaleString()}</td>
              <td>{i.resultado}</td>
              <td>{i.observacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default QualidadePage;
// src/pages/Qualidade.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function QualidadePage() {
  const [inspecoes, setInspecoes] = useState([]);

  useEffect(() => {
    api.get('/api/qualidade').then(res => setInspecoes(res.data));
  }, []);

  return (
    <div>
      <h1>✅ Controle de Qualidade</h1>
      <p>Registre e consulte as inspeções de qualidade das ordens de produção.</p>
      {/* Adicionar um botão para nova inspeção aqui */}
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
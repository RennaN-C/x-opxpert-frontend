
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function FinanceiroPage() {
  const [lancamentos, setLancamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/financeiro')
      .then(res => setLancamentos(res.data))
      .catch(err => alert("Não foi possível carregar os dados financeiros."));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>💰 Gestão Financeira</h1>
        <button className="btn-submit" style={{ width: 'auto' }} onClick={() => navigate('/financeiro/novo')}>
          + Novo Lançamento
        </button>
      </div>
      <p>Controle o fluxo de caixa, despesas e receitas da operação.</p>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Valor (R$)</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {lancamentos.map(item => (
            <tr key={item.id_lancamento}>
              <td>{item.tipo}</td>
              <td>{item.descricao}</td>
              <td>{parseFloat(item.valor).toFixed(2)}</td>
              <td>{new Date(item.data_lancamento).toLocaleDateString()}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinanceiroPage;
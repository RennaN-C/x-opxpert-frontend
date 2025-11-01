import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function RelatoriosPage() {
  const [relatorios, setRelatorios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarRelatorios = async () => {
      try {
        const response = await api.get('/api/relatorios');
        setRelatorios(response.data);
      } catch (err) {
        console.error("Erro ao carregar relatórios:", err);
        alert("Erro ao carregar a lista de relatórios.");
      }
    };
    carregarRelatorios();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>📑 Relatórios Gerenciais</h1>
        <button className="btn-submit" style={{ width: 'auto' }} onClick={() => navigate('/relatorios/novo')}>
          + Novo Relatório
        </button>
      </div>
      <p>Gere e visualize relatórios de desempenho, produção e outros indicadores chave.</p>
       <table>
        <thead>
          <tr>
            <th>Nome do Relatório</th>
            <th>Tipo</th>
            <th>Data de Criação</th>
            <th>Criado Por</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {relatorios.map(relatorio => (
            <tr key={relatorio.id_relatorio}>
              <td>{relatorio.nome}</td>
              <td>{relatorio.tipo}</td>
              <td>{new Date(relatorio.data_criacao).toLocaleDateString()}</td>
              <td>{relatorio.criador ? relatorio.criador.nome_completo : 'Sistema'}</td>
              <td>{relatorio.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RelatoriosPage;
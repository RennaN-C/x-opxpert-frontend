import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function ProdutosPage() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        api.get('/api/produtos')
            .then(response => setProdutos(response.data))
            .catch(error => console.error("Erro ao buscar produtos:", error));
    }, []);

    return (
        <div>
            <h1>🧊 Produtos em Estoque</h1>
            <p>Visualize os produtos e as suas quantidades atuais.</p>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Quantidade Atual</th>
                  <th>Unidade</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map(produto => (
                  <tr key={produto.id_produto}>
                    <td>{produto.id_produto}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.descricao}</td>
                    <td>{produto.quantidade_atual}</td>
                    <td>{produto.unidade_medida}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default ProdutosPage;
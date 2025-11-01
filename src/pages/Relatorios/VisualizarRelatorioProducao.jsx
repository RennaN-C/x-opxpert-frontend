import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../assets/dashboard.css';
import '../../assets/layout.css';

const ProgressBar = ({ progresso }) => {
    const progress = Math.max(0, Math.min(100, progresso || 0));
    const getBarColor = (p) => {
        if (p < 40) return '#e74c3c';
        if (p < 80) return '#3498db';
        return '#2ecc71';
    };
    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: getBarColor(progress) }} >
                {progress}%
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Aberta':
            case 'Pendente':
                return 'status-pendente';
            case 'Em Execução':
            case 'Apontando':
                return 'status-execucao';
            case 'Concluída':
                return 'status-concluida';
            case 'Cancelada':
                return 'status-cancelada';
            default:
                return 'status-default';
        }
    };
    return (<span className={`status-badge ${getStatusClass(status)}`}>{status}</span>);
};

function KpiCard({ label, value, subtext }) {
    return (
        <div className="kpi-card">
            <p className="value">{value}</p>
            <p className="label">{label}</p>
            {subtext && <small style={{ color: '#999' }}>{subtext}</small>}
        </div>
    );
}

function VisualizarRelatorioProducao() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/relatorios/producao');
                setData(response.data);
            } catch (error) {
                console.error("Erro ao gerar relatório:", error);
                alert("Não foi possível carregar os dados.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Gerando relatório...</p>;
    if (!data) return <p>Não foi possível gerar o relatório.</p>;

    const { kpis, recentesConcluidas, pendentes } = data;

    const kpiConcluidas = kpis['Concluída'] || { total: 0, total_produzido: 0 };
    const kpiExecucao = kpis['Em Execução'] || { total: 0 };
    const kpiAberta = kpis['Aberta'] || { total: 0 };
    const kpiCancelada = kpis['Cancelada'] || { total: 0, total_perdas: 0 };

    return (
        <div>
            <h1>Relatório de Produção (REQ010)</h1>
            <p>Visão consolidada do status das ordens de produção.</p>

            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '30px' }}>
                <KpiCard
                    label="Ordens Concluídas"
                    value={kpiConcluidas.total}
                    subtext={`${kpiConcluidas.total_produzido} unidades produzidas`}
                />
                <KpiCard
                    label="Ordens em Execução"
                    value={kpiExecucao.total}
                    subtext="Atualmente na fila"
                />
                <KpiCard
                    label="Ordens Abertas"
                    value={kpiAberta.total}
                    subtext="Aguardando início"
                />
                <KpiCard
                    label="Ordens Canceladas"
                    value={kpiCancelada.total}
                    subtext={`${kpiCancelada.total_perdas} perdas registradas`}
                />
            </div>

            <h3>Ordens Pendentes / Em Execução</h3>
            <table className="tabela-interativa">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cliente</th>
                        <th>Responsável</th>
                        <th>Status</th>
                        <th>Progresso</th>
                    </tr>
                </thead>
                <tbody>
                    {pendentes.map(ordem => (
                        <tr key={ordem.id_ordem}>
                            <td>{ordem.codigo_ordem}</td>
                            <td>{ordem.cliente ? ordem.cliente.nome_razao_social : 'N/A'}</td>
                            <td>{ordem.responsavel ? ordem.responsavel.nome_completo : 'N/A'}</td>
                            <td><StatusBadge status={ordem.status} /></td>
                            <td><ProgressBar progresso={ordem.progresso} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 style={{ marginTop: '30px' }}>Últimas Ordens Concluídas</h3>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cliente</th>
                        <th>Responsável</th>
                        <th>Qtd. Produzida</th>
                        <th>Data Conclusão</th>
                    </tr>
                </thead>
                <tbody>
                    {recentesConcluidas.map(ordem => (
                        <tr key={ordem.id_ordem}>
                            <td>{ordem.codigo_ordem}</td>
                            <td>{ordem.cliente ? ordem.cliente.nome_razao_social : 'N/A'}</td>
                            <td>{ordem.responsavel ? ordem.responsavel.nome_completo : 'N/A'}</td>
                            <td>{ordem.quantidade_produzida}</td>
                            <td>{new Date(ordem.data_conclusao).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VisualizarRelatorioProducao;
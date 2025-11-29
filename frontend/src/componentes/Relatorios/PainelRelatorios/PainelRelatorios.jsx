import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PainelRelatorios.css';

const PainelRelatorios = () => {
  const navigate = useNavigate();

  const relatorios = [
    {
      id: 1,
      titulo: 'Relatório de Hospedagens',
      descricao: 'Visualize e analise dados sobre hospedagens realizadas',
      icone: '🏠',
      rota: '/relatorios/hospedagens',
      cor: '#4CAF50'
    },
    {
      id: 2,
      titulo: 'Relatório de Consumos',
      descricao: 'Acompanhe o histórico de consumo de produtos',
      icone: '📊',
      rota: '/relatorios/consumos',
      cor: '#2196F3'
    },
    {
      id: 3,
      titulo: 'Relatório de Hóspedes Bloqueados',
      descricao: 'Consulte informações sobre hóspedes bloqueados',
      icone: '🚫',
      rota: '/relatorios/hospedes-bloqueados',
      cor: '#F44336'
    },
    {
      id: 4,
      titulo: 'Relatório Socioeconômico de Hóspedes',
      descricao: 'Análise do perfil socioeconômico dos hóspedes',
      icone: '📈',
      rota: '/relatorios/socioeconomico',
      cor: '#FF9800'
    },
    {
      id: 5,
      titulo: 'Relatório de Ocorrências',
      descricao: 'Visualize registros de ocorrências e incidentes',
      icone: '⚠️',
      rota: '/relatorios/ocorrencias',
      cor: '#9C27B0'
    }
  ];

  return (
    <div className="painel-relatorios-container">
      <div className="painel-relatorios-header">
        <h1>Relatórios e Estatísticas</h1>
        <p>Selecione um relatório para visualizar informações detalhadas</p>
      </div>

      <div className="relatorios-grid">
        {relatorios.map((relatorio) => (
          <div
            key={relatorio.id}
            className="relatorio-card"
            onClick={() => navigate(relatorio.rota)}
            style={{ borderTopColor: relatorio.cor }}
          >
            <div className="relatorio-icone" style={{ backgroundColor: `${relatorio.cor}20` }}>
              <span style={{ color: relatorio.cor }}>{relatorio.icone}</span>
            </div>
            <div className="relatorio-conteudo">
              <h3>{relatorio.titulo}</h3>
              <p>{relatorio.descricao}</p>
            </div>
            <div className="relatorio-acao">
              <button
                className="btn-visualizar"
                style={{ backgroundColor: relatorio.cor }}
              >
                Visualizar →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PainelRelatorios;

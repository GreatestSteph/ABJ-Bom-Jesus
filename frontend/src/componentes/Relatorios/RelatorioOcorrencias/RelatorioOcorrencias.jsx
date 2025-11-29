import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../RelatorioTemplate.css';

const RelatorioOcorrencias = () => {
  const navigate = useNavigate();

  return (
    <div className="relatorio-container">
      <div className="relatorio-header">
        <button className="btn-voltar" onClick={() => navigate('/relatorios')}>
          ← Voltar
        </button>
        <div className="relatorio-titulo">
          <h1>⚠️ Relatório de Ocorrências</h1>
          <p>Visualize registros de ocorrências e incidentes</p>
        </div>
      </div>

      <div className="relatorio-content">
        <div className="placeholder-message">
          <div className="placeholder-icon">📝</div>
          <h2>Em Desenvolvimento</h2>
          <p>Este relatório estará disponível em breve.</p>
          <p className="placeholder-description">
            Aqui você poderá visualizar estatísticas e dados detalhados sobre ocorrências registradas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatorioOcorrencias;

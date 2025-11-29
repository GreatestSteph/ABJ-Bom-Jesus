import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../RelatorioTemplate.css';

const RelatorioHospedesBloqueados = () => {
  const navigate = useNavigate();

  return (
    <div className="relatorio-container">
      <div className="relatorio-header">
        <button className="btn-voltar" onClick={() => navigate('/relatorios')}>
          ← Voltar
        </button>
        <div className="relatorio-titulo">
          <h1>🚫 Relatório de Hóspedes Bloqueados</h1>
          <p>Consulte informações sobre hóspedes bloqueados</p>
        </div>
      </div>

      <div className="relatorio-content">
        <div className="placeholder-message">
          <div className="placeholder-icon">📋</div>
          <h2>Em Desenvolvimento</h2>
          <p>Este relatório estará disponível em breve.</p>
          <p className="placeholder-description">
            Aqui você poderá visualizar estatísticas e dados detalhados sobre hóspedes bloqueados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatorioHospedesBloqueados;

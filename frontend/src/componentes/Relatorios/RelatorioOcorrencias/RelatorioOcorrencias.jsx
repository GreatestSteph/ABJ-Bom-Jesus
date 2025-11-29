import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../RelatorioTemplate.css';
import './RelatorioOcorrencias.css';

const RelatorioOcorrencias = () => {
  const navigate = useNavigate();
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    guest_name: '',
    nivel: '',
    start_date: '',
    end_date: ''
  });
  const [erro, setErro] = useState('');

  const buscarOcorrencias = useCallback(async () => {
    setLoading(true);
    setErro('');

    try {
      const queryParams = new URLSearchParams();

      if (filtros.guest_name) queryParams.append('guest_name', filtros.guest_name);
      if (filtros.nivel) queryParams.append('nivel', filtros.nivel);
      if (filtros.start_date) queryParams.append('start_date', filtros.start_date);
      if (filtros.end_date) queryParams.append('end_date', filtros.end_date);

      const response = await fetch(`http://localhost:3001/occurrences?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar ocorrências');
      }

      const dados = await response.json();
      setOcorrencias(dados);
    } catch (error) {
      console.error('Erro:', error);
      setErro('Erro ao buscar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  // Configurar datas do mês corrente ao carregar
  useEffect(() => {
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    // Formatar datas para YYYY-MM-DD
    const formatarData = (data) => {
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');
      return `${ano}-${mes}-${dia}`;
    };

    setFiltros(prev => ({
      ...prev,
      start_date: formatarData(primeiroDiaMes),
      end_date: formatarData(ultimoDiaMes)
    }));
  }, []);

  useEffect(() => {
    // Só buscar quando as datas estiverem definidas
    if (filtros.start_date && filtros.end_date) {
      buscarOcorrencias();
    }
  }, [filtros, buscarOcorrencias]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    const newFiltros = {
      ...filtros,
      [name]: value
    };

    // Se a data inicial for alterada e for maior que a data final, atualiza a data final
    if (name === 'start_date' && filtros.end_date && value) {
      if (new Date(value) > new Date(filtros.end_date)) {
        newFiltros.end_date = value;
      }
    }

    setFiltros(newFiltros);
  };

  const limparFiltros = () => {
    setFiltros({
      guest_name: '',
      nivel: '',
      start_date: '',
      end_date: ''
    });
  };

  const formatarData = (dataString) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNivelCor = (nivel) => {
    const cores = {
      'Leve': '#4CAF50',
      'Moderado': '#FF9800',
      'Grave': '#F44336'
    };
    return cores[nivel] || '#999';
  };

  const exportarParaPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Ocorrências', 14, 20);

    // Data de geração
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 28);

    // Filtros aplicados
    let yPos = 36;
    if (filtros.guest_name || filtros.nivel || filtros.start_date || filtros.end_date) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Filtros Aplicados:', 14, yPos);
      yPos += 6;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      if (filtros.guest_name) {
        doc.text(`• Nome do Hóspede: ${filtros.guest_name}`, 14, yPos);
        yPos += 5;
      }
      if (filtros.nivel) {
        doc.text(`• Nível: ${filtros.nivel}`, 14, yPos);
        yPos += 5;
      }
      if (filtros.start_date) {
        doc.text(`• Data Início: ${new Date(filtros.start_date).toLocaleDateString('pt-BR')}`, 14, yPos);
        yPos += 5;
      }
      if (filtros.end_date) {
        doc.text(`• Data Fim: ${new Date(filtros.end_date).toLocaleDateString('pt-BR')}`, 14, yPos);
        yPos += 5;
      }
      yPos += 5;
    }

    // Estatísticas
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total de Ocorrências: ${ocorrencias.length}`, 14, yPos);
    yPos += 10;

    // Tabela
    const tableData = ocorrencias.map(occ => [
      occ.id,
      occ.guest?.nome || '-',
      occ.occurrenceType?.nome || '-',
      occ.occurrenceType?.nivel || '-',
      formatarData(occ.registration_date),
      occ.description || '-',
      occ.registeredByUser?.usuario || '-'
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['ID', 'Hóspede', 'Tipo', 'Nível', 'Data', 'Descrição', 'Registrado por']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [21, 75, 122],
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 3
      },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 20 },
        4: { cellWidth: 22 },
        5: { cellWidth: 'auto', halign: 'left' },
        6: { cellWidth: 21 }
      },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      margin: { top: 10, left: 10, right: 10 },
      didParseCell: (data) => {
        // Colorir coluna de nível
        if (data.column.index === 3 && data.section === 'body') {
          const nivel = data.cell.raw;
          if (nivel === 'Grave') {
            data.cell.styles.textColor = [244, 67, 54];
            data.cell.styles.fontStyle = 'bold';
          } else if (nivel === 'Moderado') {
            data.cell.styles.textColor = [255, 152, 0];
            data.cell.styles.fontStyle = 'bold';
          } else if (nivel === 'Leve') {
            data.cell.styles.textColor = [76, 175, 80];
          }
        }
        // Quebrar texto na descrição
        if (data.column.index === 5 && data.section === 'body') {
          data.cell.styles.cellWidth = 'auto';
          data.cell.styles.overflow = 'linebreak';
        }
      }
    });

    // Salvar PDF
    const dataAtual = new Date().toISOString().split('T')[0];
    doc.save(`relatorio-ocorrencias-${dataAtual}.pdf`);
  };

  return (
    <div className="relatorio-container">
      <div className="relatorio-header">
        <button className="btn-voltar" onClick={() => navigate('/relatorios')}>
          ← Voltar
        </button>
        <div className="relatorio-titulo">
          <h1>⚠️ Relatório de Ocorrências</h1>
          <p>Visualize e analise registros de ocorrências e incidentes</p>
        </div>
      </div>

      <div className="relatorio-content">
        {/* Filtros */}
        <div className="filtros-container">
          <h3>Filtros</h3>
          <div className="filtros-grid">
            <div className="filtro-item">
              <label htmlFor="guest_name">Nome do Hóspede:</label>
              <input
                type="text"
                id="guest_name"
                name="guest_name"
                value={filtros.guest_name}
                onChange={handleFiltroChange}
                placeholder="Digite o nome"
              />
            </div>

            <div className="filtro-item">
              <label htmlFor="nivel">Nível:</label>
              <select
                id="nivel"
                name="nivel"
                value={filtros.nivel}
                onChange={handleFiltroChange}
              >
                <option value="">Todos</option>
                <option value="Leve">Leve</option>
                <option value="Moderado">Moderado</option>
                <option value="Grave">Grave</option>
              </select>
            </div>

            <div className="filtro-item">
              <label htmlFor="start_date">Data Início:</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={filtros.start_date}
                onChange={handleFiltroChange}
              />
            </div>

            <div className="filtro-item">
              <label htmlFor="end_date">Data Fim:</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={filtros.end_date}
                onChange={handleFiltroChange}
                min={filtros.start_date}
              />
            </div>
          </div>

          <div className="filtros-acoes">
            <button className="btn-buscar" onClick={buscarOcorrencias} disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            <button className="btn-limpar" onClick={limparFiltros}>
              Limpar Filtros
            </button>
            <button
              className="btn-exportar"
              onClick={exportarParaPDF}
              disabled={ocorrencias.length === 0}
            >
              📄 Exportar PDF
            </button>
          </div>
        </div>

        {/* Mensagem de erro */}
        {erro && (
          <div className="erro-mensagem">
            {erro}
          </div>
        )}

        {/* Estatísticas */}
        {!loading && ocorrencias.length > 0 && (
          <div className="estatisticas-container">
            <div className="stat-card">
              <span className="stat-numero">{ocorrencias.length}</span>
              <span className="stat-label">Total de Ocorrências</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">
                {ocorrencias.filter(o => o.occurrenceType?.nivel === 'Leve').length}
              </span>
              <span className="stat-label" style={{ color: '#4CAF50' }}>Leves</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">
                {ocorrencias.filter(o => o.occurrenceType?.nivel === 'Moderado').length}
              </span>
              <span className="stat-label" style={{ color: '#FF9800' }}>Moderadas</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">
                {ocorrencias.filter(o => o.occurrenceType?.nivel === 'Grave').length}
              </span>
              <span className="stat-label" style={{ color: '#F44336' }}>Graves</span>
            </div>
          </div>
        )}

        {/* Tabela de resultados */}
        {loading ? (
          <div className="loading-container">
            <p>Carregando dados...</p>
          </div>
        ) : ocorrencias.length === 0 ? (
          <div className="sem-dados">
            <p>Nenhuma ocorrência encontrada com os filtros aplicados.</p>
          </div>
        ) : (
          <div className="tabela-container">
            <table className="tabela-ocorrencias">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hóspede</th>
                  <th>Tipo de Ocorrência</th>
                  <th>Nível</th>
                  <th>Data/Hora</th>
                  <th>Descrição</th>
                  <th>Registrado por</th>
                </tr>
              </thead>
              <tbody>
                {ocorrencias.map((ocorrencia) => (
                  <tr key={ocorrencia.id}>
                    <td>{ocorrencia.id}</td>
                    <td>{ocorrencia.guest?.nome || '-'}</td>
                    <td>{ocorrencia.occurrenceType?.nome || '-'}</td>
                    <td>
                      <span
                        className="badge-nivel"
                        style={{
                          backgroundColor: `${getNivelCor(ocorrencia.occurrenceType?.nivel)}20`,
                          color: getNivelCor(ocorrencia.occurrenceType?.nivel),
                          border: `1px solid ${getNivelCor(ocorrencia.occurrenceType?.nivel)}`
                        }}
                      >
                        {ocorrencia.occurrenceType?.nivel || '-'}
                      </span>
                    </td>
                    <td>{formatarData(ocorrencia.registration_date)}</td>
                    <td className="descricao-cell">
                      <div className="descricao-texto" title={ocorrencia.description}>
                        {ocorrencia.description}
                      </div>
                    </td>
                    <td>{ocorrencia.registeredByUser?.usuario || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatorioOcorrencias;

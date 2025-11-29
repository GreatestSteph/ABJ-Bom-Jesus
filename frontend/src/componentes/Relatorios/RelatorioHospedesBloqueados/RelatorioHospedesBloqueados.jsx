import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../RelatorioTemplate.css';
import './RelatorioHospedesBloqueados.css';

const RelatorioHospedesBloqueados = () => {
  const navigate = useNavigate();
  const [bloqueios, setBloqueios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    guest_name: '',
    status: '',
    start_date: '',
    end_date: ''
  });
  const [erro, setErro] = useState('');

  const buscarBloqueios = useCallback(async () => {
    setLoading(true);
    setErro('');

    try {
      const queryParams = new URLSearchParams();

      if (filtros.guest_name) queryParams.append('guest_name', filtros.guest_name);
      if (filtros.status) queryParams.append('status', filtros.status);
      if (filtros.start_date) queryParams.append('start_date', filtros.start_date);
      if (filtros.end_date) queryParams.append('end_date', filtros.end_date);

      const response = await fetch(`http://localhost:3001/bloqueios?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar bloqueios');
      }

      const dados = await response.json();
      setBloqueios(dados);
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
      buscarBloqueios();
    }
  }, [filtros, buscarBloqueios]);

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
      status: '',
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
      year: 'numeric'
    });
  };

  const getStatusCor = (status) => {
    const cores = {
      'ativo': '#4CAF50',
      'cancelado': '#FF9800',
      'concluido': '#F44336'
    };
    return cores[status?.toLowerCase()] || '#999';
  };

  const exportarParaPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Hóspedes Bloqueados', 14, 20);

    // Data de geração
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 28);

    // Filtros aplicados
    let yPos = 36;
    if (filtros.guest_name || filtros.status || filtros.start_date || filtros.end_date) {
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
      if (filtros.status) {
        doc.text(`• Status: ${filtros.status.charAt(0).toUpperCase() + filtros.status.slice(1)}`, 14, yPos);
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
    const totalAtivos = bloqueios.filter(b => (b.status_calculado || b.status) === 'ativo').length;
    const totalCancelados = bloqueios.filter(b => (b.status_calculado || b.status) === 'cancelado').length;
    const totalConcluidos = bloqueios.filter(b => (b.status_calculado || b.status) === 'concluido').length;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Estatísticas:', 14, yPos);
    yPos += 6;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`• Total de Bloqueios: ${bloqueios.length}`, 14, yPos);
    yPos += 5;
    doc.setTextColor(76, 175, 80);
    doc.text(`• Ativos: ${totalAtivos}`, 14, yPos);
    yPos += 5;
    doc.setTextColor(255, 152, 0);
    doc.text(`• Cancelados: ${totalCancelados}`, 14, yPos);
    yPos += 5;
    doc.setTextColor(244, 67, 54);
    doc.text(`• Concluídos: ${totalConcluidos}`, 14, yPos);
    yPos += 8;
    doc.setTextColor(0, 0, 0); // Resetar cor para preto

    // Tabela
    const tableData = bloqueios.map(bloq => [
      bloq.id,
      bloq.guest?.nome || '-',
      bloq.motivo || '-',
      formatarData(bloq.data_inicio),
      formatarData(bloq.data_termino),
      (bloq.status_calculado || bloq.status || '-').toUpperCase()
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['ID', 'Hóspede', 'Motivo', 'Data Início', 'Data Término', 'Status']],
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
        0: { cellWidth: 10 },
        1: { cellWidth: 35 },
        2: { cellWidth: 50, halign: 'left' },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 30 }
      },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      margin: { top: 10, left: 10, right: 10 },
      didParseCell: (data) => {
        // Colorir coluna de status
        if (data.column.index === 5 && data.section === 'body') {
          const status = data.cell.raw.toLowerCase();
          if (status === 'ativo') {
            data.cell.styles.textColor = [76, 175, 80];
            data.cell.styles.fontStyle = 'bold';
          } else if (status === 'cancelado') {
            data.cell.styles.textColor = [255, 152, 0];
            data.cell.styles.fontStyle = 'bold';
          } else if (status === 'concluído' || status === 'concluido') {
            data.cell.styles.textColor = [244, 67, 54];
            data.cell.styles.fontStyle = 'bold';
          }
        }
        // Quebrar texto no motivo
        if (data.column.index === 2 && data.section === 'body') {
          data.cell.styles.cellWidth = 'auto';
          data.cell.styles.overflow = 'linebreak';
        }
      }
    });

    // Salvar PDF
    const dataAtual = new Date().toISOString().split('T')[0];
    doc.save(`relatorio-hospedes-bloqueados-${dataAtual}.pdf`);
  };

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
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={filtros.status}
                onChange={handleFiltroChange}
              >
                <option value="">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="cancelado">Cancelado</option>
                <option value="concluido">Concluído</option>
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
            <button className="btn-buscar" onClick={buscarBloqueios} disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            <button className="btn-limpar" onClick={limparFiltros}>
              Limpar Filtros
            </button>
            <button
              className="btn-exportar"
              onClick={exportarParaPDF}
              disabled={bloqueios.length === 0}
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
        {!loading && bloqueios.length > 0 && (
          <div className="estatisticas-container">
            <div className="stat-card">
              <span className="stat-numero">{bloqueios.length}</span>
              <span className="stat-label">Total de Bloqueios</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">
                {bloqueios.filter(b => (b.status_calculado || b.status) === 'ativo').length}
              </span>
              <span className="stat-label" style={{ color: '#4CAF50' }}>Ativos</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">
                {bloqueios.filter(b => (b.status_calculado || b.status) === 'cancelado').length}
              </span>
              <span className="stat-label" style={{ color: '#FF9800' }}>Cancelados</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">
                {bloqueios.filter(b => (b.status_calculado || b.status) === 'concluido').length}
              </span>
              <span className="stat-label" style={{ color: '#F44336' }}>Concluídos</span>
            </div>
          </div>
        )}

        {/* Tabela de resultados */}
        {loading ? (
          <div className="loading-container">
            <p>Carregando dados...</p>
          </div>
        ) : bloqueios.length === 0 ? (
          <div className="sem-dados">
            <p>Nenhum bloqueio encontrado com os filtros aplicados.</p>
          </div>
        ) : (
          <div className="tabela-container">
            <table className="tabela-bloqueios">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hóspede</th>
                  <th>Motivo</th>
                  <th>Data Início</th>
                  <th>Data Término</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bloqueios.map((bloqueio) => (
                  <tr key={bloqueio.id}>
                    <td>{bloqueio.id}</td>
                    <td>{bloqueio.guest?.nome || '-'}</td>
                    <td className="motivo-cell">
                      <div className="motivo-texto" title={bloqueio.motivo}>
                        {bloqueio.motivo}
                      </div>
                    </td>
                    <td>{formatarData(bloqueio.data_inicio)}</td>
                    <td>{formatarData(bloqueio.data_termino)}</td>
                    <td>
                      <span
                        className="badge-status"
                        style={{
                          backgroundColor: `${getStatusCor(bloqueio.status_calculado || bloqueio.status)}20`,
                          color: getStatusCor(bloqueio.status_calculado || bloqueio.status),
                          border: `1px solid ${getStatusCor(bloqueio.status_calculado || bloqueio.status)}`
                        }}
                      >
                        {(bloqueio.status_calculado || bloqueio.status || '-').toUpperCase()}
                      </span>
                    </td>
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

export default RelatorioHospedesBloqueados;

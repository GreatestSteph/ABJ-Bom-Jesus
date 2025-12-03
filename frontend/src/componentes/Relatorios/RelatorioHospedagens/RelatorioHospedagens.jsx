import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import API_URL from '../../../config/api';
import '../RelatorioTemplate.css';
import '../RelatorioOcorrencias/RelatorioOcorrencias.css';

const RelatorioHospedagens = () => {
  const navigate = useNavigate();
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [filtros, setFiltros] = useState({
    guest_name: '',
    start_date: '',
    end_date: '',
    hospedou: ''
  });

  
  // -------------------------------------------------------------------
  const buscarEntradas = useCallback(async () => {
    setLoading(true);
    setErro('');

    try {
      //--- ENTRADAS ---
      const resEntradas = await fetch(`${API_URL}/entradas`);
      if (!resEntradas.ok) throw new Error('Erro ao buscar entradas');
      let dataEntradas = await resEntradas.json();
      if (!Array.isArray(dataEntradas)) dataEntradas = dataEntradas.data ?? [];

      //--- GUESTS ---
      const resGuests = await fetch(`${API_URL}/guests`);
      let guests = [];
      if (resGuests.ok) guests = await resGuests.json();

      //--- BLOQUEIOS ---
      const resBloqueios = await fetch(`${API_URL}/bloqueios`);
      let bloqueios = [];
      if (resBloqueios.ok) bloqueios = await resBloqueios.json();

      const bloqueiosConvertidos = bloqueios.map(b => ({
        id: `BLOQ-${b.id}`,
        dataEntrada: b.data_inicio,
        dataSaida: b.data_fim,
        hospedou: false,
        tipo: 'bloqueio',
        hospede: {
          nome: '(BLOQUEIO DE QUARTO)',
          data_nascimento: null
        }
      }));

      // Mesclar entradas com hóspedes
      const entradasConvertidas = dataEntradas.map(e => {
        const hospede =
          e.hospede ??
          guests.find(g => g.id === e.hospedeId) ??
          null;

        return {
          ...e,
          tipo: 'entrada',
          hospede
        };
      });

      // JUNTAR entradas + bloqueios
      let merged = [...entradasConvertidas];

      
      // -------------------------------------------------------------------

      if (filtros.guest_name) {
        merged = merged.filter(e =>
          (e.hospede?.nome ?? '')
            .toLowerCase()
            .includes(filtros.guest_name.toLowerCase())
        );
      }

      if (filtros.start_date) {
        const start = new Date(filtros.start_date);
        merged = merged.filter(e => {
          const d = new Date(e.dataEntrada);
          return !isNaN(d.getTime()) && d >= start;
        });
      }

      if (filtros.end_date) {
        const end = new Date(filtros.end_date);
        end.setHours(23, 59, 59, 999);
        merged = merged.filter(e => {
          const d = new Date(e.dataEntrada);
          return !isNaN(d.getTime()) && d <= end;
        });
      }

      // hospedou (ativas/encerradas)
      if (filtros.hospedou === '1' || filtros.hospedou === '0') {
        const val = filtros.hospedou === '1';
        merged = merged.filter(e => {
          const hosp = String(e.hospedou);
          return hosp === (val ? '1' : '0') || hosp === (val ? 'true' : 'false');
        });
      }

      setEntradas(merged);
    } catch (err) {
      console.error('Erro ao buscar hospedagens:', err);
      setErro('Erro ao buscar hospedagens. Veja console.');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  // Datas iniciais → mês atual
  // --------------------------------------------------------
  useEffect(() => {
    const hoje = new Date();
    const primeiro = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimo = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    const fmt = d =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    setFiltros(f => ({
      ...f,
      start_date: fmt(primeiro),
      end_date: fmt(ultimo)
    }));
  }, []);

  useEffect(() => {
    buscarEntradas();
  }, [buscarEntradas]);

  const handleFiltroChange = e => {
    setFiltros(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const limparFiltros = () =>
    setFiltros({ guest_name: '', start_date: '', end_date: '', hospedou: '' });

  const formatarData = dStr => {
    if (!dStr) return '-';
    const d = new Date(dStr);
    return isNaN(d.getTime())
      ? '-'
      : d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  };

  const duracaoDias = (entradaStr, saidaStr) => {
    try {
      const e = new Date(entradaStr);
      const s = saidaStr ? new Date(saidaStr) : new Date();
      if (isNaN(e.getTime()) || isNaN(s.getTime())) return '-';
      const diff = s - e;
      return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d`;
    } catch {
      return '-';
    }
  };

  
  // Ranking 
  // -------------------------------------------------------------------
  const topHospedes = () => {
    const map = {};
    entradas.forEach(e => {
      const key = e.hospede?.nome ?? 'Desconhecido';
      if (!map[key]) map[key] = 0;
      map[key]++;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const topMeses = () => {
    const map = {};
    entradas.forEach(e => {
      const d = new Date(e.dataEntrada);
      if (isNaN(d)) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      map[key] = (map[key] || 0) + 1;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([k, v]) => {
        const [y, m] = k.split('-');
        const label = new Date(Number(y), Number(m) - 1, 1).toLocaleString('pt-BR', {
          month: 'long',
          year: 'numeric'
        });
        return [label, v];
      });
  };

  // -----------------------------------------------------------------------------
  const exportarParaPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    doc.setFillColor(21, 75, 122);
    doc.rect(0, 0, 595, 70, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Hospedagens - Associação Bom Jesus', 40, 44);

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 40, 95);
    let yPos = 120;


    // filtros
    if (filtros.guest_name || filtros.start_date || filtros.end_date || filtros.hospedou) {
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      doc.setFont('helvetica', 'normal');

      doc.setFontSize(10);
      if (filtros.guest_name) {
        doc.text(`-  Busca por nome: ${filtros.guest_name}`, 50, yPos);
        yPos += 12;
      }
      if (filtros.start_date) {
        doc.text(`-  Data Início: ${filtros.start_date}`, 50, yPos);
        yPos += 12;
      }
      if (filtros.end_date) {
        doc.text(`-  Data Fim: ${filtros.end_date}`, 50, yPos);
        yPos += 12;
      }
      if (filtros.hospedou === '1' || filtros.hospedou === '0') {
        doc.text(`-  Status: ${filtros.hospedou === '1' ? 'Ativas' : 'Encerradas'}`, 50, yPos);
        yPos += 12;
      }
      yPos += 8;
    }

    // rankings
    const topH = topHospedes();
    if (topH.length) {
      doc.setFontSize(12);
      doc.setTextColor(21, 75, 122);
      doc.text('Hóspedes com maior número de hospedagens:', 40, yPos);
      yPos += 16;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      topH.forEach(([nome, qtd], i) => {
        doc.text(`  ${i + 1}. ${nome} — ${qtd} estadia(s)`, 50, yPos);
        yPos += 12;
      });
      yPos += 8;
    }

    const topM = topMeses();
    if (topM.length) {
      doc.setFontSize(12);
      doc.setTextColor(21, 75, 122);
      doc.text('Meses com mais entradas:', 40, yPos);
      yPos += 16;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      topM.forEach(([mesLabel, qtd], i) => {
        doc.text(`  ${i + 1}. ${mesLabel} — ${qtd} entradas`, 50, yPos);
        yPos += 12;
      });
      yPos += 8;
    }

    // tabela
    const tableBody = entradas
      .filter(e => e.tipo !== 'bloqueio')
      .map(e => [
        e.hospede?.nome || '-',
        e.hospede?.data_nascimento
          ? new Date(e.hospede.data_nascimento).toLocaleDateString('pt-BR')
          : '-',
        formatarData(e.dataEntrada),
        e.dataSaida ? formatarData(e.dataSaida) : '-',
        (String(e.hospedou) === '1' || e.hospedou === true) ? 'ATIVO' : 'ENCERRADO',
        duracaoDias(e.dataEntrada, e.dataSaida)
      ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Hóspede', 'Nasc.', 'Entrada', 'Saída', 'Status', 'Duração']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: [21, 75, 122],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 9, cellPadding: 4 },
      styles: { overflow: 'linebreak', cellWidth: 'wrap' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 40, right: 40 }
    });

    doc.save(`relatorio-hospedagens-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // 
  // -------------------------------------------------------------------
  return (
    <div className="relatorio-container">
      <div className="relatorio-header">
        <button className="btn-voltar" onClick={() => navigate('/relatorios')}>
          ← Voltar
        </button>
        <div className="relatorio-titulo">
          <h1>🏨 Relatório de Hospedagens</h1>
          <p>Entradas e saídas — visualize e exporte</p>
        </div>
      </div>

      <div className="relatorio-content">
        <div className="filtros-container">
          <h3>Filtros</h3>

          <div className="filtros-grid">
            <div className="filtro-item">
              <label>Nome do Hóspede:</label>
              <input
                type="text"
                name="guest_name"
                value={filtros.guest_name}
                onChange={handleFiltroChange}
                placeholder="Digite o nome"
              />
            </div>

            <div className="filtro-item">
              <label>Data Início:</label>
              <input
                type="date"
                name="start_date"
                value={filtros.start_date}
                onChange={handleFiltroChange}
              />
            </div>

            <div className="filtro-item">
              <label>Data Fim:</label>
              <input
                type="date"
                name="end_date"
                value={filtros.end_date}
                min={filtros.start_date}
                onChange={handleFiltroChange}
              />
            </div>

            <div className="filtro-item">
              <label>Status:</label>
              <select
                name="hospedou"
                value={filtros.hospedou}
                onChange={handleFiltroChange}
              >
                <option value="">Todas</option>
                <option value="1">Ativas</option>
                <option value="0">Encerradas</option>
              </select>
            </div>
          </div>

          <div className="filtros-acoes">
            <button
              className="btn-buscar"
              onClick={buscarEntradas}
              disabled={loading}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>

            <button className="btn-limpar" onClick={limparFiltros}>
              Limpar Filtros
            </button>

            <button
              className="btn-exportar"
              onClick={exportarParaPDF}
              disabled={entradas.length === 0}
            >
              📄 Exportar PDF
            </button>
          </div>
        </div>

        {erro && <div className="erro-mensagem">{erro}</div>}

        {loading ? (
          <p>Carregando...</p>
        ) : entradas.length === 0 ? (
          <p>Nenhuma hospedagem encontrada.</p>
        ) : (
          <div className="tabela-container">
            <table className="tabela-ocorrencias">
              <thead>
                <tr>
                  <th>Hóspede</th>
                  <th>Data Nasc.</th>
                  <th>Entrada</th>
                  <th>Saída</th>
                  <th>Status</th>
                  <th>Duração</th>
                </tr>
              </thead>

              <tbody>
                {entradas
                  .filter(e => e.tipo !== 'bloqueio')
                  .map(e => (
                    <tr key={e.id}>
                      <td>{e.hospede?.nome}</td>
                      <td>
                        {e.hospede?.data_nascimento
                          ? new Date(e.hospede.data_nascimento).toLocaleDateString(
                              'pt-BR'
                            )
                          : '-'}
                      </td>
                      <td>{formatarData(e.dataEntrada)}</td>
                      <td>
                        {e.dataSaida ? formatarData(e.dataSaida) : '-'}
                      </td>
                      <td>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            backgroundColor:
                              String(e.hospedou) === '1' || e.hospedou === true
                                ? '#d4edda'
                                : '#f8d7da',
                            color:
                              String(e.hospedou) === '1' || e.hospedou === true
                                ? '#155724'
                                : '#721c24'
                          }}
                        >
                          {String(e.hospedou) === '1' || e.hospedou === true
                            ? 'ATIVO'
                            : 'ENCERRADO'}
                        </span>
                      </td>
                      <td>{duracaoDias(e.dataEntrada, e.dataSaida)}</td>
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

export default RelatorioHospedagens;

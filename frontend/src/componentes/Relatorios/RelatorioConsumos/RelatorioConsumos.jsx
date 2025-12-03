import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import API_URL from '../../../config/api';
import '../RelatorioTemplate.css';
import '../RelatorioOcorrencias/RelatorioOcorrencias.css';

const RelatorioConsumos = () => {
  const navigate = useNavigate();
  const [consumos, setConsumos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [filtros, setFiltros] = useState({
    guest_name: '',
    start_date: '',
    end_date: ''
  });

  // Buscar dados
  const buscarConsumos = useCallback(async () => {
    setLoading(true);
    setErro('');

    try {
      const [consumosData, hospedesData, produtosData] = await Promise.all([
        fetch(`${API_URL}/consumos`).then(res => res.json()),
        fetch(`${API_URL}/guests`).then(res => res.json()),
        fetch(`${API_URL}/produtos`).then(res => res.json())
      ]);

      let merged = consumosData.map(c => {
        const hospede = hospedesData.find(h => h.id === c.hospedeId);
        const produto = produtosData.find(p => p.id === c.produtoId);
        return { ...c, hospede, produto };
      });

      // Aplica filtros
      if (filtros.guest_name)
        merged = merged.filter(c =>
          c.hospede?.nome.toLowerCase().includes(filtros.guest_name.toLowerCase())
        );
      if (filtros.start_date)
        merged = merged.filter(c => new Date(c.dataConsumo) >= new Date(filtros.start_date));
      if (filtros.end_date)
        merged = merged.filter(c => new Date(c.dataConsumo) <= new Date(filtros.end_date));

      setConsumos(merged);
    } catch (err) {
      console.error(err);
      setErro('Erro ao buscar consumos');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  // Datas iniciais: mês atual
  useEffect(() => {
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    const format = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    setFiltros(prev => ({ ...prev, start_date: format(primeiroDia), end_date: format(ultimoDia) }));
  }, []);

  useEffect(() => { buscarConsumos(); }, [buscarConsumos]);

  const handleFiltroChange = e => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const limparFiltros = () => setFiltros({ guest_name: '', start_date: '', end_date: '' });

  const formatarData = data => data ? new Date(data).toLocaleString('pt-BR', { dateStyle:'short', timeStyle:'short' }) : '-';

  // --- Rankings ---
  const topProdutos = () => {
    const countMap = {};
    consumos.forEach(c => {
      const key = c.produto?.nomeDoProduto || 'Desconhecido';
      countMap[key] = (countMap[key] || 0) + (c.quantidade || 1);
    });
    return Object.entries(countMap)
      .sort((a,b) => b[1]-a[1])
      .slice(0,5); // top 5
  };

  const topHospedes = () => {
    const countMap = {};
    consumos.forEach(c => {
      const key = c.hospede?.nome || 'Desconhecido';
      countMap[key] = (countMap[key] || 0) + 1;
    });
    return Object.entries(countMap)
      .sort((a,b) => b[1]-a[1])
      .slice(0,5); // top 5
  };

  // --- PDF ---
  const exportarParaPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    doc.setFillColor(21, 75, 122);
    doc.rect(0, 0, 595, 70, 'F'); 
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Consumos - Associação Bom Jesus', 40, 45);
    

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 40, 95); 

    let yPos = 120; 


    // Filtros
    if (filtros.guest_name || filtros.start_date || filtros.end_date) {
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      doc.setFont('helvetica', 'normal');
      if (filtros.guest_name) { doc.text(`-  Busca por nome: ${filtros.guest_name}`, 50, yPos); yPos+=12; }
      if (filtros.start_date) { doc.text(`-  Data Início: ${filtros.start_date}`, 50, yPos); yPos+=12; }
      if (filtros.end_date) { doc.text(`-  Data Fim: ${filtros.end_date}`, 50, yPos); yPos+=12; }
      yPos += 18;
    }

    // Rankings com ícones
    const produtosRank = topProdutos();
    if(produtosRank.length){
      doc.setFontSize(12);
      doc.setTextColor(21, 75, 122);
      doc.setFont('helvetica');
      doc.text('Produtos mais consumidos deste período:', 40, yPos);
      yPos += 25;
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      produtosRank.forEach(([produto, qtd], i) => {
        doc.text(`   ${i+1}. ${produto} - ${qtd} consumos`, 50, yPos); yPos+=12;
      });
      yPos += 18;
    }

    const hospedesRank = topHospedes();
    if(hospedesRank.length){
      doc.setFontSize(12);
      doc.setTextColor(21, 75, 122);
      doc.setFont('helvetica');
      doc.text('Hóspedes com os maiores consumos deste período:', 40, yPos);
      yPos += 25;
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      hospedesRank.forEach(([hospede, qtd], i) => {
        doc.text(`   ${i+1}. ${hospede} - ${qtd} consumos`, 50, yPos); yPos+=12;
      });
      yPos += 22;
    }

    // Tabela detalhada
    const tableData = consumos
      .sort((a,b) => (b.quantidade || 1) - (a.quantidade || 1))
      .map(c => [
        c.hospede?.nome || '-',
        c.hospede?.data_nascimento ? new Date(c.hospede.data_nascimento).toLocaleDateString('pt-BR') : '-',
        c.produto?.nomeDoProduto || '-',
        c.produto?.tamanho || '-',
        c.produto?.marca || '-',
        c.quantidade || '-',
        formatarData(c.dataConsumo)
      ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Hóspede','Data Nasc','Produto','Tamanho','Marca','Qtde','Data Consumo']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [21,75,122], textColor: 255, fontSize: 10, fontStyle: 'bold' },
      bodyStyles: { fontSize: 9, cellPadding: 4 },
      styles: { overflow:'linebreak', cellWidth:'wrap' },
      alternateRowStyles: { fillColor: [245,245,245] },
      margin: { left: 40, right: 40 },
    });

    doc.save(`relatorio-consumos-${new Date().toISOString().split('T')[0]}.pdf`);
  };


  // --- Render ---
  return (
    <div className="relatorio-container">
      <div className="relatorio-header">
        <button className="btn-voltar" onClick={() => navigate('/relatorios')}>← Voltar</button>
        <div className="relatorio-titulo">
          <h1>📊 Relatório de Consumos</h1>
          <p>Visualize e analise registros de consumos</p>
        </div>
      </div>

      <div className="relatorio-content">
        <div className="filtros-container">
          <h3>Filtros</h3>
          <div className="filtros-grid">
            <div className="filtro-item">
              <label>Nome do Hóspede:</label>
              <input type="text" name="guest_name" value={filtros.guest_name} onChange={handleFiltroChange} placeholder="Digite o nome" />
            </div>
            <div className="filtro-item">
              <label>Data Início:</label>
              <input type="date" name="start_date" value={filtros.start_date} onChange={handleFiltroChange} />
            </div>
            <div className="filtro-item">
              <label>Data Fim:</label>
              <input type="date" name="end_date" value={filtros.end_date} onChange={handleFiltroChange} min={filtros.start_date} />
            </div>
          </div>

          <div className="filtros-acoes">
            <button className="btn-buscar" onClick={buscarConsumos} disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
            <button className="btn-limpar" onClick={limparFiltros}>Limpar Filtros</button>
            <button className="btn-exportar" onClick={exportarParaPDF} disabled={consumos.length===0}>📄 Exportar PDF</button>
          </div>
        </div>

        {erro && <div className="erro-mensagem">{erro}</div>}

        {loading ? <p>Carregando...</p> : consumos.length === 0 ? <p>Nenhum consumo encontrado.</p> : (
          <div className="tabela-container">
            <table className="tabela-ocorrencias">
              <thead>
                <tr>
                  <th>Hóspede</th>
                  <th>Data Nascimento</th>
                  <th>Produto</th>
                  <th>Tamanho</th>
                  <th>Marca</th>
                  <th>Qtde</th>
                  <th>Data Consumo</th>
                </tr>
              </thead>
              <tbody>
                {consumos
                  .sort((a,b) => (b.quantidade || 1) - (a.quantidade || 1))
                  .map(c => (
                  <tr key={c.id}>
                    <td>{c.hospede?.nome}</td>
                    <td>{c.hospede?.data_nascimento ? new Date(c.hospede.data_nascimento).toLocaleDateString('pt-BR') : '-'}</td>
                    <td>{c.produto?.nomeDoProduto}</td>
                    <td>{c.produto?.tamanho}</td>
                    <td>{c.produto?.marca}</td>
                    <td>{c.quantidade}</td>
                    <td>{formatarData(c.dataConsumo)}</td>
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

export default RelatorioConsumos;

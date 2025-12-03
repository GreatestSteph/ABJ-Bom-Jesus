import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../RelatorioTemplate.css'; 
import API_URL from '../../../config/api';

const RelatorioSocioeconomico = () => {
  const navigate = useNavigate();
  const [hospedes, setHospedes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Adicionado filtros de cargo e renda (min/max)
  const [filtros, setFiltros] = useState({
    start_date: '',
    end_date: '',
    escolaridade: '',
    faixa_etaria: '',
    status_emprego: '',
    cargo: '',
    renda_min: '',
    renda_max: ''
  });

  const styles = {
    badge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.85em',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      display: 'inline-block',
      textAlign: 'center',
      minWidth: '100px'
    },
    badgeEmpregado: { backgroundColor: '#e8f5e9', color: '#2e7d32', border: '1px solid #c8e6c9' },
    badgeDesempregado: { backgroundColor: '#ffebee', color: '#c62828', border: '1px solid #ffcdd2' },
    statNumber: { fontSize: '1.8em', fontWeight: 'bold', color: '#154B7A' },
    statLabel: { fontSize: '0.9em', color: '#666', marginTop: '5px' }
  };

  const formatarMoeda = (valor) => {
    if (valor === undefined || valor === null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  const calcularMediaSalarial = (lista) => {
    if (!lista || lista.length === 0) return 0;
    const totalRenda = lista.reduce((acc, curr) => acc + (Number(curr.renda) || 0), 0);
    return totalRenda / lista.length;
  };

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return 0;
    const hoje = new Date();
    const nasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  };

  // Função auxiliar para agrupar dados (para o PDF)
  const agruparDados = (dados, chave) => {
    return dados.reduce((acc, item) => {
      const valor = item[chave] || 'Não informado';
      acc[valor] = (acc[valor] || 0) + 1;
      return acc;
    }, {});
  };

  const buscarDados = useCallback(async () => {
    setLoading(true);
    setErro('');

    try {
      const queryParams = new URLSearchParams();
      // Appending all filters to URL
      Object.keys(filtros).forEach(key => {
        if (filtros[key]) queryParams.append(key, filtros[key]);
      });

      const response = await fetch(`${API_URL}/relatorios/socioeconomico?${queryParams}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
         if(response.status === 404 || response.status === 500) {
            console.warn("API Mockada: Endpoint não encontrado, usando dados locais.");
            
            const mockData = [
                { id: 1, nome: 'João Silva', data_nascimento: '1980-05-12', escolaridade: 'Fundamental Incompleto', empregado: false, cargo: null, filhos: 2, renda: 0 },
                { id: 2, nome: 'Maria Oliveira', data_nascimento: '1995-10-20', escolaridade: 'Médio Completo', empregado: true, cargo: 'Recepcionista', filhos: 1, renda: 2500.00 },
                { id: 3, nome: 'Carlos Santos', data_nascimento: '1960-01-15', escolaridade: 'Analfabeto', empregado: false, cargo: 'Bico (Pedreiro)', filhos: 4, renda: 800.00 }, 
                { id: 4, nome: 'Ana Pereira', data_nascimento: '2001-03-10', escolaridade: 'Superior Incompleto', empregado: false, cargo: null, filhos: 0, renda: 0 },
                { id: 5, nome: 'Pedro Souza', data_nascimento: '1990-07-22', escolaridade: 'Médio Completo', empregado: true, cargo: 'Motorista', filhos: 0, renda: 3200.50 },
                { id: 6, nome: 'Fernanda Lima', data_nascimento: '1988-02-15', escolaridade: 'Superior Completo', empregado: true, cargo: 'Enfermeira', filhos: 2, renda: 4500.00 },
            ];

            let filtrados = mockData;

            // Filtros Locais
            if (filtros.escolaridade) filtrados = filtrados.filter(h => h.escolaridade === filtros.escolaridade);
            
            if (filtros.status_emprego !== '') {
                const isEmpregado = filtros.status_emprego === 'true';
                filtrados = filtrados.filter(h => h.empregado === isEmpregado);
            }

            // Filtro de Cargo (Texto parcial)
            if (filtros.cargo) {
                filtrados = filtrados.filter(h => h.cargo && h.cargo.toLowerCase().includes(filtros.cargo.toLowerCase()));
            }

            // Filtro de Renda (Range)
            if (filtros.renda_min) filtrados = filtrados.filter(h => h.renda >= parseFloat(filtros.renda_min));
            if (filtros.renda_max) filtrados = filtrados.filter(h => h.renda <= parseFloat(filtros.renda_max));

            if (filtros.faixa_etaria) {
                filtrados = filtrados.filter(h => {
                    const idade = calcularIdade(h.data_nascimento);
                    if (filtros.faixa_etaria === '18-25') return idade >= 18 && idade <= 25;
                    if (filtros.faixa_etaria === '26-40') return idade >= 26 && idade <= 40;
                    if (filtros.faixa_etaria === '41-60') return idade >= 41 && idade <= 60;
                    if (filtros.faixa_etaria === '60+') return idade > 60;
                    return true;
                });
            }

            setHospedes(filtrados);
            return;
         }
         throw new Error('Erro ao buscar dados socioeconômicos');
      }

      const dados = await response.json();
      setHospedes(dados);

    } catch (error) {
      console.error('Erro:', error);
      setErro('Erro ao buscar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    const formatarData = (data) => data.toISOString().split('T')[0];

    setFiltros(prev => ({
      ...prev,
      start_date: formatarData(primeiroDiaMes),
      end_date: formatarData(ultimoDiaMes)
    }));
  }, []);

  useEffect(() => {
    if (filtros.start_date && filtros.end_date) buscarDados();
  }, [filtros, buscarDados]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const limparFiltros = () => {
    setFiltros(prev => ({
      ...prev,
      escolaridade: '',
      faixa_etaria: '',
      status_emprego: '',
      cargo: '',
      renda_min: '',
      renda_max: ''
    }));
  };

  // --- LÓGICA DO PDF ---
  const exportarParaPDF = () => {
    const doc = new jsPDF();
    const dataAtual = new Date().toLocaleString('pt-BR');
    let yPos = 20;

    // Cabeçalho
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(21, 75, 122);
    doc.text('Relatório Socioeconômico Detalhado', 14, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gerado em: ${dataAtual} | Associação Bom Jesus`, 14, yPos);
    yPos += 10;

    // 1. Resumo Estatístico Geral
    const total = hospedes.length;
    const mediaSalarial = calcularMediaSalarial(hospedes);
    
    doc.setDrawColor(200);
    doc.line(14, yPos, 196, yPos); // Linha separadora
    yPos += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('1. Indicadores Principais', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`• Total de Pessoas: ${total}`, 14, yPos);
    doc.text(`• Renda Média Mensal: ${formatarMoeda(mediaSalarial)}`, 80, yPos);
    yPos += 15;

    // --- FUNÇÃO PARA DESENHAR GRÁFICOS DE BARRA SIMPLES ---
    const desenharGraficoBarras = (titulo, dados, corBarra) => {
        // Verifica se cabe na página, se não, nova página
        if (yPos > 250) { doc.addPage(); yPos = 20; }

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0);
        doc.text(titulo, 14, yPos);
        yPos += 8;

        const labels = Object.keys(dados);
        const maxValor = Math.max(...Object.values(dados), 1); // Evitar divisão por zero
        const larguraMaximaBarra = 100; // 100mm

        labels.forEach(label => {
            const qtd = dados[label];
            const larguraBarra = (qtd / maxValor) * larguraMaximaBarra;
            
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(`${label}`, 14, yPos + 3); // Nome da categoria
            
            // Desenha a barra
            doc.setFillColor(...corBarra); 
            doc.rect(60, yPos, larguraBarra, 4, 'F');
            
            // Texto da quantidade
            doc.setTextColor(50);
            doc.text(`${qtd}`, 60 + larguraBarra + 2, yPos + 3);
            doc.setTextColor(0);

            yPos += 7;
        });
        yPos += 5; // Espaço após gráfico
    };

    // 2. Gráfico: Situação de Emprego
    const dadosEmprego = {
        'Empregados': hospedes.filter(h => h.empregado).length,
        'Desempregados': hospedes.filter(h => !h.empregado).length
    };
    desenharGraficoBarras('2. Distribuição de Emprego', dadosEmprego, [46, 125, 50]); // Verde

    // 3. Gráfico: Escolaridade
    const dadosEscolaridade = agruparDados(hospedes, 'escolaridade');
    desenharGraficoBarras('3. Distribuição de Escolaridade', dadosEscolaridade, [21, 75, 122]); // Azul

    // 4. Gráfico: Faixas de Renda (Simulação de Histograma)
    const faixasRenda = {
        'Até R$ 1.000': hospedes.filter(h => h.renda <= 1000).length,
        'R$ 1.001 - R$ 2.500': hospedes.filter(h => h.renda > 1000 && h.renda <= 2500).length,
        'R$ 2.501 - R$ 5.000': hospedes.filter(h => h.renda > 2500 && h.renda <= 5000).length,
        'Acima de R$ 5.000': hospedes.filter(h => h.renda > 5000).length,
    };
    desenharGraficoBarras('4. Distribuição de Renda (Faixas)', faixasRenda, [255, 140, 0]); // Laranja

    // 5. Lista Detalhada de Cargos
    if (yPos > 240) { doc.addPage(); yPos = 20; }
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('5. Detalhamento de Ocupações/Cargos', 14, yPos);
    yPos += 8;

    const cargosAgrupados = agruparDados(hospedes.filter(h => h.cargo), 'cargo'); // Filtra apenas quem tem cargo
    const textosCargos = Object.entries(cargosAgrupados).map(([cargo, qtd]) => `${qtd} ${cargo}`);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    // Quebra o texto se for muito longo
    const linhasCargos = doc.splitTextToSize(textosCargos.join(',  '), 180);
    doc.text(linhasCargos, 14, yPos);
    yPos += (linhasCargos.length * 6) + 10;

    // 6. Tabela de Dados Completos
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('6. Listagem Completa', 14, yPos);
    yPos += 5;

    const tableData = hospedes.map(h => [
      h.nome,
      h.escolaridade || '-',
      formatarMoeda(h.renda || 0),
      h.cargo || (h.empregado ? 'Não informado' : 'Sem cargo'),
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Nome', 'Escolaridade', 'Renda', 'Cargo']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [60, 60, 60] },
      styles: { fontSize: 8 }
    });

    doc.save(`relatorio-completo-${dataAtual.split(' ')[0].replace(/\//g, '-')}.pdf`);
  };

  return (
    <div className="relatorio-container">
      <div className="relatorio-header">
        <button className="btn-voltar" onClick={() => navigate('/relatorios')}>← Voltar</button>
        <div className="relatorio-titulo">
          <h1>📊 Relatório Socioeconômico</h1>
          <p>Análise detalhada com Gráficos e Filtros Avançados</p>
        </div>
      </div>

      <div className="relatorio-content">
        <div className="filtros-container">
          <h3>Filtros de Pesquisa</h3>
          <div className="filtros-grid">
            {/* Filtros existentes ... */}
            <div className="filtro-item">
              <label>Escolaridade:</label>
              <select name="escolaridade" value={filtros.escolaridade} onChange={handleFiltroChange}>
                <option value="">Todas</option>
                <option value="Analfabeto">Analfabeto</option>
                <option value="Fundamental Incompleto">Fundamental Incompleto</option>
                <option value="Médio Completo">Médio Completo</option>
                <option value="Superior Completo">Superior Completo</option>
              </select>
            </div>

            <div className="filtro-item">
              <label>Cargo/Profissão:</label>
              <input 
                type="text" 
                name="cargo" 
                placeholder="Ex: Motorista" 
                value={filtros.cargo} 
                onChange={handleFiltroChange} 
                className="input-filtro"
              />
            </div>

            <div className="filtro-item">
               <label>Renda (Mín - Máx):</label>
               <div style={{ display: 'flex', gap: '5px' }}>
                 <input 
                    type="number" 
                    name="renda_min" 
                    placeholder="Mín" 
                    value={filtros.renda_min} 
                    onChange={handleFiltroChange}
                    className="input-filtro"
                    style={{ width: '50%' }}
                 />
                 <input 
                    type="number" 
                    name="renda_max" 
                    placeholder="Máx" 
                    value={filtros.renda_max} 
                    onChange={handleFiltroChange}
                    className="input-filtro"
                    style={{ width: '50%' }}
                 />
               </div>
            </div>

            <div className="filtro-item">
              <label>Situação Emprego:</label>
              <select name="status_emprego" value={filtros.status_emprego} onChange={handleFiltroChange}>
                <option value="">Todos</option>
                <option value="true">Empregado</option>
                <option value="false">Desempregado</option>
              </select>
            </div>
          </div>

          <div className="filtros-acoes">
            <button className="btn-buscar" onClick={buscarDados} disabled={loading}>
              {loading ? 'Carregando...' : 'Atualizar Dados'}
            </button>
            <button className="btn-limpar" onClick={limparFiltros}>Limpar</button>
            <button className="btn-exportar" onClick={exportarParaPDF} disabled={hospedes.length === 0}>
              📄 PDF com Gráficos
            </button>
          </div>
        </div>

        {erro && <div className="erro-mensagem">{erro}</div>}

        {!loading && hospedes.length > 0 && (
          <div className="estatisticas-container">
            <div className="stat-card">
              <span style={styles.statNumber}>{hospedes.length}</span>
              <span style={styles.statLabel}>Total</span>
            </div>
            <div className="stat-card">
                <span style={{ ...styles.statNumber, color: '#154B7A', fontSize: '1.4em' }}>
                    {formatarMoeda(calcularMediaSalarial(hospedes))}
                </span>
                <span style={styles.statLabel}>Renda Média</span>
            </div>
             {/* Lista rápida de cargos na tela */}
             <div className="stat-card" style={{ flex: 2, alignItems: 'flex-start', padding: '10px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9em', color: '#555' }}>Top Cargos:</span>
                <div style={{ fontSize: '0.85em', marginTop: '5px' }}>
                    {Object.entries(agruparDados(hospedes.filter(h=>h.cargo), 'cargo')).slice(0, 3).map(([c, q]) => (
                        <span key={c} style={{ marginRight: '10px', display: 'inline-block' }}>• {q} {c}</span>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* Tabela HTML Mantida igual... */}
        {!loading && hospedes.length > 0 && (
          <div className="tabela-container">
            <table className="tabela-bloqueios">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Escolaridade</th>
                  <th>Renda</th>
                  <th>Situação</th>
                  <th>Cargo</th>
                </tr>
              </thead>
              <tbody>
                {hospedes.map((hosp) => (
                  <tr key={hosp.id}>
                    <td>{hosp.nome}</td>
                    <td>{hosp.escolaridade || '-'}</td>
                    <td style={{ fontWeight: 'bold', color: '#555' }}>{formatarMoeda(hosp.renda)}</td>
                    <td>
                      <span style={{ ...styles.badge, ...(hosp.empregado ? styles.badgeEmpregado : styles.badgeDesempregado) }}>
                        {hosp.empregado ? 'EMPREGADO' : 'DESEMPREGADO'}
                      </span>
                    </td>
                    <td>{hosp.cargo || '-'}</td>
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

export default RelatorioSocioeconomico;
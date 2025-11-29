import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiLogOut } from "react-icons/fi";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import axios from "axios";
import API_URL from "../../../config/api";

export default function Hospedados() {
  const styles = {
    fundo: {
      backgroundImage: `url(${fundo})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      minHeight: "100vh",
      paddingTop: "180px",
      paddingBottom: "180px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    aroundListBox: {
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
      width: "100%",
      maxWidth: "1400px",
      fontFamily: "'Raleway', sans-serif",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "fixed",
    },
    th: {
      backgroundColor: "#f0f0f0",
      padding: "12px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    hr: {
      border: "none",
      height: "3px",
      backgroundColor: "rgb(60, 162, 245)",
      opacity: "100%",
      width: "100%",
      margin: 0,
    },
    functionNotSelected: {
      color: "rgb(42, 135, 211)",
      padding: "25px 30px",
      textDecoration: "none",
      fontWeight: "bold",
    },
    functionSelected: {
      backgroundColor: "rgb(60, 162, 245)",
      color: "white",
      padding: "25px 30px",
      textDecoration: "none",
      fontWeight: "bold",
    },
    
    button: {
      backgroundColor: "#e77f3c",
      color: "white",
      padding: "12px",
      width: "100%",
      borderRadius: "8px",
      border: "none",
      fontWeight: "bold",
      marginTop: "20px",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background-color 0.3s ease",
    },
    buttonCancel: {
      backgroundColor: "#001b5e",
      color: "white",
      padding: "12px",
      width: "100%",
      borderRadius: "8px",
      border: "none",
      fontWeight: "bold",
      marginTop: "20px",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background-color 0.3s ease",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "6px",
      color: "#001b5e",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "6px 0 4px 0",
      borderRadius: "8px",
      border: "2px solid #e77f3c",
      fontSize: "14px",
      color: "#001b5e",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    filtersContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '25px',
      alignItems: 'end',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    filterLabel: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#495057',
      marginBottom: '2px'
    },
    filterInput: {
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '14px',
      width: '100%',
      transition: 'border-color 0.2s'
    },
    filterSelect: {
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '14px',
      width: '100%',
      transition: 'border-color 0.2s',
      cursor: 'pointer'
    },
    clearButton: {
      padding: '10px 20px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s',
      height: 'fit-content'
    },
    dateInput: {
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '14px',
      transition: 'border-color 0.2s'
    },
    iconButton: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.2s",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "8px",
    },
    iconButtonView: {
      backgroundColor: "#6c757d",
      color: "white",
    },
  };

  const [hospedados, setHospedados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalEntrada, setShowModalEntrada] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Filtros adicionais (similares aos de Bloqueios)
  const [filters, setFilters] = useState({
    guestName: "",
    startDate: "",
    endDate: "",
    hospedou: "1" // Padrão: mostrar apenas hospedagens ativas
  });

  // Carrega dados do backend com filtros
  const carregarDados = async () => {
    try {
      setLoading(true);

      // Construir query params baseado nos filtros
      const params = new URLSearchParams();
      if (filters.guestName.trim()) {
        params.append('guest_name', filters.guestName.trim());
      }
      if (filters.startDate) {
        params.append('start_date', filters.startDate);
      }
      if (filters.endDate) {
        params.append('end_date', filters.endDate);
      }
      if (filters.hospedou !== '') {
        params.append('hospedou', filters.hospedou);
      }

      const url = `${API_URL}/entradas${params.toString() ? '?' + params.toString() : ''}`;
      const res = await axios.get(url);

      // guardamos lista
      setHospedados(res.data);
    } catch (e) {
      console.error("Erro ao carregar hospedados:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [filters]); // Recarrega quando os filtros mudarem


  // Formata data para exibição (usa horário local do navegador)
  const formatarData = (dataString) => {
    if (!dataString) return "—";
    const d = new Date(dataString);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // Handler para mudanças nos filtros
  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value
    };

    // Validação: se data inicial for maior que data final, ajusta data final
    if (field === 'startDate' && filters.endDate && value) {
      if (new Date(value) > new Date(filters.endDate)) {
        newFilters.endDate = value;
      }
    }

    setFilters(newFilters);
  };

  // Limpar todos os filtros
  const clearFilters = () => {
    setFilters({
      guestName: "",
      startDate: "",
      endDate: "",
      hospedou: "1" // Mantém o padrão de mostrar apenas ativos
    });
  };


  // Abrir modal de saída
  const abrirModalSaida = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Abrir modal de entrada 
  const abrirModalEntrada = () => {
    setShowModalEntrada(true);
  };



  // fechar modal
  const fecharModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  
  // Confirmar saída (registra data_saida)
  const confirmarSaida = async () => {
    try {
      await axios.put(`${API_URL}/entradas/${selectedId}`, {
        dataSaida: new Date().toISOString(),
      });
      setShowModal(false);
      setSelectedId(null);
      carregarDados();
    } catch (e) {
      console.error("Erro ao registrar saída:", e);
      alert("Erro ao registrar saída.");
    }
  };

  // Agrupamento por mês para visualização
  const agrupadoPorMes = {}; // chave: "YYYY-MM" -> array de itens
  hospedados.forEach((h) => {
    const d = new Date(h.dataEntrada);
    if (isNaN(d.getTime())) return; // pula se inválido
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0"); // "01".."12"
    const chave = `${ano}-${mes}`; // ex: "2025-11"
    if (!agrupadoPorMes[chave]) agrupadoPorMes[chave] = [];
    agrupadoPorMes[chave].push(h);
  });

  // Ordena chaves (do mais recente para o mais antigo)
  const chavesOrdenadas = Object.keys(agrupadoPorMes).sort((a, b) => {
    const [aY, aM] = a.split("-").map(Number);
    const [bY, bM] = b.split("-").map(Number);
    if (aY !== bY) return bY - aY; // ordena decrescente por ano
    return bM - aM; // decrescente por mês
  });

  // Função para transformar chave "YYYY-MM" em label "Novembro de 2025"
  const labelFromKey = (key) => {
    const [y, m] = key.split("-");
    const d = new Date(Number(y), Number(m) - 1, 1);
    return d.toLocaleString("pt-BR", { month: "long", year: "numeric" });
  };

  // --- STATES E FUNÇÕES DO FORMULÁRIO (copiados do EntradaHospedes.jsx) ---
  const [hospedesModal, setHospedesModal] = useState([]); // renomeei para evitar conflito com hospedados da lista
  const [hospedeSelecionado, setHospedeSelecionado] = useState(null);
  const [bloqueados, setBloqueados] = useState([]);
  const [buscaHospede, setBuscaHospede] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingModal, setLoadingModal] = useState(false);

  const [form, setForm] = useState({
    hospedeId: "",
    dataEntrada: "",
    hospedou: "",
  });
  
  // carregar hóspedes permitidos (guests sem bloqueios)
  const carregarHospedesPermitidos = async () => {
    try {
      setLoadingModal(true);
      const [hRes, bRes] = await Promise.all([
        fetch(`${API_URL}/guests`),
        fetch(`${API_URL}/bloqueios`),
      ]);
      const listaHospedes = await hRes.json();
      const listaBloqueios = await bRes.json();
      const bloqueadosIDs = Array.isArray(listaBloqueios) ? listaBloqueios.map((b) => b.hospedeId) : [];
      const permitidos = Array.isArray(listaHospedes) ? listaHospedes.filter((h) => !bloqueadosIDs.includes(h.id)) : [];
      setHospedesModal(permitidos);
    } catch (e) {
      console.error("Erro ao carregar hóspedes/bloqueios (modal):", e);
    } finally {
      setLoadingModal(false);
    }
  };

  // efeito: carrega hóspedes ao abrir modal
  useEffect(() => {
    if (showModalEntrada) {
      carregarHospedesPermitidos(); // se você tiver essa função
      fetch(`${API_URL}/bloqueios`)
        .then(res => res.json())
        .then(data => setBloqueados(data))
        .catch(err => console.error("Erro ao carregar bloqueios:", err));
    }
  }, [showModalEntrada]);


  const hospedesFiltrados = hospedesModal.filter(
    (h) =>
      h.nome?.toLowerCase().includes(buscaHospede.toLowerCase()) ||
      (h.cpf && h.cpf.includes(buscaHospede)) ||
      (h.rg && h.rg.includes(buscaHospede))
  );

  const hospedesFiltradosSemBloqueio = hospedesFiltrados.filter(h => {
    const bloqueadoAtivo = bloqueados.some(b =>
      b.hospede_id === h.id &&
      (b.status_calculado || b.status || "").toLowerCase() === "ativo"
    );
    return !bloqueadoAtivo;
  });


  function validateModal() {
    const newErrors = {};
    if (!hospedeSelecionado) newErrors.hospede = "Selecione um hóspede.";
    if (!form.dataEntrada) newErrors.dataEntrada = "Selecione a data da entrada.";
    if (form.hospedou === "") newErrors.hospedou = "Selecione se hospedou.";
    return newErrors;
  }

  async function handleSubmitModal(e) {
    e.preventDefault();
    const validationErrors = validateModal();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const body = {
      hospedeId: hospedeSelecionado.id,
      dataEntrada: new Date(form.dataEntrada).toISOString(),
      hospedou: form.hospedou === "true",
    };
    try {
      const res = await fetch(`${API_URL}/entradas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Erro do backend:", text);
        alert("Erro ao salvar entrada. Veja console.");
        return;
      }
      // Limpar modal
      setHospedeSelecionado(null);
      setBuscaHospede("");
      setForm({ hospedeId: "", dataEntrada: "", hospedou: "" });
      setErrors({});
      // Fechar modal de entrada
      setShowModalEntrada(false);
      // Mostrar modal de sucesso
      setShowSuccessModal(true);
      // Recarregar dados e hóspedes permitidos
      carregarDados();
      carregarHospedesPermitidos();
    } catch (err) {
      console.error("Erro ao salvar entrada (modal):", err);
      alert("Erro inesperado ao salvar.");
    }
  }

  useEffect(() => {
    fetch(`${API_URL}/bloqueios`)
      .then(res => res.json())
      .then(data => setBloqueados(data))
      .catch(err => console.error("Erro ao buscar bloqueios:", err));
  }, []);


  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
        {/* Menu */}
        <div className="d-flex flex-start">
          <Link to="/hospedes" style={styles.functionNotSelected}>
            Hóspedes
          </Link>
          <Link to="/historicodehospedagens" style={styles.functionSelected}>
            Lista de Hospedagens
          </Link>
          <Link to="/bloqueios" style={styles.functionNotSelected}>
            Bloqueios
          </Link>
        </div>
        <hr style={styles.hr} />



        <div className="mt-4 pt-3 mb-4 mx-5 px-2">
          {/* SEÇÃO DE FILTROS PRINCIPAIS */}
          <div style={styles.filtersContainer}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Nome do Hóspede</label>
              <input
                type="text"
                placeholder="Digite o nome do hóspede"
                value={filters.guestName}
                onChange={(e) => handleFilterChange('guestName', e.target.value)}
                style={styles.filterInput}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Data Inicial</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                style={styles.dateInput}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Data Final</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                style={styles.dateInput}
                min={filters.startDate}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Status</label>
              <select
                value={filters.hospedou}
                onChange={(e) => handleFilterChange('hospedou', e.target.value)}
                style={styles.filterSelect}
              >
                <option value="">Todas as hospedagens</option>
                <option value="1">Hospedagens Ativas</option>
                <option value="0">Hospedagens Encerradas</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              style={styles.clearButton}
            >
              Limpar Filtros
            </button>
          </div>

          <div style={{ marginBottom: "25px", display: 'flex', justifyContent: 'flex-end' }}>
            {/* Botao que abre formulario de entrada em modal */}
            <button
              onClick={() => abrirModalEntrada()}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                borderRadius: "8px",
                color: "white",
                border: 'none',
                backgroundColor: "#28a745",
                fontFamily: "'Raleway', sans-serif",
                fontWeight: '600',
                cursor: 'pointer',
              }}>
              Registrar Entrada
            </button>
          </div>

          {loading && <p style={{ textAlign: 'center' }}>Carregando...</p>}

          {/* LISTA DE HOSPEDAGENS AGRUPADAS POR MÊS */}
          {!loading && chavesOrdenadas.length === 0 && (
            <p style={{ textAlign: 'center', padding: '20px' }}>Nenhuma hospedagem encontrada.</p>
          )}

          {!loading && chavesOrdenadas.map((chave) => (
            <div key={chave} style={{ marginBottom: "40px" }}>
              <h3
                style={{
                  backgroundColor: "rgb(60, 162, 245)",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}>
                {labelFromKey(chave)}
              </h3>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Nome</th>
                    <th style={styles.th}>Entrada</th>
                    <th style={styles.th}>Saída</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {agrupadoPorMes[chave].map((item) => {
                    const isAtivo = !item.dataSaida; // Ativo = sem data de saída
                    return (
                      <tr key={item.id}>
                        <td style={styles.td}>{item.hospede?.nome}</td>
                        <td style={styles.td}>{formatarData(item.dataEntrada)}</td>
                        <td style={styles.td}>{formatarData(item.dataSaida)}</td>
                        <td style={styles.td}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: isAtivo ? '#d4edda' : '#f8d7da',
                            color: isAtivo ? '#155724' : '#721c24',
                          }}>
                            {isAtivo ? 'ATIVO' : 'ENCERRADO'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <Link
                            to={`/historicodehospedagens/detalhes/${item.id}`}
                            style={{ ...styles.iconButton, ...styles.iconButtonView }}
                            title="Visualizar detalhes"
                          >
                            <FiEye />
                          </Link>
                          {isAtivo && (
                            <button
                              onClick={() => abrirModalSaida(item.id)}
                              title="Registrar Saída"
                              style={{
                                padding: "8px 12px",
                                borderRadius: "6px",
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "16px",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                              <FiLogOut />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>



      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "350px",
            }}>
            <h4>Confirmar Saída</h4>
            <p>Deseja realmente registrar a saída deste hóspede?</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button
                onClick={confirmarSaida}
                style={{
                  background: "#28a745",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                }}>
                Confirmar
              </button>
              <button
                onClick={fecharModal}
                style={{
                  background: "#dc3545",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>)}
        {showModalEntrada && (
            <div style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,}}>
                  
              <div style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "640px",        
                  maxHeight: "85vh",
                  overflowY: "auto",}}>
                
                <form onSubmit={handleSubmitModal} style={styles.formBox2} className="row" noValidate>
                  <h2 className="text-center w-100 mb-4" style={{ color: "#001b5e" }}>
                    Registrar Entrada
                  </h2>

                  {/* CAMPO 1 — Selecionar Hóspede */}
                  <div className="col-md-12 mb-3">
                    <label style={styles.label}>Buscar Hóspede (nome, CPF ou RG)</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={buscaHospede}
                      onChange={(e) => setBuscaHospede(e.target.value)}
                      placeholder="Digite para buscar hóspede..."
                    />
                    {buscaHospede && (
                      <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ccc", background: "#fff" }}>
                        {hospedesFiltradosSemBloqueio.map((h) => (
                          <div
                            key={h.id}
                            onClick={() => {
                              setHospedeSelecionado(h);
                              setForm((p) => ({ ...p, hospedeId: h.id }));
                              setBuscaHospede("");
                            }}
                            style={{
                              padding: "8px",
                              borderBottom: "1px solid #ccc",
                              cursor: "pointer",
                            }}>
                            {h.nome} — {h.cpf || h.rg || (h.data_nascimento ? new Date(h.data_nascimento).toLocaleDateString() : "")}
                          </div>))}

                        {hospedesFiltrados.length === 0 && (
                          <div style={{ padding: "8px", color: "#666" }}>Nenhum hóspede encontrado</div>
                        )}
                      </div>)}

                    {hospedeSelecionado && (
                      <p style={{ color: "green", marginTop: "5px" }}>
                        Hóspede selecionado: <strong>{hospedeSelecionado.nome}</strong>
                      </p>)}
                      
                    {errors.hospede && (
                      <p style={{ color: "red", marginTop: "5px" }}>{errors.hospede}</p>
                    )}
                  </div>

                  {/* CAMPO 2 — Data da Entrada */}
                  <div className="col-md-12 mb-3">
                    <label style={styles.label}>Data da Entrada</label>
                    <input
                      type="datetime-local"
                      style={styles.input}
                      value={form.dataEntrada}
                      onChange={(e) => setForm((p) => ({ ...p, dataEntrada: e.target.value }))}
                      required/>
                    {errors.dataEntrada && (
                      <p style={{ color: "red", marginTop: "5px" }}>{errors.dataEntrada}</p>
                    )}
                  </div>

                  {/* CAMPO 3 — Se hospedou? */}
                  <div className="col-md-12 mb-3">
                    <label style={styles.label}>Hóspede se hospedou na unidade?</label>
                    <select
                      style={styles.input}
                      value={form.hospedou}
                      onChange={(e) => setForm((p) => ({ ...p, hospedou: e.target.value }))}
                      required>
                      <option value="">Selecione</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                    {errors.hospedou && (
                      <p style={{ color: "red", marginTop: "5px" }}>{errors.hospedou}</p>
                    )}
                  </div>

                  <div className="col-12 d-flex justify-content-between mt-4 gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setShowModalEntrada(false)}
                      style={{
                        ...styles.buttonCancel,
                        maxWidth: "200px",
                        textAlign: "center",
                        display: "inline-block",
                      }}>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      style={{ ...styles.button, maxWidth: "200px", display: "inline-block" }}>
                      Salvar
                    </button>
                  </div>
                </form>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
          }}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "400px",
              textAlign: "center",
            }}>
            <div style={{
              fontSize: "48px",
              color: "#28a745",
              marginBottom: "15px"
            }}>
              ✓
            </div>
            <h3 style={{ color: "#001b5e", marginBottom: "10px" }}>Sucesso!</h3>
            <p style={{ marginBottom: "20px", color: "#495057" }}>
              Entrada registrada com sucesso!
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{
                background: "#28a745",
                color: "white",
                padding: "12px 30px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}>
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

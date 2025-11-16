import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import axios from "axios";

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
  };

  const [hospedados, setHospedados] = useState([]);
  const [allHospedados, setAllHospedados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMonth, setFilteredMonth] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalEntrada, setShowModalEntrada] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Carrega dados do backend
  const carregarDados = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/entradas");
      const ativos = res.data.filter((e) => String(e.hospedou) === "1");

      // guardamos lista original e exibida
      setAllHospedados(ativos);
      setHospedados(ativos);
    } catch (e) {
      console.error("Erro ao carregar hospedados:", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    carregarDados();
  }, []);


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
  // Filtra por mês selecionado no formato "YYYY-MM" (ex: "2025-11")
  const filtrarMes = (valor) => {
    setFilteredMonth(valor);
    if (!valor) {
      setHospedados(allHospedados);
      return;
    }
    const [ano, mes] = valor.split("-").map(Number);
    const filtrados = allHospedados.filter((h) => {
      const d = new Date(h.dataEntrada);
      return d.getFullYear() === ano && d.getMonth() + 1 === mes;
    });
    setHospedados(filtrados);
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

  
  // Confirmar saída (marca hospedou = 0 e registra data_saida)
  const confirmarSaida = async () => {
    try {
      await axios.put(`http://localhost:3001/entradas/${selectedId}`, {
        hospedou: 0,
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


  // Isso evita problemas de parsing/meses trocados.
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

  // Ordena chaves (do mais recente para o mais antigo -- muda se quiser ascendente)
  const chavesOrdenadas = Object.keys(agrupadoPorMes).sort((a, b) => {
    // a e b são "YYYY-MM"
    const [aY, aM] = a.split("-").map(Number);
    const [bY, bM] = b.split("-").map(Number);
    if (aY !== bY) return bY - aY; // ordena decrescente por ano
    return bM - aM; // decrescente por mês
  });

  // Função para transformar chave "YYYY-MM" em label "Novembro de 2025"
  const labelFromKey = (key) => {
    const [y, m] = key.split("-");
    // cria uma Date segura usando partes numéricas
    const d = new Date(Number(y), Number(m) - 1, 1);
    return d.toLocaleString("pt-BR", { month: "long", year: "numeric" });
  };


  // lista de meses para o select (baseada em allHospedados)
  const mesesDisponiveis = [
    ...new Set(
      allHospedados.map((h) => {
        const d = new Date(h.dataEntrada);
        if (isNaN(d.getTime())) return null;
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        return `${y}-${m}`;
      }).filter(Boolean)
    ),
  ]
    .sort((a, b) => {
      const [ay, am] = a.split("-").map(Number);
      const [by, bm] = b.split("-").map(Number);
      if (ay !== by) return by - ay;
      return bm - am;
    });

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
        fetch("http://localhost:3001/guests"),
        fetch("http://localhost:3001/bloqueios"),
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
      fetch("http://localhost:3001/bloqueios")
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
      const res = await fetch("http://localhost:3001/entradas", {
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
      alert("Entrada salva com sucesso!");
      // Limpar modal
      setHospedeSelecionado(null);
      setBuscaHospede("");
      setForm({ hospedeId: "", dataEntrada: "", hospedou: "" });
      setErrors({});
      // Fechar modal
      setShowModalEntrada(false);
      // Recarregar dados e hóspedes permitidos
      carregarDados();
      carregarHospedesPermitidos();
    } catch (err) {
      console.error("Erro ao salvar entrada (modal):", err);
      alert("Erro inesperado ao salvar.");
    }
  }

  console.log("Hóspedes filtrados:", hospedesFiltrados);
  console.log("Bloqueados:", bloqueados);
  console.log("Resultado final sem bloqueio:", hospedesFiltradosSemBloqueio);


  useEffect(() => {
    fetch("http://localhost:3001/bloqueios")
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
          <div style={{ marginBottom: "25px", display: 'flex', justifyContent: 'space-between' }}>

            <div>
              {/* FILTRO POR MÊS */}
              <label style={{ fontWeight: "600", marginRight: "15px" }}>
                Filtrar por mês:
              </label>

              <select
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "260px",
                  fontFamily: "'Raleway', sans-serif",
                }}
                value={filteredMonth}
                onChange={(e) => filtrarMes(e.target.value)}>
                <option value="">Todos os meses</option>
                {mesesDisponiveis.map((mesKey) => (
                  <option key={mesKey} value={mesKey}>
                    {labelFromKey(mesKey)}
                  </option>
                ))}
              </select>
              {loading && <span style={{ marginLeft: 12 }}>carregando...</span>}
            </div>

            <div>
              {/* Botao que abre formulario de entrada em modal */}
              <button
                onClick={() => abrirModalEntrada()}
                
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  width: "190px",
                  color: "white",
                  border: 'none',
                  backgroundColor: "rgba(216, 117, 25, 1)",
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: '600',
                }}>
                Registrar Entrada
              </button>
            </div>

          </div>


          {/* LISTA AGRUPADA POR MÊS */}
          {chavesOrdenadas.length === 0 && !loading && (
            <p>Nenhuma hospedagem encontrada.</p>
          )}



          {chavesOrdenadas.map((chave) => (
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
                    <th style={styles.th}>CPF</th>
                    <th style={styles.th}>Entrada</th>
                    <th style={styles.th}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {agrupadoPorMes[chave].map((item) => (
                    <tr key={item.id}>
                      <td style={styles.td}>{item.hospede?.nome}</td>
                      <td style={styles.td}>{item.hospede?.cpf || "—"}</td>
                      <td style={styles.td}>{formatarData(item.dataEntrada)}</td>
                      <td style={styles.td}>
                        <button
                          onClick={() => abrirModalSaida(item.id)}
                          style={{
                            padding: "6px 17px",
                            borderRadius: "6px",
                            backgroundColor: "rgba(0, 80, 155, 1)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: '500',}}>
                          Registrar Saída
                        </button>
                      </td>
                    </tr>
                  ))}
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
    </main>
  );
}

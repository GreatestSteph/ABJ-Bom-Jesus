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
  };

  const [hospedados, setHospedados] = useState([]);
  const [allHospedados, setAllHospedados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMonth, setFilteredMonth] = useState("");

  const [showModal, setShowModal] = useState(false);
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

  // Confirmar saída (marca hospedou = 0)
  const confirmarSaida = async () => {
    try {
      await axios.put(`http://localhost:3001/entradas/${selectedId}`, {
        hospedou: 0,
      });
      setShowModal(false);
      setSelectedId(null);
      carregarDados();
    } catch (e) {
      console.error("Erro ao registrar saída:", e);
      alert("Erro ao registrar saída.");
    }
  };

  const fecharModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  // ========================= AGRUPAR POR CHAVE NUMÉRICA (YYYY-MM) =========================
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

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
        {/* Menu */}
        <div className="d-flex flex-start">
          <Link to="/hospedes" style={styles.functionNotSelected}>
            Hóspedes
          </Link>
          <Link to="/entradahospedes" style={styles.functionNotSelected}>
            Hospedagem
          </Link>
          <Link to="/historicodehospedagens" style={styles.functionSelected}>
            Lista de Entradas
          </Link>
          <Link to="/bloqueios" style={styles.functionNotSelected}>
            Bloqueios
          </Link>
        </div>

        <hr style={styles.hr} />

        <div className="mt-4 pt-3 mb-4 mx-5 px-2">
          {/* FILTRO POR MÊS */}
          <div style={{ marginBottom: "25px" }}>
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
              onChange={(e) => filtrarMes(e.target.value)}
            >
              <option value="">Todos os meses</option>
              {mesesDisponiveis.map((mesKey) => (
                <option key={mesKey} value={mesKey}>
                  {labelFromKey(mesKey)}
                </option>
              ))}
            </select>
            {loading && <span style={{ marginLeft: 12 }}>carregando...</span>}
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
                }}
              >
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
                            padding: "6px 12px",
                            borderRadius: "6px",
                            backgroundColor: "rgba(216, 101, 25, 1)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
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
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "350px",
            }}
          >
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
                }}
              >
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
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

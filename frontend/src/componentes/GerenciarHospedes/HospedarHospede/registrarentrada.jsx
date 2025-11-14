import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

export default function EntradaHospedes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hospedes, setHospedes] = useState([]);
  const [hospedeSelecionado, setHospedeSelecionado] = useState(null);
  const [buscaHospede, setBuscaHospede] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    hospedeId: "",
    dataEntrada: "", // string para input datetime-local
    hospedou: "", // "true" | "false" | ""
  });

  const styles = {
    fundo: {
      backgroundImage: `url(${fundo})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
      paddingTop: '120px',
      paddingBottom: '180px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.98) 695px, transparent 115%)',
    },
    aroundListBox: {
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
      width: "100%",
      maxWidth: "1200px",
      fontFamily: "'Raleway', sans-serif",
    },
    formBox2: {
      padding: "40px",
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
    functionNotSelected: {
      color: 'rgb(42, 135, 211)',
      borderTopLeftRadius: '20px',
      padding: '25px 30px',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    functionSelected: {
      backgroundColor: 'rgb(60, 162, 245)',
      color: 'white',
      padding: '25px 30px',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
  };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [hRes, bRes] = await Promise.all([
          fetch("http://localhost:3001/guests"),
          fetch("http://localhost:3001/bloqueios"),
        ]);
        const listaHospedes = await hRes.json();
        const listaBloqueios = await bRes.json();
        const bloqueadosIDs = Array.isArray(listaBloqueios)
          ? listaBloqueios.map((b) => b.hospedeId)
          : [];

        const permitidos = Array.isArray(listaHospedes)
          ? listaHospedes.filter((h) => !bloqueadosIDs.includes(h.id))
          : [];

        setHospedes(permitidos);
      } catch (e) {
        console.error("Erro ao carregar hóspedes/bloqueios:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // quando estiver em edição, carrega a entrada e coloca no form
  useEffect(() => {
    if (!id) return;

    async function loadEntrada() {
      try {
        const res = await fetch(`http://localhost:3001/entradas/${id}`);
        if (!res.ok) throw new Error("Não conseguiu buscar entrada");
        const data = await res.json();
        const dt = data.dataEntrada ? new Date(data.dataEntrada) : null;
        const formatted = dt
          ? dt.toISOString().slice(0, 16)
          : "";

        setForm({
          hospedeId: data.hospedeId || "",
          dataEntrada: formatted,
          hospedou: typeof data.hospedou === "boolean" ? String(data.hospedou) : (data.hospedou ?? ""),
        });
        const found = hospedes.find((h) => h.id === data.hospedeId);
        if (found) setHospedeSelecionado(found);
      } catch (e) {
        console.error("Erro ao carregar entrada:", e);
      }
    }

    loadEntrada();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    if (form.hospedeId && !hospedeSelecionado) {
      const found = hospedes.find((h) => h.id === form.hospedeId);
      if (found) setHospedeSelecionado(found);
    }
  }, [hospedes, id]);

  
  const hospedesFiltrados = hospedes.filter(
    (h) =>
      h.nome?.toLowerCase().includes(buscaHospede.toLowerCase()) ||
      (h.cpf && h.cpf.includes(buscaHospede)) ||
      (h.rg && h.rg.includes(buscaHospede))
  );

  function validate() {
    const newErrors = {};
    if (!hospedeSelecionado) newErrors.hospede = "Selecione um hóspede.";
    if (!form.dataEntrada) newErrors.dataEntrada = "Selecione a data da entrada.";
    if (form.hospedou === "") newErrors.hospedou = "Selecione se hospedou.";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // monta body (hospedou como boolean)
    const body = {
      hospedeId: hospedeSelecionado.id,
      dataEntrada: new Date(form.dataEntrada).toISOString(), // salva em ISO no backend
      hospedou: form.hospedou === "true",
    };

    try {
      let res;
      if (id) {
        res = await fetch(`http://localhost:3001/entradas/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("http://localhost:3001/entradas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) {
        const text = await res.text();
        console.error("Erro do backend:", text);
        alert("Erro ao salvar entrada. Veja console.");
        return;
      }

      alert("Entrada salva com sucesso!");
      navigate("/hospedagem");
    } catch (err) {
      console.error("Erro ao salvar entrada:", err);
      alert("Erro inesperado ao salvar.");
    }
  }

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
        <div style={{ borderRadius: '12px' }} className='d-flex flex-start'>
          <Link to="/hospedes" style={styles.functionNotSelected}>
            Hóspedes
          </Link>

          <Link to="/hospedagem" style={styles.functionSelected}>
            Hospedagem
          </Link>

          <Link to="/historicodehospedagens" style={styles.functionNotSelected}>
            Lista de Hospedagens
          </Link>

          <Link to="/bloqueios" style={styles.functionNotSelected}>
            Bloqueios
          </Link>
        </div>
        <hr style={{ border: 'none', height: '3px', backgroundColor: 'rgb(60, 162, 245)', opacity: '100%', width: '100%', margin: 0 }} />

        <form onSubmit={handleSubmit} style={styles.formBox2} className="row" noValidate>
          <h2 className="text-center w-100 mb-4" style={{ color: "#001b5e" }}>
            {id ? "Editar Entrada" : "Registrar Entrada"}
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
                {hospedesFiltrados.map((h) => (
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
                    }}
                  >
                    {h.nome} — {h.cpf || h.rg || (h.data_nascimento ? new Date(h.data_nascimento).toLocaleDateString() : "")}
                  </div>
                ))}

                {hospedesFiltrados.length === 0 && (
                  <div style={{ padding: "8px", color: "#666" }}>Nenhum hóspede encontrado</div>
                )}
              </div>
            )}

            {hospedeSelecionado && (
              <p style={{ color: "green", marginTop: "5px" }}>
                Hóspede selecionado: <strong>{hospedeSelecionado.nome}</strong>
              </p>
            )}
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
              required
            />
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
              required
            >
              <option value="">Selecione</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
            {errors.hospedou && (
              <p style={{ color: "red", marginTop: "5px" }}>{errors.hospedou}</p>
            )}
          </div>

          <div className="col-12 d-flex justify-content-between mt-4 gap-3 flex-wrap">
            <Link
              to="/hospedagem"
              style={{
                ...styles.buttonCancel,
                maxWidth: "200px",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              Cancelar
            </Link>
            <button
              type="submit"
              style={{ ...styles.button, maxWidth: "200px", display: "inline-block" }}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

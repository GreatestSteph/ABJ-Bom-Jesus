import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

export default function EditGuest() {
  const { id } = useParams(); // se houver id, é edição
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    data_nascimento: "",
    rg: "",
    cpf: "",
    data_contato_familia: "",
    escolaridade: "",
    empregado: false,
    biometria: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/guests/${id}`)
        .then(res => res.json())
        .then(data => {
          setForm({
            ...data,
            data_nascimento: data.data_nascimento?.slice(0, 10) || "",
            data_contato_familia: data.data_contato_familia?.slice(0, 10) || "",
          });
        })
        .catch(err => console.error("Erro ao carregar hóspede:", err));
    }
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `http://localhost:3001/guests/${id}` : "http://localhost:3001/guests";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar");
        navigate("/hospedes");
      })
      .catch(err => alert("Erro ao salvar hóspede."));
  }

  const styles = {
    fundo: {
      backgroundImage: `url(${fundo})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      minHeight: "100vh",
      paddingTop: "100px",
      paddingBottom: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formBox: {
      backgroundColor: "#e77f3c",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      maxWidth: "900px",
      width: "100%",
      color: "white",
      fontFamily: "'Raleway', sans-serif",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "2px 0 15px 0",
      borderRadius: "8px",
      border: "none",
      fontSize: "14px",
    },
    button: {
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
    },
    label: {
      display: "block"
    }
  };

  return (
    <main style={styles.fundo}>
      <form onSubmit={handleSubmit} style={styles.formBox} className="row g-4">
        <h2 className="text-center w-100 mb-4">{id ? "Editar Hóspede" : "Cadastrar Hóspede"}</h2>

        <div className="col-md-6">
          <div>
            <label htmlFor="nome" style={styles.label}>Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={form.nome}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="data_nascimento" style={styles.label}>Data de Nascimento</label>
            <input
              type="date"
              name="data_nascimento"
              id="data_nascimento"
              value={form.data_nascimento}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="rg" style={styles.label}>RG</label>
            <input
              type="text"
              name="rg"
              id="rg"
              value={form.rg}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="empregado"
              name="empregado"
              checked={form.empregado}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            <label className="form-check-label" htmlFor="empregado">
              Está empregado?
            </label>
          </div>
        </div>

        <div className="col-md-6">
          <div>
            <label htmlFor="data_contato_familia" style={styles.label}>Data de Contato com a Família</label>
            <input
              type="date"
              name="data_contato_familia"
              id="data_contato_familia"
              value={form.data_contato_familia}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="escolaridade" style={styles.label}>Escolaridade</label>
            <select
              name="escolaridade"
              id="escolaridade"
              value={form.escolaridade}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Selecione a Escolaridade</option>
              <option value="Analfabeto">Analfabeto</option>
              <option value="Fundamental Incompleto">Fundamental Incompleto</option>
              <option value="Fundamental Completo">Fundamental Completo</option>
              <option value="Médio Incompleto">Médio Incompleto</option>
              <option value="Médio Completo">Médio Completo</option>
              <option value="Superior Incompleto">Superior Incompleto</option>
              <option value="Superior Completo">Superior Completo</option>
            </select>
          </div>
          <div>
            <label htmlFor="cpf" style={styles.label}>CPF</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              value={form.cpf}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          
        </div>

        <div className="col-12 d-flex justify-content-between mt-4">
          <Link to="/hospedes" style={{ ...styles.button, maxWidth: "200px" }}>
            Cancelar
          </Link>
          <button type="submit" style={{ ...styles.button, maxWidth: "200px" }}>
            Salvar
          </button>
        </div>
      </form>
    </main>
  );
}

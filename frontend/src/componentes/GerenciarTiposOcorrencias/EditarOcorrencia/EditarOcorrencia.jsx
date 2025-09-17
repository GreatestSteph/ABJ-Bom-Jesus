import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

function InputGroup({ children, error }) {
  return (
    <div style={{ marginBottom: "6px", minHeight: error ? 70 : 52 }}>
      {children}
      <div style={{ minHeight: "18px" }}>
        {error && (
          <div style={{ color: 'red', fontSize: '13px', minHeight: "18px", marginTop: "2px" }}>{error}</div>
        )}
      </div>
    </div>
  );
}

export default function EditOcorrencia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    nivel: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/tipos-ocorrencia/${id}`)
        .then(res => res.json())
        .then(data => {
          setForm({
            nome: data.nome || "",
            descricao: data.descricao || "",
            nivel: data.nivel || "",
          });
        })
        .catch(err => console.error("Erro ao carregar tipo de ocorrência:", err));
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!form.nome.trim()) {
      newErrors.nome = "O nome é obrigatório.";
    } else if (form.nome.trim().length < 3) {
      newErrors.nome = "O nome deve ter pelo menos 3 caracteres.";
    }

    if (!form.nivel) {
      newErrors.nivel = "Por favor, selecione o nível.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:3001/tipos-ocorrencia/${id}`
      : "http://localhost:3001/tipos-ocorrencia";

    const formToSend = {
      nome: form.nome.trim(),
      descricao: form.descricao.trim() || null,
      nivel: form.nivel,
    };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToSend),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao salvar");
        navigate("/ocorrencias");
      })
      .catch((err) => alert("Erro ao salvar tipo de ocorrência."));
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
      backgroundColor: "#fff",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 27, 94, 0.3)",
      maxWidth: "900px",
      width: "100%",
      color: "#001b5e",
      fontFamily: "'Raleway', sans-serif",
    },
    formBox2: {
      padding: "40px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "6px 0 0 0",
      borderRadius: "8px",
      border: "2px solid #e77f3c",
      fontSize: "14px",
      color: "#001b5e",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      margin: "6px 0 0 0",
      borderRadius: "8px",
      border: "2px solid #e77f3c",
      fontSize: "14px",
      color: "#001b5e",
      outline: "none",
      transition: "border-color 0.3s ease",
      resize: "vertical",
      minHeight: "100px",
    },
    inputFocus: {
      borderColor: "#004aad",
      boxShadow: "0 0 5px #004aad",
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
  };

  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <main style={styles.fundo}>
      <div style={styles.formBox}>
        <form onSubmit={handleSubmit} style={styles.formBox2} className="row" noValidate>
          <h2 className="text-center w-100 mb-4" style={{ color: "#001b5e" }}>
            {id ? "Editar Tipo de Ocorrência" : "Cadastrar Tipo de Ocorrência"}
          </h2>

          {/* Nome */}
          <div className="col-md-6">
            <InputGroup error={errors.nome}>
              <label htmlFor="nome" style={styles.label}>Nome *</label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={form.nome}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(focusedInput === "nome" ? styles.inputFocus : {})
                }}
                onFocus={() => setFocusedInput("nome")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Ex: Comportamento agressivo"
              />
            </InputGroup>
          </div>

          {/* Nível */}
          <div className="col-md-6">
            <InputGroup error={errors.nivel}>
              <label htmlFor="nivel" style={styles.label}>Nível *</label>
              <select
                name="nivel"
                id="nivel"
                value={form.nivel}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  appearance: "none",
                  backgroundColor: "white",
                  cursor: "pointer",
                  ...(focusedInput === "nivel" ? styles.inputFocus : {})
                }}
                onFocus={() => setFocusedInput("nivel")}
                onBlur={() => setFocusedInput(null)}
              >
                <option value="">Selecione o Nível</option>
                <option value="Leve">Leve</option>
                <option value="Moderado">Moderado</option>
                <option value="Grave">Grave</option>
              </select>
            </InputGroup>
          </div>

          {/* Descrição */}
          <div className="col-12">
            <InputGroup error={errors.descricao}>
              <label htmlFor="descricao" style={styles.label}>Descrição</label>
              <textarea
                name="descricao"
                id="descricao"
                value={form.descricao}
                onChange={handleChange}
                style={{
                  ...styles.textarea,
                  ...(focusedInput === "descricao" ? styles.inputFocus : {})
                }}
                onFocus={() => setFocusedInput("descricao")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Descreva o tipo de ocorrência (opcional)"
                rows={4}
              />
            </InputGroup>
          </div>

          <div className="col-12 d-flex justify-content-between mt-4 gap-3 flex-wrap">
            <Link to="/ocorrencias" style={{ ...styles.buttonCancel, maxWidth: "200px", textAlign: "center" }}>
              Cancelar
            </Link>
            <button type="submit" style={{ ...styles.button, maxWidth: "200px" }}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

function maskCPF(value) {
  value = value.replace(/\D/g, "");
  value = value.slice(0, 11);
  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  }
  return value;
}

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

export default function EditGuest() {
  const { id } = useParams(); // se houver id, é edição
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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
            cpf: data.cpf ? maskCPF(data.cpf) : "",
          });
        })
        .catch(err => console.error("Erro ao carregar hóspede:", err));
    }
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === "cpf") {
      // Aplica a máscara ao digitar
      const masked = maskCPF(value);
      setForm(prev => ({
        ...prev,
        [name]: masked,
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Validação do nome
    if (!form.nome) {
      newErrors.nome = "O nome é obrigatório.";
    } else if (form.nome.trim().length < 2) {
      newErrors.nome = "Você não digitou o nome completo";
    }

    if (!form.escolaridade || form.escolaridade === "selecione") {
      newErrors.escolaridade = "Por favor, selecione a escolaridade.";
    }

    // Validação de idade mínima (18 anos)
    const nascimento = new Date(form.data_nascimento);
    const hoje = new Date();
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    const dia = hoje.getDate() - nascimento.getDate();
    const idadeCompleta = mes < 0 || (mes === 0 && dia < 0) ? idade - 1 : idade;

    if (isNaN(nascimento.getTime())) {
      newErrors.data_nascimento = "Data de nascimento inválida.";
    } else if (idadeCompleta < 18) {
      newErrors.data_nascimento = "Hóspedes menores de 18 anos não podem ser cadastrados.";
    }

    // Validação do CPF se não for vazio
    // Remove máscara para validar só os números
    const cpfNumeros = form.cpf.replace(/\D/g, "");
    if (form.cpf && !/^\d{11}$/.test(cpfNumeros)) {
      newErrors.cpf = "O CPF deve conter exatamente 11 números.";
    }

    // Validação do RG se não for vazio
    if (form.rg && !/^\d{7,9}$/.test(form.rg)) {
      newErrors.rg = "O RG deve conter entre 7 e 9 números.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Se passou por todas as validações, limpar erros e continuar
    setErrors({});

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:3001/guests/${id}`
      : "http://localhost:3001/guests";

    // Remove máscara do CPF antes de enviar para o backend
    // Corrigir data_contato_familia: se for string vazia ou inválida, enviar como null
    let dataContatoFamiliaToSend = form.data_contato_familia;
    if (
      !dataContatoFamiliaToSend ||
      isNaN(new Date(dataContatoFamiliaToSend).getTime())
    ) {
      dataContatoFamiliaToSend = null;
    }

    const formToSend = {
      ...form,
      cpf: form.cpf.replace(/\D/g, ""),
      data_contato_familia: dataContatoFamiliaToSend,
    };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToSend),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao salvar");
        navigate("/hospedes");
      })
      .catch((err) => alert("Erro ao salvar hóspede."));
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
      backgroundColor: "#fff", // fundo branco
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 27, 94, 0.3)", // sombra azul suave
      maxWidth: "900px",
      width: "100%",
      color: "#001b5e", // azul escuro para texto
      fontFamily: "'Raleway', sans-serif",
    },
    formBox2: {
      padding: "40px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "6px 0 0 0", // removido margin-bottom, controlado pelo InputGroup
      borderRadius: "8px",
      border: "2px solid #e77f3c", // borda laranja
      fontSize: "14px",
      color: "#001b5e",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    inputFocus: {
      borderColor: "#004aad", // azul mais vivo no foco
      boxShadow: "0 0 5px #004aad",
    },
    button: {
      backgroundColor: "#e77f3c", // laranja vibrante
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
      backgroundColor: "#001b5e", // azul escuro para cancelar
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
    checkboxLabel: {
      color: "#001b5e",
      fontWeight: "600",
      marginLeft: "8px",
    },
    functionNotSelected: {
      color: 'rgb(42, 135, 211)',
      borderTopLeftRadius: '20px',
      padding: '25px 30px',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    functionSelected: {
      backgroundColor: 'rgb(60, 162, 245)',
      color: 'white',
      padding: '25px 30px',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      borderTopLeftRadius: '20px',
      marginLeft: '-12px',
    },
    hr: {
      border: 'none',
      height: '3px',
      backgroundColor: 'rgb(60, 162, 245)',
      opacity: '100%',
      width: '100%',
      margin: 0 
    },
  };

  // Estado para controlar foco dos inputs (pra adicionar efeito azul no foco)
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <main style={styles.fundo}>
      <div style={styles.formBox} className="row">
          <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
              <Link to="/hospedes/cadastrar" style={styles.functionSelected}>
                Registrar Hóspedes
              </Link>

              <Link to="/hospedes-comportamento" style={styles.functionNotSelected}>
                Relatar Comportamento
              </Link>

              <Link to="/hospedes" style={styles.functionNotSelected}>
                Pesquisar Hóspedes
              </Link>
          </div>
            <hr style={styles.hr}/>
            
          <form onSubmit={handleSubmit} style={styles.formBox2} className="row" noValidate>
            <h2 className="text-center w-100 mb-4" style={{ color: "#001b5e" }}>
              {id ? "Editar Hóspede" : "Cadastrar Hóspede"}
            </h2>

            <div className="col-md-6">
              <InputGroup error={errors.nome}>
                <label htmlFor="nome" style={styles.label}>Nome</label>
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
                />
              </InputGroup>

              <InputGroup error={errors.data_nascimento}>
                <label htmlFor="data_nascimento" style={styles.label}>Data de Nascimento</label>
                <input
                  type="date"
                  name="data_nascimento"
                  id="data_nascimento"
                  value={form.data_nascimento}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(focusedInput === "data_nascimento" ? styles.inputFocus : {})
                  }}
                  onFocus={() => setFocusedInput("data_nascimento")}
                  onBlur={() => setFocusedInput(null)}
                />
              </InputGroup>

              <InputGroup error={errors.rg}>
                <label htmlFor="rg" style={styles.label}>RG</label>
                <input
                  type="text"
                  name="rg"
                  id="rg"
                  value={form.rg}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(focusedInput === "rg" ? styles.inputFocus : {})
                  }}
                  onFocus={() => setFocusedInput("rg")}
                  onBlur={() => setFocusedInput(null)}
                />
              </InputGroup>

              <div className="form-check mt-2 d-flex align-items-center" style={{ minHeight: 52 }}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="empregado"
                  name="empregado"
                  checked={form.empregado}
                  onChange={handleChange}
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <label className="form-check-label" htmlFor="empregado" style={styles.checkboxLabel}>
                  Está empregado?
                </label>
                {/* Se quiser alinhar erro do checkbox, pode usar InputGroup também */}
                {/* {errors.empregado && <div style={{ color: 'red', fontSize: '13px' }}>{errors.empregado}</div>} */}
              </div>
            </div>

            <div className="col-md-6">
              <InputGroup error={errors.data_contato_familia}>
                <label htmlFor="data_contato_familia" style={styles.label}>Data de Contato com a Família</label>
                <input
                  type="date"
                  name="data_contato_familia"
                  id="data_contato_familia"
                  value={form.data_contato_familia}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(focusedInput === "data_contato_familia" ? styles.inputFocus : {})
                  }}
                  onFocus={() => setFocusedInput("data_contato_familia")}
                  onBlur={() => setFocusedInput(null)}
                />
              </InputGroup>

              <InputGroup error={errors.escolaridade}>
                <label htmlFor="escolaridade" style={styles.label}>Escolaridade</label>
                <select
                  name="escolaridade"
                  id="escolaridade"
                  value={form.escolaridade}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    appearance: "none",
                    backgroundColor: "white",
                    cursor: "pointer",
                    ...(focusedInput === "escolaridade" ? styles.inputFocus : {})
                  }}
                  onFocus={() => setFocusedInput("escolaridade")}
                  onBlur={() => setFocusedInput(null)}
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
              </InputGroup>

              <InputGroup error={errors.cpf}>
                <label htmlFor="cpf" style={styles.label}>CPF</label>
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  maxLength={14} // 000.000.000-00
                  inputMode="numeric"
                  pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                  style={{
                    ...styles.input,
                    ...(focusedInput === "cpf" ? styles.inputFocus : {})
                  }}
                  onFocus={() => setFocusedInput("cpf")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="000.000.000-00"
                />
              </InputGroup>
            </div>

            <div className="col-12 d-flex justify-content-between mt-4 gap-3 flex-wrap">
              <Link to="/hospedes" style={{ ...styles.buttonCancel, maxWidth: "200px", textAlign: "center" }}>
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

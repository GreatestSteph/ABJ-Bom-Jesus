import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

export default function EditProfiles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    funcao: '',
    usuario: '',
    senha: '',
  });

  const [senha2, setSenha2] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/users/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Erro ao buscar usuário");
          return res.json();
        })
        .then(data => setForm(data))
        .catch(err => console.error("Erro ao carregar o usuário:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "senha2") {
      setSenha2(value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Validações básicas
    if (!form.nome) {
      newErrors.nome = "O nome é obrigatório.";
    } else if (form.nome.trim().length < 16) {
      newErrors.nome = "Você não digitou o nome completo";
    }

    if (!form.funcao.trim()) newErrors.funcao = "A função é obrigatória.";
    if (!form.usuario.trim()) newErrors.usuario = "O usuário é obrigatório.";
    if (!form.senha.trim()) newErrors.senha = "A senha é obrigatória.";
    if (!senha2.trim()) newErrors.senha2 = "Confirme a senha.";

    if (form.senha && senha2 && form.senha !== senha2) {
      newErrors.senha2 = "As senhas não coincidem.";
    }

    // Verificar se o nome de usuário já existe (em modo de criação)
    if (!id && form.usuario) {
      try {
        const res = await fetch(`http://localhost:3001/users`);
        if (!res.ok) throw new Error("Erro ao buscar usuários");
        const users = await res.json();

        const usuarioExistente = users.find(
          (u) => u.usuario === form.usuario
        );
        if (usuarioExistente) {
          newErrors.usuario = "Este usuário já existe.";
        }
      } catch (error) {
        console.error("Erro ao verificar usuário existente:", error);
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:3001/users/${id}`
      : "http://localhost:3001/users";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar");
        navigate("/listadeusuarios");
      })
      .catch(err => alert("Erro ao salvar usuário."));
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
      margin: "6px 0 4px 0",
      borderRadius: "8px",
      border: "2px solid #e77f3c",
      fontSize: "14px",
      color: "#001b5e",
      outline: "none",
      transition: "border-color 0.3s ease",
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

  return (
    <main style={styles.fundo}>
      <div className="d-flex justify-content-between" style={styles.loginBox}>
        <div style={styles.formBox} className="row">
          <div style={{ borderRadius: '12px' }} className='d-flex flex-start'>
            <Link to="/registrousuarios" style={styles.functionSelected}>
              Registrar Usuários
            </Link>
            <Link to="/listadeusuarios" style={styles.functionNotSelected}>
              Pesquisar Usuários
            </Link>
          </div>
          <hr style={styles.hr} />

          <form onSubmit={handleSubmit} style={styles.formBox2} className="row" noValidate>
            <h2 className="text-center w-100 mb-4" style={{ color: "#001b5e" }}>
              {id ? "Editar Usuário" : "Cadastrar Usuário"}
            </h2>

            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome"
              style={styles.input}
              required
            />
            {errors.nome && <div style={{ color: 'red', fontSize: '13px' }}>{errors.nome}</div>}

            <input
              type="text"
              name="funcao"
              value={form.funcao}
              onChange={handleChange}
              placeholder="Função"
              style={styles.input}
              required
            />
            {errors.funcao && <div style={{ color: 'red', fontSize: '13px' }}>{errors.funcao}</div>}

            <input
              type="text"
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              placeholder="Usuário"
              style={styles.input}
              required
            />
            {errors.usuario && <div style={{ color: 'red', fontSize: '13px' }}>{errors.usuario}</div>}

            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="Senha"
              style={styles.input}
              required
            />
            {errors.senha && <div style={{ color: 'red', fontSize: '13px' }}>{errors.senha}</div>}

            <input
              type="password"
              name="senha2"
              value={senha2}
              onChange={handleChange}
              placeholder="Repita a Senha"
              style={styles.input}
              required
            />
            {errors.senha2 && <div style={{ color: 'red', fontSize: '13px' }}>{errors.senha2}</div>}

            <div className="col-12 d-flex justify-content-between mt-2 gap-3 flex-wrap">
              <Link to="/listadeusuarios" style={{ ...styles.buttonCancel, maxWidth: "200px", textAlign: "center" }}>
                Cancelar
              </Link>
              <button type="submit" style={{ ...styles.button, maxWidth: "200px" }}>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

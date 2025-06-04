import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import api from "../../../services/api";

export default function EditarQuarto() {
  // Obtém o parâmetro 'id' da URL (se estiver editando)
  const { id } = useParams();
  // Hook para navegação programática
  const navigate = useNavigate();

  // cria as mensagens de erro ou validação]
  const [errors, setErrors] = useState({
    numero: "",
    tipo: "",
    status: "",
  });


  // Estado para armazenar os dados do formulário
  const [form, setForm] = useState({
    numero: "",
    tipo: "",
    ocupacao_max: 1,
    status: "disponivel",
  });

  // Efeito para carregar dados do quarto quando houver ID (modo edição)
  useEffect(() => {
    if (id) {
      api
        .get(`/quartos/${id}`)
        .then((res) => {
          // Preenche o formulário com dados existentes
          setForm(res.data);
        })
        .catch((err) => console.error("Erro ao carregar quarto:", err));
    }
  }, [id]);

  // Manipula mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Atualiza apenas o campo modificado mantendo o resto do estado
    setForm((prev) => ({ ...prev, [name]: value }));
  };



  // Submissão do formulário (criação ou atualização)
  const salvar = async (e) => {
    e.preventDefault();
    
    // Limpa mensagens antigas
    setErrors({
      numero: "",
      tipo: "",
      status: "",
    });

    let hasError = false;
    const newErrors = {};

    // Validações personalizadas
    if (!form.numero.trim()) {
      newErrors.numero = "O número do quarto não pode ficar em branco.";
      hasError = true;
    }

    if (!form.tipo) {
      newErrors.tipo = "Por favor selecione o tipo de cama.";
      hasError = true;
    }

    if (!form.status) {
      newErrors.status = "Por favor selecione o status do quarto.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      if (id) {
      // Requisição PUT para atualizar quarto existente
        await api.put(`/quartos/${id}`, form);
      } else {
      // Requisição POST para criar novo quarto
        await api.post("/quartos", form);
      }
      // Redireciona para lista de quartos após sucesso
      navigate("/listarquartos");
    } catch (err) {
      console.error("Erro ao salvar quarto:", err);
      alert("Não foi possível salvar o quarto.");
    }
  };

  // Estilos para o componente
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
    formContainer: {
      backgroundColor: "#e77f3c",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      maxWidth: "600px",
      width: "100%",
      color: "white",
      fontFamily: "'Raleway', sans-serif",
    },
    title: {
      fontSize: "24px",
      marginBottom: "30px",
      textAlign: "center",
      color: "white",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "none",
      fontSize: "16px",
      backgroundColor: "white",
      color: "#333",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
      gap: "20px",
    },
    button: {
      flex: 1,
      backgroundColor: "#001b5e",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      border: "none",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
      textAlign: "center",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.formContainer}>
        {/* Título dinâmico (editar/cadastrar) */}
        <h2 style={styles.title}>
          {id ? "Editar Quarto" : "Cadastrar Quarto"}
        </h2>

        <form onSubmit={salvar}>
          {/* Campo: Número do quarto */}
          <p1>Número do quarto:</p1>
          <input
            type="text"
            name="numero"
            value={form.numero}
            onChange={handleChange}
            placeholder="Número do quarto"
            style={styles.input}
            required
          />
          {errors.numero && <div style={{ color: "red", marginBottom: "10px" }}>{errors.numero}</div>}


          {/* Campo: Tipo de cama (dropdown) */}
         <p1>Tipo de cama do quarto:</p1>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Selecione o tipo de cama...</option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casal">Casal</option>
            <option value="Beliche">Beliche</option>
          </select>
          {errors.tipo && <div style={{ color: "red", marginBottom: "10px" }}>{errors.tipo}</div>}



          {/* Campo: Status (dropdown) */}
          <p1>Status do quarto:</p1>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="disponivel">Disponível</option>
            <option value="ocupado">Ocupado</option>
            <option value="manutencao">Manutenção</option>
          </select>
          {errors.status && <div style={{ color: "red", marginBottom: "10px" }}>{errors.status}</div>}

          {/* Botões de ação */}
          <div style={styles.buttonContainer}>
            {/* Botão Cancelar (volta para lista) */}
            <Link to="/listarquartos" style={styles.button}>
              Cancelar
            </Link>

            {/* Botão de submissão (dinâmico) */}
            <button type="submit" style={styles.button}>
              {id ? "Atualizar" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

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
      margin: "6px 0 18px 0",
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
      marginLeft: '-11px',
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
      <div className="d-flex justify-content-between" style={styles.loginBox} noValidate>
        <div style={styles.formBox} className="row">
          <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
            <Link to="/registroprodutos" style={styles.functionNotSelected}>
              Registrar Produtos
            </Link>
            <Link to="/registroconsumos" style={styles.functionNotSelected}>
              Registrar Consumos
            </Link>
            <Link to="/listarprodutos" style={styles.functionNotSelected}>
              Pesquisar Produtos
            </Link>
            <Link to="/gerenciarquartos/novo" style={styles.functionSelected}>
              Adicionar Quartos
            </Link>
            <Link to="/gerenciarquartos" style={styles.functionNotSelected}>
              Listar Quartos
            </Link>
          </div>  
        <hr style={styles.hr}/>

        <form onSubmit={salvar} style={styles.formBox2} className="row" noValidate>

          <h2 className="text-center w-100 mb-4" style={{ color: "#001b5e" }}>
            {id ? "Editar Quarto" : "Adicionar Quarto"}
          </h2>

          {/* Campo: Número do quarto */}
          <p1>Número do quarto:</p1>
          <input
            type="text"
            name="numero"
            value={form.numero}
            onChange={handleChange}
            placeholder="Número do quarto"
            style={styles.input}
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
            <option value="">Selecione o estado do quarto...</option>
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
        <</form>  
        </div>
      </div>
    </main>
  );
}

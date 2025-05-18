import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
//import api from "../../../services/api";

export default function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomeDoProduto: '',
    tamanho: '',
    cor: '',
    quantidade: '',
    marca: '',
    descricao: '',
    custoTotal: '',
  });

  useEffect(() => {
    if (id) {
      //api.get(`/produtos/${id}`)
      fetch(`http://localhost:3001/produtos/${id}`)        
        .then(res => setForm(res.data))
        .catch(err => console.error("Erro ao carregar o produto:", err));    }
  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
      e.preventDefault();
      const method = id ? "PUT" : "POST";
      const url = id ? `http://localhost:3001/produtos/${id}` : "http://localhost:3001/produtos";
  
      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then(res => {
          if (!res.ok) throw new Error("Erro ao salvar");
          navigate("/produtos");
        })
        .catch(err => alert("Erro ao salvar produto."));
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
                <Link to="/registroprodutos" style={styles.functionSelected}>
                  Registrar Produtos
                </Link>

                <Link to="/registroconsumos" style={styles.functionNotSelected}>
                  Registrar Consumos
                </Link>

                <Link to="/listarprodutos" style={styles.functionNotSelected}>
                  Pesquisar Produtos
                </Link>
              </div>  
              <hr style={styles.hr}/>
              

          <form onSubmit={handleSubmit} style={styles.formBox2} className="row" noValidate>

            <h2 className="text-center w-100 mb-4" style={{ color: "#001b5e" }}>
              {id ? "Editar Produto" : "Cadastrar Produto"}
            </h2>

            <input type="text" name="nomeDoProduto" id='nomeDoProduto' value={form.nomeDoProduto} onChange={handleChange} placeholder="Nome do Produto" style={styles.input} required />
            <input type="text" name="tamanho" id='tamanho' value={form.tamanho} onChange={handleChange} placeholder="Tamanho do Produto" style={styles.input} required />

            <select name="cor" id="cor" value={form.cor} onChange={handleChange} style={styles.input}>
                <option value="">Cor</option>
                <option value="Azul">Azul</option>
                <option value="Verde">Verde</option>
                <option value="Transparente">Transparente</option>
                <option value="Rosa">Rosa</option>
                <option value="Roxo">Roxo</option>
                <option value="Vermelho">Vermelho</option>
                <option value="Amarelo">Amarelo</option>
                <option value="Amarelo">Laranja</option>
                <option value="Colorido">Colorido</option>
            </select>
            
            <input type="number" name="quantidade" id='quantidade' value={form.quantidade} onChange={handleChange} placeholder="Quantidade a ser cadastrada" style={styles.input} required />
            <input type="text" name="marca" id='marca' value={form.marca} onChange={handleChange} placeholder="Marca do produto" style={styles.input} required />
            <input type="number" name="custoTotal" id='custoTotal' value={form.custoTotal} onChange={handleChange} placeholder="Custo total do produto" style={styles.input} required />
            <input type="text" name="descricao" id='descricao' value={form.descricao} onChange={handleChange} placeholder="Descreva o produto aqui" style={styles.input} required />
            
            <div className="col-12 d-flex justify-content-between mt-2 gap-3 flex-wrap">
              <Link to="/listarprodutos" style={{ ...styles.buttonCancel, maxWidth: "200px", textAlign: "center" }}>
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
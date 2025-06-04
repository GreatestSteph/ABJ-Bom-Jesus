import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

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

  const [errors, setErrors] = useState({});
  const [mostrarTamanho, setMostrarTamanho] = useState(true);


  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/produtos/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error("Erro ao buscar o produto");
          }
          return res.json();
        })
        .then(data => setForm(data))
        .catch(err => console.error("Erro ao carregar o produto:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validate() {
    const newErrors = {};

    if (!form.nomeDoProduto.trim()) {
      newErrors.nomeDoProduto = "Nome do produto é obrigatório.";
    } else if (form.nomeDoProduto.length > 100) {
      newErrors.nomeDoProduto = "Nome do produto deve ter no máximo 100 caracteres.";
    }
    
    if (!form.cor.trim()) {
      newErrors.cor = "Selecione a cor do produto.";
    }

    if (!form.quantidade) {
      newErrors.quantidade = "Quantidade é obrigatória.";
    } else if (isNaN(form.quantidade) || Number(form.quantidade) <= 0) {
      newErrors.quantidade = "Quantidade deve ser um número maior que zero.";
    }

    if (!form.marca.trim()) {
      newErrors.marca = "Marca é obrigatória.";
    }

    if (form.custoTotal === '' || form.custoTotal === null || form.custoTotal === undefined) {
      newErrors.custoTotal = "Custo total é obrigatório.";
    } else if (isNaN(form.custoTotal) || Number(form.custoTotal) < 0) {
      newErrors.custoTotal = "Custo total deve ser um número igual ou maior que zero.";
    }


    if (!form.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória.";
    } else if (form.descricao.length > 300) {
      newErrors.descricao = "Descrição deve ter no máximo 300 caracteres.";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const method = id ? "PUT" : "POST";
    const url = id ? `http://localhost:3001/produtos/${id}` : "http://localhost:3001/produtos";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar");
        navigate("/listarprodutos");
      })
      .catch(() => alert("Erro ao salvar produto."));
  }

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
    },
    functionSelected: {
      backgroundColor: 'rgb(60, 162, 245)',
      color: 'white',
      padding: '25px 30px',
      textDecoration: 'none',
      fontWeight: 'bold',
      borderTopLeftRadius: '20px',
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
      <div style={styles.aroundListBox}>
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
            <Link to="/gerenciarquartos/novo" style={styles.functionNotSelected}>
              Adicionar Quartos
            </Link>
            <Link to="/gerenciarquartos" style={styles.functionNotSelected}>
              Listar Quartos
            </Link>
          </div>  
          <hr style={styles.hr}/>

          <form onSubmit={handleSubmit} style={styles.formBox2} className="row" noValidate>

            <h2 className="text-center w-100 mb-4" style={{ color: "#001b5e" }}>
              {id ? "Editar Produto" : "Cadastrar Produto"}
            </h2>

            <input
              type="text"
              name="nomeDoProduto"
              id='nomeDoProduto'
              value={form.nomeDoProduto}
              onChange={handleChange}
              placeholder="Nome do Produto"
              style={styles.input}
              required
            />
            {errors.nomeDoProduto && <div style={{ color: "red", marginBottom: '10px', paddingLeft:'1px', fontSize: '14px' }}>{errors.nomeDoProduto}</div>}

            <div style={{ marginBottom: '10px', paddingLeft:'5px', marginTop: '10px' }}>
              <input
                type="checkbox"
                id="mostrarTamanho"
                checked={mostrarTamanho}
                onChange={(e) => setMostrarTamanho(e.target.checked)}
              />
              <label htmlFor="mostrarTamanho" style={styles.checkboxLabel}>
                Deseja colocar o tamanho do produto?
              </label>
            </div>

            {mostrarTamanho && (
              <>
                <input
                  type="text"
                  name="tamanho"
                  id="tamanho"
                  value={form.tamanho}
                  onChange={handleChange}
                  placeholder="Tamanho do Produto"
                  style={styles.input}
                  required
                />
              </>
            )}


            <select
              name="cor"
              id="cor"
              value={form.cor}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Cor</option>
              <option value="Azul">Azul</option>
              <option value="Verde">Verde</option>
              <option value="Transparente">Transparente</option>
              <option value="Rosa">Rosa</option>
              <option value="Roxo">Roxo</option>
              <option value="Vermelho">Vermelho</option>
              <option value="Amarelo">Amarelo</option>
              <option value="Laranja">Laranja</option>
              <option value="Colorido">Colorido</option>
            </select>
            {errors.cor && <div style={{ color: "red", marginBottom: '10px', paddingLeft:'1px', fontSize: '14px'  }}>{errors.cor}</div>}

            <input
              type="number"
              name="quantidade"
              id='quantidade'
              value={form.quantidade}
              onChange={handleChange}
              placeholder="Quantidade a ser cadastrada"
              style={styles.input}
              required
            />
            {errors.quantidade && <div style={{ color: "red", marginBottom: '10px', paddingLeft:'1px', fontSize: '14px'  }}>{errors.quantidade}</div>}

            <input
              type="text"
              name="marca"
              id='marca'
              value={form.marca}
              onChange={handleChange}
              placeholder="Marca do produto"
              style={styles.input}
              required
            />
            {errors.marca && <div style={{ color: "red", marginBottom: '10px', paddingLeft:'1px', fontSize: '14px'  }}>{errors.marca}</div>}

            <input
              type="number"
              name="custoTotal"
              id='custoTotal'
              value={form.custoTotal}
              onChange={handleChange}
              placeholder="Custo total do produto"
              style={styles.input}
              required
            />
            {errors.custoTotal && <div style={{ color: "red", marginBottom: '10px', paddingLeft:'1px', fontSize: '14px'  }}>{errors.custoTotal}</div>}

            <input
              type="text"
              name="descricao"
              id='descricao'
              value={form.descricao}
              onChange={handleChange}
              placeholder="Descreva o produto aqui"
              style={styles.input}
              required
            />
            {errors.descricao && <div style={{ color: "red", marginBottom: '10px', paddingLeft:'1px', fontSize: '14px'  }}>{errors.descricao}</div>}

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
    </main>
  );
}
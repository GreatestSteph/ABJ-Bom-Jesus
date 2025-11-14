import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../WebsiteDesign/HeaderandFooterImages/Fundo.png";

export default function RegistrarConsumos() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    hospedeId: "",
    produtoId: "",
    quantidade: "",
    dataConsumo: "",
    naoReutilizavel: true,
  });

  const [hospedes, setHospedes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [hospedeSelecionado, setHospedeSelecionado] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [buscaHospede, setBuscaHospede] = useState("");
  const [buscaProduto, setBuscaProduto] = useState("");
  const [errors, setErrors] = useState({});
  const [quantidadeOriginal, setQuantidadeOriginal] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/consumos/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          hospedeId: data.hospedeId,
          produtoId: data.produtoId,
          quantidade: data.quantidade,
          dataConsumo: data.dataConsumo,
          naoReutilizavel: data.naoReutilizavel,
        });
        setQuantidadeOriginal(data.quantidade); // ✅ guarda a quantidade antiga

        const hospede = hospedes.find(h => h.id === data.hospedeId);
        const produto = produtos.find(p => p.id === data.produtoId);
        if (hospede) setHospedeSelecionado(hospede);
        if (produto) setProdutoSelecionado(produto);
      })
      .catch(err => console.error("Erro ao carregar consumo:", err));
  }, [id, hospedes, produtos]);

  useEffect(() => {
    fetch("http://localhost:3001/guests")
      .then((res) => res.json())
      .then((data) => setHospedes(data))
      .catch((err) => console.error("Erro ao carregar hóspedes:", err));

    fetch("http://localhost:3001/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  useEffect(() => {
    if (!id) return; // só busca se tiver id (edição)

    fetch(`http://localhost:3001/consumos/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          hospedeId: data.hospedeId,
          produtoId: data.produtoId,
          quantidade: data.quantidade,
          dataConsumo: data.dataConsumo,
          naoReutilizavel: data.naoReutilizavel,
        });

        // preenche os selecionados para exibir no input de busca
        const hospede = hospedes.find(h => h.id === data.hospedeId);
        const produto = produtos.find(p => p.id === data.produtoId);
        if (hospede) setHospedeSelecionado(hospede);
        if (produto) setProdutoSelecionado(produto);
      })
      .catch(err => console.error("Erro ao carregar consumo:", err));
  }, [id, hospedes, produtos]);


  useEffect(() => {
  fetch("https://worldtimeapi.org/api/ip")
    .then(res => res.json())
    .then(data => {
      const dataReal = new Date(data.datetime);
      setForm(prev => ({ ...prev, dataConsumo: dataReal.toISOString().slice(0, 19).replace("T", " ") }));
    })
    .catch(err => {
      console.error("Erro ao obter data real:", err);
      // fallback: usa a data local caso a API falhe
      const local = new Date();
      setForm(prev => ({ ...prev, dataConsumo: local.toISOString().slice(0, 19).replace("T", " ") }));
    });
  }, []);

  const hospedesFiltrados = hospedes.filter(
    (h) =>
      h.nome?.toLowerCase().includes(buscaHospede.toLowerCase()) ||
      h.cpf?.includes(buscaHospede) ||
      h.rg?.includes(buscaHospede)
  );

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nomeDoProduto?.toLowerCase().includes(buscaProduto.toLowerCase()) ||
      p.cor?.toLowerCase().includes(buscaProduto.toLowerCase()) ||
      p.tamanho?.toLowerCase().includes(buscaProduto.toLowerCase())
  );

  function validate() {
    const newErrors = {};
    if (!hospedeSelecionado) newErrors.hospede = "Selecione um hóspede.";
    if (!produtoSelecionado) newErrors.produto = "Selecione um produto.";
    if (!form.quantidade || Number(form.quantidade) <= 0)
      newErrors.quantidade = "Quantidade inválida.";
    else if (Number(form.quantidade) > Number(produtoSelecionado.quantidade))
      newErrors.quantidade = "Quantidade maior do que a disponível.";
    return newErrors;
  }

  async function handleSubmit(e) {
  e.preventDefault();

  // Validação do formulário
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const consumo = {
    hospedeId: hospedeSelecionado.id,
    produtoId: produtoSelecionado.id,
    quantidade: Number(form.quantidade),
    dataConsumo: form.dataConsumo,
    naoReutilizavel: form.naoReutilizavel,
  };

  try {
    if (id) {
      // --- EDIÇÃO ---
      await fetch(`http://localhost:3001/consumos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consumo),
      });

      // Atualiza estoque se o produto não for reutilizável
      if (!form.naoReutilizavel) {
        const diferenca = Number(form.quantidade) - quantidadeOriginal;
        const novaQuantidadeProduto = Number(produtoSelecionado.quantidade) - diferenca;

        await fetch(`http://localhost:3001/produtos/${produtoSelecionado.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...produtoSelecionado,
            quantidade: novaQuantidadeProduto,
          }),
        });
      }

    } else {
      // --- NOVO CONSUMO ---
      await fetch("http://localhost:3001/consumos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consumo),
      });

      // Atualiza estoque se não for reutilizável
      if (!form.naoReutilizavel) {
        const novaQuantidadeProduto = Number(produtoSelecionado.quantidade) - Number(form.quantidade);

        await fetch(`http://localhost:3001/produtos/${produtoSelecionado.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...produtoSelecionado,
            quantidade: novaQuantidadeProduto,
          }),
        });
      }
    }

    navigate("/listarconsumos");
  } catch (err) {
    console.error("Erro ao salvar consumo:", err);
    alert("Erro ao salvar consumo. Verifique o console.");
  }
}


const styles = {
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
  fundo: {
    backgroundImage: `url(${fundo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    paddingTop: '180px',
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
    maxWidth: "1400px",
    fontFamily: "'Raleway', sans-serif",
  },
  table: {
    width: '100%',
    maxWidth: '1285px',
    margin: '5px 55px',
    borderCollapse: 'collapse',
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
  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
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
                    <Link to="/registroprodutos" style={styles.functionNotSelected}>
                      Registrar Produtos
                    </Link>
                  
                    <Link to="/listarprodutos" style={styles.functionNotSelected}>
                      Pesquisar Produtos
                    </Link>
                    
                    <Link to="/registroconsumos" style={styles.functionSelected}>
                      Registrar Consumos
                    </Link>
                    
                    <Link to="/listarconsumos" style={styles.functionNotSelected}>
                      Ver Consumos
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
            {id ? "Editar Consumo" : "Registrar Consumo"}
          </h2>

          {/* --- SELECIONAR HÓSPEDE --- */}
          <label style={{ color: "#001b5e", fontWeight: "bold" }}>
            Buscar Hóspede (nome, CPF ou RG)
          </label>
          <input
            type="text"
            style={styles.input}
            value={buscaHospede}
            onChange={(e) => setBuscaHospede(e.target.value)}
            placeholder="Digite para buscar hóspede..."
          />
          {buscaHospede && (
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {hospedesFiltrados.map((h) => (
                <div
                  key={h.id}
                  onClick={() => {
                    setHospedeSelecionado(h);
                    setBuscaHospede("");
                  }}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  {h.nome} — {h.cpf || h.rg || h.data_nascimento}
                </div>
              ))}
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

          {/* --- SELECIONAR PRODUTO --- */}
          <label
            style={{
              color: "#001b5e",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Buscar Produto (nome, cor ou tamanho)
          </label>
          <input
            type="text"
            style={styles.input}
            value={buscaProduto}
            onChange={(e) => setBuscaProduto(e.target.value)}
            placeholder="Digite para buscar produto..."
          />
          {buscaProduto && (
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {produtosFiltrados.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setProdutoSelecionado(p);
                    setBuscaProduto("");
                  }}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  {p.nomeDoProduto} — {p.cor} — {p.tamanho || "Sem tamanho"} —{" "}
                  {p.quantidade} {p.tipoQuantidade}
                </div>
              ))}
            </div>
          )}
          {produtoSelecionado && (
            <p style={{ color: "green", marginTop: "5px" }}>
              Produto selecionado:{" "}
              <strong>
                {produtoSelecionado.nomeDoProduto} ({produtoSelecionado.cor})
              </strong>{" "}
              — disponível: {produtoSelecionado.quantidade}{" "}
              {produtoSelecionado.tipoQuantidade}
            </p>
          )}
          {errors.produto && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.produto}</p>
          )}

          {/* --- QUANTIDADE --- */}
          <label
            style={{
              color: "#001b5e",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Quantidade consumida
          </label>
          <input
            type="number"
            style={styles.input}
            value={form.quantidade}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, quantidade: e.target.value }))
            }
            placeholder="Digite a quantidade consumida"
          />
          {errors.quantidade && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.quantidade}</p>
          )}

          <div style={{ marginTop: "15px" }}>
            <input
              type="checkbox"
              id="naoReutilizavel"
              name="naoReutilizavel"
              checked={form.naoReutilizavel}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, naoReutilizavel: e.target.checked }))
              }
            />
            <label htmlFor="naoReutilizavel" style={{ marginLeft: "8px", color: "#001b5e", fontWeight: "600" }}>
              Produto reutilizável (Não foi consumido ou doado)
            </label>
          </div>

          <div className="col-12 d-flex justify-content-between mt-4 gap-3 flex-wrap">
            <Link
              to="/listarconsumos"
              style={{
                ...styles.buttonCancel,
                maxWidth: "200px",
                textAlign: "center",
              }}
            >
              Cancelar
            </Link>
            <button
              type="submit"
              style={{ ...styles.button, maxWidth: "200px" }}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
 

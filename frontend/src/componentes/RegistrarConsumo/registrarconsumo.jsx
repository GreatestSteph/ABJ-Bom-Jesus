import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

export default function RegistrarHistoricoConsumo() {
  const navigate = useNavigate();

  const [hospedes, setHospedes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [opcoesTamanho, setOpcoesTamanho] = useState([]);
  const [opcoesCor, setOpcoesCor] = useState([]);
  const [opcoesMarca, setOpcoesMarca] = useState([]);

  const [form, setForm] = useState({
    hospedeId: "",
    produtoId: "",
    tamanho: "",
    cor: "",
    marca: "",
    quantidade: 1,
    dataConsumo: new Date().toISOString().slice(0, 10), // hoje
  });

  useEffect(() => {
    // carregar hospedes
    fetch("http://localhost:3001/guests")
      .then((res) => res.json())
      .then((data) => setHospedes(data))
      .catch((err) => console.error("Erro ao carregar hóspedes:", err));

    // carregar produtos
    fetch("http://localhost:3001/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  // quando seleciona um produto, popula selects dependentes
  useEffect(() => {
    if (form.produtoId) {
      const produtoSelecionado = produtos.find(p => p.id === Number(form.produtoId));
      if (produtoSelecionado) {
        // aqui assumo que cada produto tem arrays de tamanhos, cores e marcas possíveis
        setOpcoesTamanho(produtoSelecionado.tamanhos ?? []);
        setOpcoesCor(produtoSelecionado.cores ?? []);
        setOpcoesMarca(produtoSelecionado.marcas ?? []);
      }
    } else {
      setOpcoesTamanho([]);
      setOpcoesCor([]);
      setOpcoesMarca([]);
    }
  }, [form.produtoId, produtos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.hospedeId || !form.produtoId || !form.quantidade) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await fetch("http://localhost:3001/consumos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      navigate("/historico-consumo");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar consumo.");
    }
  };

  const styles = {
    fundo: {
      backgroundImage: `url(${fundo})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      minHeight: "100vh",
      paddingTop: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formBox: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 27, 94, 0.3)",
      maxWidth: "800px",
      width: "100%",
      padding: "40px",
      color: "#001b5e",
      fontFamily: "'Raleway', sans-serif",
    },
    label: {
      fontWeight: "600",
      marginTop: "10px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "6px 0",
      borderRadius: "8px",
      border: "2px solid #e77f3c",
      fontSize: "14px",
      outline: "none",
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
    },
  };

  return (
    <main style={styles.fundo}>
      <form style={styles.formBox} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Registrar Consumo</h2>

        {/* Hospede */}
        <label style={styles.label}>Hóspede</label>
        <select
          name="hospedeId"
          value={form.hospedeId}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Selecione o hóspede</option>
          {hospedes.map((h) => (
            <option key={h.id} value={h.id}>
              {h.nome} - {h.cpf}
            </option>
          ))}
        </select>

        {/* Produto */}
        <label style={styles.label}>Produto</label>
        <select
          name="produtoId"
          value={form.produtoId}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Selecione o produto</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nomeDoProduto}
            </option>
          ))}
        </select>

        {/* Se o produto tiver tamanhos */}
        {opcoesTamanho.length > 0 && (
          <>
            <label style={styles.label}>Tamanho</label>
            <select
              name="tamanho"
              value={form.tamanho}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Selecione o tamanho</option>
              {opcoesTamanho.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Se o produto tiver cores */}
        {opcoesCor.length > 0 && (
          <>
            <label style={styles.label}>Cor</label>
            <select
              name="cor"
              value={form.cor}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Selecione a cor</option>
              {opcoesCor.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Se o produto tiver marcas */}
        {opcoesMarca.length > 0 && (
          <>
            <label style={styles.label}>Marca</label>
            <select
              name="marca"
              value={form.marca}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Selecione a marca</option>
              {opcoesMarca.map((m, i) => (
                <option key={i} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Quantidade */}
        <label style={styles.label}>Quantidade</label>
        <input
          type="number"
          name="quantidade"
          value={form.quantidade}
          onChange={handleChange}
          min="1"
          style={styles.input}
        />

        {/* Data */}
        <label style={styles.label}>Data do Consumo</label>
        <input
          type="date"
          name="dataConsumo"
          value={form.dataConsumo}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Salvar
        </button>
      </form>
    </main>
  );
}

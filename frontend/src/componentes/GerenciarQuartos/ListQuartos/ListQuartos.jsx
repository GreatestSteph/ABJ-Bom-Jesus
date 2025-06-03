import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import api from "../../../services/api";

export default function ListQuartos() {
  // Estado para armazenar a lista de quartos
  const [quartos, setQuartos] = useState([]);

  // Efeito para carregar quartos ao montar o componente
  useEffect(() => {
    api
      .get("/quartos")
      .then((res) => setQuartos(res.data)) // Atualiza estado com dados da API
      .catch((err) => console.error("Erro ao listar quartos:", err));
  }, []); // Array vazio = executa apenas no mount

  // Função para deletar um quarto
  const deletarQuarto = async (id) => {
    // Confirmação antes de excluir
    if (!window.confirm("Tem certeza que deseja excluir este quarto?")) return;

    try {
      await api.delete(`/quartos/${id}`);
      // Remove o quarto deletado do estado local
      setQuartos((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Erro ao excluir quarto:", err);
    }
  };

  // Objeto de estilos para o componente
  const styles = {
    fundo: {
      backgroundImage: `url(${fundo})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100%",
      paddingTop: "180px",
      paddingBottom: "180px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maskImage:
        "linear-gradient(to bottom, rgba(255, 255, 255, 0.98) 695px, transparent 115%)",
    },
    aroundListBox: {
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
      maxWidth: "1000px",
      width: "100%",
      color: "black",
      fontFamily: "'Raleway', sans-serif",
    },
    addButton: {
      backgroundColor: "#001b5e",
      color: "white",
      padding: "8px 16px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
    },
    actionButton: {
      backgroundColor: "#e77f3c",
      color: "white",
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
    },
    header: {
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      padding: "12px 0",
    },
    cellGroup: {
      display: "flex",
      gap: "24px",
      flex: 1,
    },
    title: {
      fontSize: "24px",
      margin: 0,
    },
    columnHeader: {
      display: "flex",
      gap: "24px",
      fontWeight: "bold",
      padding: "12px 0",
      borderBottom: "2px solid #333",
    },
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
        {/* Cabeçalho com título e botão de novo quarto */}
        <div style={styles.header}>
          <h2 style={styles.title}>Lista de Quartos</h2>
          <Link to="/gerenciarquartos/novo" style={styles.addButton}>
            + Novo Quarto
          </Link>
        </div>

        {/* Cabeçalhos das colunas */}
        <div style={styles.columnHeader}>
          <span>Número</span>
          <span>Tipo</span>
          <span>Status</span>
          <span style={{ width: "120px", textAlign: "center" }}>Ações</span>
        </div>

        {/* Listagem de quartos */}
        {quartos.map((q) => (
          <div key={q.id} style={styles.row}>
            {/* Dados do quarto */}
            <div style={styles.cellGroup}>
              <p>{q.numero}</p>
              <p>{q.tipo}</p>
              <p>{q.status}</p>
            </div>

            {/* Botões de ação */}
            <div style={{ display: "flex", gap: "8px" }}>
              {/* Botão Editar */}
              <Link
                to={`/gerenciarquartos/${q.id}`}
                style={styles.actionButton}
              >
                Editar
              </Link>

              {/* Botão Excluir */}
              <button
                style={styles.deleteButton}
                onClick={() => deletarQuarto(q.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

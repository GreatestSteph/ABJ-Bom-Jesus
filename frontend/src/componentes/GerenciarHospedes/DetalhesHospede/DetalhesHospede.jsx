import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

function formatCPF(cpf) {
  if (!cpf) return "";
  const numbers = cpf.replace(/\D/g, "");
  if (numbers.length !== 11) return cpf;
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default function DetalhesHospede() {
  const { id } = useParams();
  const [hospede, setHospede] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/guests/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar dados do hóspede");
        return res.json();
      })
      .then(data => {
        setHospede(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar hóspede:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

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
    detailsBox: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 27, 94, 0.3)",
      maxWidth: "800px",
      width: "100%",
      color: "#001b5e",
      fontFamily: "'Raleway', sans-serif",
      padding: "40px",
    },
    title: {
      color: "#001b5e",
      marginBottom: "30px",
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
    },
    infoCard: {
      backgroundColor: "#f8f9fa",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      border: "1px solid #e9ecef",
    },
    cardTitle: {
      color: "#001b5e",
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "15px",
      paddingBottom: "8px",
      borderBottom: "2px solid #e77f3c",
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #e9ecef",
    },
    infoLabel: {
      fontWeight: "600",
      color: "#495057",
      minWidth: "150px",
    },
    infoValue: {
      color: "#001b5e",
      fontWeight: "500",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "30px",
      flexWrap: "wrap",
    },
    buttonBack: {
      backgroundColor: "#001b5e",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
      border: "none",
      cursor: "pointer",
    },
    buttonEdit: {
      backgroundColor: "#e77f3c",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
      border: "none",
      cursor: "pointer",
    },
    loadingContainer: {
      textAlign: "center",
      padding: "40px",
      color: "#001b5e",
    },
    errorContainer: {
      textAlign: "center",
      padding: "40px",
      color: "#dc3545",
    },
    statusBadge: {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold",
      textAlign: "center",
    },
    statusEmpregado: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    statusDesempregado: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
  };

  if (loading) {
    return (
      <main style={styles.fundo}>
        <div style={styles.detailsBox}>
          <div style={styles.loadingContainer}>
            <h3>Carregando dados do hóspede...</h3>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={styles.fundo}>
        <div style={styles.detailsBox}>
          <div style={styles.errorContainer}>
            <h3>Erro ao carregar dados</h3>
            <p>{error}</p>
            <Link to="/hospedes" style={styles.buttonBack}>
              Voltar à Lista
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Não informado";
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.detailsBox}>
        <h2 style={styles.title}>Detalhes do Hóspede</h2>

        {/* Informações Pessoais */}
        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>Informações Pessoais</h3>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>ID:</span>
            <span style={styles.infoValue}>#{hospede.id}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Nome:</span>
            <span style={styles.infoValue}>{hospede.nome}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Data de Nascimento:</span>
            <span style={styles.infoValue}>{formatDate(hospede.data_nascimento)}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Gênero:</span>
            <span style={styles.infoValue}>{hospede.genero || "Não informado"}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Estado Civil:</span>
            <span style={styles.infoValue}>{hospede.estado_civil || "Não informado"}</span>
          </div>
        </div>

        {/* Documentos */}
        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>Documentos</h3>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>CPF:</span>
            <span style={styles.infoValue}>{formatCPF(hospede.cpf) || "Não informado"}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>RG:</span>
            <span style={styles.infoValue}>{hospede.rg || "Não informado"}</span>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>Informações Adicionais</h3>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Escolaridade:</span>
            <span style={styles.infoValue}>{hospede.escolaridade || "Não informado"}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Situação de Emprego:</span>
            <span style={{
              ...styles.infoValue,
              ...styles.statusBadge,
              ...(hospede.empregado ? styles.statusEmpregado : styles.statusDesempregado)
            }}>
              {hospede.empregado ? "Empregado" : "Desempregado"}
            </span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Data Contato Família:</span>
            <span style={styles.infoValue}>{formatDate(hospede.data_contato_familia)}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Biometria:</span>
            <span style={styles.infoValue}>{hospede.biometria || "Não informado"}</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div style={styles.buttonContainer}>
          <Link to="/hospedes" style={styles.buttonBack}>
            Voltar à Lista
          </Link>
          <Link to={`/hospedes/${hospede.id}`} style={styles.buttonEdit}>
            Editar Hóspede
          </Link>
        </div>
      </div>
    </main>
  );
}
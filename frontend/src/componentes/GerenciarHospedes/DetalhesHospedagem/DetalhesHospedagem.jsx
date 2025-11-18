import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

function formatCPF(cpf) {
  if (!cpf) return "";
  const numbers = cpf.replace(/\D/g, "");
  if (numbers.length !== 11) return cpf;
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default function DetalhesHospedagem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospedagem, setHospedagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModalSaida, setShowModalSaida] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/entradas/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar dados da hospedagem");
        return res.json();
      })
      .then(data => {
        setHospedagem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar hospedagem:", err);
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
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    buttonSaida: {
      backgroundColor: "#dc3545",
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
    statusAtivo: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    statusEncerrado: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "30px",
      maxWidth: "400px",
      width: "90%",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
    },
    modalFooter: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginTop: "20px",
    },
    modalCancelBtn: {
      padding: "10px 20px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
    },
    modalConfirmBtn: {
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
    },
  };

  if (loading) {
    return (
      <main style={styles.fundo}>
        <div style={styles.detailsBox}>
          <div style={styles.loadingContainer}>
            <h3>Carregando dados da hospedagem...</h3>
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
            <Link to="/historicodehospedagens" style={styles.buttonBack}>
              <FiArrowLeft /> Voltar à Lista
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Não informado";
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isAtivo = String(hospedagem.hospedou) === "1" || hospedagem.hospedou === true;

  const handleRegistrarSaida = async () => {
    try {
      await fetch(`http://localhost:3001/entradas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hospedou: 0,
          dataSaida: new Date().toISOString(),
        }),
      });
      setShowModalSaida(false);
      navigate('/historicodehospedagens');
    } catch (err) {
      console.error("Erro ao registrar saída:", err);
      alert("Erro ao registrar saída.");
    }
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.detailsBox}>
        <h2 style={styles.title}>Detalhes da Hospedagem</h2>

        {/* Informações da Hospedagem */}
        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>Informações da Hospedagem</h3>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>ID:</span>
            <span style={styles.infoValue}>#{hospedagem.id}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Data de Entrada:</span>
            <span style={styles.infoValue}>{formatDateTime(hospedagem.dataEntrada)}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Data de Saída:</span>
            <span style={styles.infoValue}>{formatDateTime(hospedagem.dataSaida)}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Status:</span>
            <span style={{
              ...styles.statusBadge,
              ...(isAtivo ? styles.statusAtivo : styles.statusEncerrado)
            }}>
              {isAtivo ? 'ATIVO' : 'ENCERRADO'}
            </span>
          </div>
        </div>

        {/* Informações do Hóspede */}
        {hospedagem.hospede && (
          <div style={styles.infoCard}>
            <h3 style={styles.cardTitle}>Informações do Hóspede</h3>

            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Nome:</span>
              <span style={styles.infoValue}>{hospedagem.hospede.nome}</span>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>CPF:</span>
              <span style={styles.infoValue}>{formatCPF(hospedagem.hospede.cpf) || "Não informado"}</span>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>RG:</span>
              <span style={styles.infoValue}>{hospedagem.hospede.rg || "Não informado"}</span>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Data de Nascimento:</span>
              <span style={styles.infoValue}>{formatDate(hospedagem.hospede.data_nascimento)}</span>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div style={styles.buttonContainer}>
          <Link to="/historicodehospedagens" style={styles.buttonBack}>
            <FiArrowLeft /> Voltar à Lista
          </Link>

          {isAtivo && (
            <button onClick={() => setShowModalSaida(true)} style={styles.buttonSaida}>
              Registrar Saída
            </button>
          )}
        </div>

        {/* Modal de Confirmação de Saída */}
        {showModalSaida && (
          <div style={styles.modalOverlay} onClick={() => setShowModalSaida(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h4>Confirmar Saída</h4>
              <p>Deseja realmente registrar a saída deste hóspede?</p>

              <div style={styles.modalFooter}>
                <button
                  onClick={() => setShowModalSaida(false)}
                  style={styles.modalCancelBtn}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRegistrarSaida}
                  style={styles.modalConfirmBtn}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUser, FiAlertCircle, FiFileText, FiX } from "react-icons/fi";
import ContextoUsuario from "../../../services/context.js";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

const styles = {
  fundo: {
    backgroundImage: `url(${fundo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    minHeight: '100vh',
    paddingTop: '180px',
    paddingBottom: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.98) 695px, transparent 115%)',
  },
  container: {
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
    width: "100%",
    maxWidth: "900px",
    fontFamily: "'Raleway', sans-serif",
    padding: "40px",
    margin: "20px"
  },
  header: {
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "20px",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    margin: "0"
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s"
  },
  cancelButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    backgroundColor: "#ffc107",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s",
    border: "none",
    cursor: "pointer"
  },
  buttonGroup: {
    display: "flex",
    gap: "10px"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    marginBottom: "30px"
  },
  detailCard: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #e9ecef",
    borderRadius: "12px",
    padding: "20px",
    transition: "transform 0.2s ease"
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#495057"
  },
  cardIcon: {
    fontSize: "20px",
    color: "#007bff"
  },
  cardContent: {
    fontSize: "14px",
    lineHeight: "1.5"
  },
  label: {
    fontWeight: "600",
    color: "#6c757d",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "5px"
  },
  value: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "10px"
  },
  descriptionCard: {
    gridColumn: "1 / -1",
    backgroundColor: "#fff",
    border: "2px solid #e9ecef",
    borderRadius: "12px",
    padding: "25px"
  },
  descriptionText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333",
    whiteSpace: "pre-wrap",
    margin: "0"
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'inline-block',
    minWidth: '100px'
  },
  statusAtivo: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  },
  statusCancelado: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    border: '1px solid #ffeaa7'
  },
  statusConcluido: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    fontSize: "18px",
    color: "#6c757d"
  },
  errorContainer: {
    textAlign: "center",
    padding: "40px",
    color: "#dc3545"
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
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
  },
  modalHeader: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  modalBody: {
    marginBottom: "25px"
  },
  modalLabel: {
    display: "block",
    fontWeight: "600",
    color: "#495057",
    fontSize: "14px",
    marginBottom: "8px"
  },
  modalTextarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "14px",
    fontFamily: "'Raleway', sans-serif",
    minHeight: "100px",
    resize: "vertical",
    transition: "border-color 0.2s"
  },
  modalFooter: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end"
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
    transition: "background-color 0.2s"
  },
  modalConfirmBtn: {
    padding: "10px 20px",
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px"
  },
  errorMessage: {
    color: "#dc3545",
    fontSize: "13px",
    marginTop: "5px"
  },
  alertBox: {
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeaa7",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "15px",
    fontSize: "13px",
    color: "#856404"
  }
};

export default function DetalhesBloqueio() {
  const { id } = useParams();
  const [usuario] = useContext(ContextoUsuario);
  const [bloqueio, setBloqueio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const fetchBloqueio = async () => {
      try {
        const response = await fetch(`http://localhost:3001/bloqueios/${id}`);
        if (!response.ok) {
          throw new Error('Bloqueio não encontrado');
        }
        const data = await response.json();
        setBloqueio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBloqueio();
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (statusCalculado) => {
    switch (statusCalculado) {
      case 'ativo':
        return { ...styles.statusBadge, ...styles.statusAtivo };
      case 'cancelado':
        return { ...styles.statusBadge, ...styles.statusCancelado };
      case 'concluido':
        return { ...styles.statusBadge, ...styles.statusConcluido };
      default:
        return styles.statusBadge;
    }
  };

  const handleOpenCancelModal = () => {
    setShowCancelModal(true);
    setMotivoCancelamento("");
    setValidationError("");
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setMotivoCancelamento("");
    setValidationError("");
  };

  const handleCancelBloqueio = async () => {
    if (bloqueio.ocorrencia_id && !motivoCancelamento.trim()) {
      setValidationError("O motivo de cancelamento é obrigatório para bloqueios automáticos.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:3001/bloqueios/${id}/cancelar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          motivo_cancelamento: motivoCancelamento.trim() || null,
          usuario_id: usuario?.id || null
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cancelar bloqueio');
      }

      const data = await response.json();
      setBloqueio(data);
      handleCloseCancelModal();
    } catch (err) {
      setValidationError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main style={styles.fundo}>
        <div style={styles.container}>
          <div style={styles.loadingContainer}>
            Carregando detalhes do bloqueio...
          </div>
        </div>
      </main>
    );
  }

  if (error || !bloqueio) {
    return (
      <main style={styles.fundo}>
        <div style={styles.container}>
          <div style={styles.errorContainer}>
            <h3>Erro ao carregar bloqueio</h3>
            <p>{error || 'Bloqueio não encontrado'}</p>
            <Link to="/bloqueios" style={styles.backButton}>
              <FiArrowLeft /> Voltar à lista
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const statusCalculado = bloqueio.status_calculado || bloqueio.status;

  return (
    <main style={styles.fundo}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Detalhes do Bloqueio #{bloqueio.id}</h1>
          <div style={styles.buttonGroup}>
            {statusCalculado === 'ativo' && (
              <button onClick={handleOpenCancelModal} style={styles.cancelButton}>
                <FiX /> Cancelar
              </button>
            )}
            <Link to="/bloqueios" style={styles.backButton}>
              <FiArrowLeft /> Voltar à lista
            </Link>
          </div>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailCard}>
            <div style={styles.cardHeader}>
              <FiUser style={styles.cardIcon} />
              Hóspede
            </div>
            <div style={styles.cardContent}>
              <div style={styles.label}>Nome do Hóspede</div>
              <div style={styles.value}>{bloqueio.guest?.nome || 'Não informado'}</div>

              <div style={styles.label}>ID do Hóspede</div>
              <div style={styles.value}>#{bloqueio.hospede_id || 'N/A'}</div>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.cardHeader}>
              <FiCalendar style={styles.cardIcon} />
              Período do Bloqueio
            </div>
            <div style={styles.cardContent}>
              <div style={styles.label}>Data de Início</div>
              <div style={styles.value}>{formatDate(bloqueio.data_inicio)}</div>

              <div style={styles.label}>Data de Término</div>
              <div style={styles.value}>{formatDate(bloqueio.data_termino)}</div>

              {bloqueio.data_termino_original && bloqueio.data_termino_original !== bloqueio.data_termino && (
                <>
                  <div style={styles.label}>Data de Término Original</div>
                  <div style={styles.value}>{formatDate(bloqueio.data_termino_original)}</div>
                </>
              )}
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.cardHeader}>
              <FiAlertCircle style={styles.cardIcon} />
              Status
            </div>
            <div style={styles.cardContent}>
              <div style={styles.label}>Status Atual</div>
              <div style={styles.value}>
                <span style={getStatusStyle(statusCalculado)}>
                  {statusCalculado.toUpperCase()}
                </span>
              </div>

              {bloqueio.esta_ativo !== undefined && (
                <>
                  <div style={styles.label}>Bloqueio Ativo</div>
                  <div style={styles.value}>{bloqueio.esta_ativo ? 'Sim' : 'Não'}</div>
                </>
              )}
            </div>
          </div>

          {bloqueio.occurrence && (
            <div style={styles.detailCard}>
              <div style={styles.cardHeader}>
                <FiAlertCircle style={styles.cardIcon} />
                Ocorrência Relacionada
              </div>
              <div style={styles.cardContent}>
                <div style={styles.label}>ID da Ocorrência</div>
                <div style={styles.value}>#{bloqueio.ocorrencia_id}</div>

                <div style={styles.label}>Data da Ocorrência</div>
                <div style={styles.value}>
                  {formatDate(bloqueio.occurrence.registration_date)}
                </div>

                <div style={styles.label}>Descrição</div>
                <div style={styles.value}>
                  {bloqueio.occurrence.description?.substring(0, 100)}...
                </div>
              </div>
            </div>
          )}

          {bloqueio.status === 'cancelado' && bloqueio.cancelado_em && (
            <div style={styles.detailCard}>
              <div style={styles.cardHeader}>
                <FiX style={styles.cardIcon} />
                Cancelamento
              </div>
              <div style={styles.cardContent}>
                <div style={styles.label}>Cancelado em</div>
                <div style={styles.value}>{formatDateTime(bloqueio.cancelado_em)}</div>

                {bloqueio.canceledByUser && (
                  <>
                    <div style={styles.label}>Cancelado por</div>
                    <div style={styles.value}>{bloqueio.canceledByUser.usuario}</div>
                  </>
                )}

                {bloqueio.motivo_cancelamento && (
                  <>
                    <div style={styles.label}>Motivo do Cancelamento</div>
                    <div style={styles.value}>{bloqueio.motivo_cancelamento}</div>
                  </>
                )}
              </div>
            </div>
          )}

          <div style={styles.detailCard}>
            <div style={styles.cardHeader}>
              <FiCalendar style={styles.cardIcon} />
              Registro
            </div>
            <div style={styles.cardContent}>
              <div style={styles.label}>Criado em</div>
              <div style={styles.value}>{formatDateTime(bloqueio.created_at || bloqueio.createdAt)}</div>

              <div style={styles.label}>Última atualização</div>
              <div style={styles.value}>{formatDateTime(bloqueio.updated_at || bloqueio.updatedAt)}</div>
            </div>
          </div>
        </div>

        <div style={{ ...styles.detailCard, ...styles.descriptionCard }}>
          <div style={styles.cardHeader}>
            <FiFileText style={styles.cardIcon} />
            Motivo do Bloqueio
          </div>
          <div style={styles.cardContent}>
            <p style={styles.descriptionText}>
              {bloqueio.motivo || 'Nenhum motivo fornecido.'}
            </p>
          </div>
        </div>

        {showCancelModal && (
          <div style={styles.modalOverlay} onClick={handleCloseCancelModal}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <FiX style={{ color: "#ffc107" }} />
                Cancelar Bloqueio
              </div>

              <div style={styles.modalBody}>
                {bloqueio.ocorrencia_id && (
                  <div style={styles.alertBox}>
                    <strong>Atenção:</strong> Este é um bloqueio automático. O motivo do cancelamento é obrigatório.
                  </div>
                )}

                <label style={styles.modalLabel}>
                  Motivo do Cancelamento {bloqueio.ocorrencia_id && <span style={{ color: "#dc3545" }}>*</span>}
                </label>
                <textarea
                  style={styles.modalTextarea}
                  value={motivoCancelamento}
                  onChange={(e) => setMotivoCancelamento(e.target.value)}
                  placeholder="Descreva o motivo do cancelamento deste bloqueio"
                  disabled={submitting}
                />
                {validationError && (
                  <div style={styles.errorMessage}>{validationError}</div>
                )}
              </div>

              <div style={styles.modalFooter}>
                <button
                  onClick={handleCloseCancelModal}
                  style={styles.modalCancelBtn}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCancelBloqueio}
                  style={styles.modalConfirmBtn}
                  disabled={submitting}
                >
                  <FiX />
                  {submitting ? 'Cancelando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiLock, FiPlus } from "react-icons/fi";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

function formatCPF(cpf) {
  if (!cpf) return "";
  const numbers = cpf.replace(/\D/g, "");
  if (numbers.length !== 11) return cpf;
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default function DetalhesHospede() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospede, setHospede] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBloqueioModal, setShowBloqueioModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [bloqueioFormData, setBloqueioFormData] = useState({
    motivo: "",
    data_inicio: "",
    data_termino: ""
  });
  const [bloqueioAtivo, setBloqueioAtivo] = useState(null);

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
    buttonBlock: {
      backgroundColor: "#ffc107",
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
      gap: "8px"
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
      maxWidth: "600px",
      width: "90%",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      maxHeight: "90vh",
      overflowY: "auto"
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
    modalInput: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ced4da",
      fontSize: "14px",
      fontFamily: "'Raleway', sans-serif",
      transition: "border-color 0.2s"
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
      backgroundColor: "#28a745",
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
    formGroup: {
      marginBottom: "20px"
    },
    required: {
      color: "#dc3545"
    }
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

  const handleOpenBloqueioModal = async () => {
    // Verificar se existe bloqueio ativo para este hóspede
    try {
      const response = await fetch(`http://localhost:3001/bloqueios?hospede_id=${id}&status=ativo`);
      const bloqueios = await response.json();

      if (bloqueios && bloqueios.length > 0) {
        setBloqueioAtivo(bloqueios[0]);
      } else {
        setBloqueioAtivo(null);
      }
    } catch (err) {
      console.error("Erro ao verificar bloqueios ativos:", err);
      setBloqueioAtivo(null);
    }

    setShowBloqueioModal(true);
    setBloqueioFormData({
      motivo: "",
      data_inicio: "",
      data_termino: ""
    });
    setValidationErrors({});
  };

  const handleCloseBloqueioModal = () => {
    setShowBloqueioModal(false);
    setBloqueioFormData({
      motivo: "",
      data_inicio: "",
      data_termino: ""
    });
    setValidationErrors({});
    setBloqueioAtivo(null);
  };

  const handleBloqueioChange = (field, value) => {
    setBloqueioFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateBloqueioForm = () => {
    const errors = {};

    if (!bloqueioFormData.motivo.trim()) {
      errors.motivo = "O motivo é obrigatório.";
    }

    if (!bloqueioFormData.data_inicio) {
      errors.data_inicio = "A data de início é obrigatória.";
    }

    if (!bloqueioFormData.data_termino) {
      errors.data_termino = "A data de término é obrigatória.";
    }

    if (bloqueioFormData.data_inicio && bloqueioFormData.data_termino) {
      const dataInicio = new Date(bloqueioFormData.data_inicio);
      const dataTermino = new Date(bloqueioFormData.data_termino);

      if (dataTermino < dataInicio) {
        errors.data_termino = "A data de término deve ser maior ou igual à data de início.";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateBloqueio = async () => {
    if (!validateBloqueioForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/bloqueios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hospede_id: hospede.id,
          motivo: bloqueioFormData.motivo.trim(),
          data_inicio: bloqueioFormData.data_inicio,
          data_termino: bloqueioFormData.data_termino
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar bloqueio');
      }

      handleCloseBloqueioModal();
      navigate('/bloqueios');
      window.scrollTo(0, 0);
    } catch (err) {
      setValidationErrors(prev => ({
        ...prev,
        general: err.message
      }));
    } finally {
      setSubmitting(false);
    }
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

          <button onClick={handleOpenBloqueioModal} style={styles.buttonBlock}>
            <FiLock /> Bloquear Hóspede
          </button>

          <Link to={`/hospedes/${hospede.id}`} style={styles.buttonEdit}>
            Editar Hóspede
          </Link>
        </div>

        {showBloqueioModal && (
          <div style={styles.modalOverlay} onClick={handleCloseBloqueioModal}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <FiLock style={{ color: "#ffc107" }} />
                Criar Bloqueio para {hospede.nome}
              </div>

              <div style={styles.modalBody}>
                {bloqueioAtivo && (
                  <div style={{
                    padding: "12px",
                    backgroundColor: "#fff3cd",
                    border: "1px solid #ffeaa7",
                    borderRadius: "8px",
                    marginBottom: "15px",
                    color: "#856404",
                    fontSize: "14px"
                  }}>
                    <strong>⚠️ Atenção:</strong> Este hóspede já possui um bloqueio ativo até{" "}
                    {new Date(bloqueioAtivo.data_termino).toLocaleDateString('pt-BR')}.
                    Ao criar um novo bloqueio, o hóspede terá múltiplos bloqueios ativos simultaneamente.
                  </div>
                )}

                {validationErrors.general && (
                  <div style={{
                    padding: "12px",
                    backgroundColor: "#f8d7da",
                    border: "1px solid #f5c6cb",
                    borderRadius: "8px",
                    marginBottom: "15px",
                    color: "#721c24",
                    fontSize: "14px"
                  }}>
                    {validationErrors.general}
                  </div>
                )}

                <div style={styles.formGroup}>
                  <label style={styles.modalLabel}>
                    Data de Início <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    style={styles.modalInput}
                    value={bloqueioFormData.data_inicio}
                    onChange={(e) => handleBloqueioChange('data_inicio', e.target.value)}
                    disabled={submitting}
                  />
                  {validationErrors.data_inicio && (
                    <div style={styles.errorMessage}>{validationErrors.data_inicio}</div>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.modalLabel}>
                    Data de Término <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    style={styles.modalInput}
                    value={bloqueioFormData.data_termino}
                    onChange={(e) => handleBloqueioChange('data_termino', e.target.value)}
                    min={bloqueioFormData.data_inicio}
                    disabled={submitting}
                  />
                  {validationErrors.data_termino && (
                    <div style={styles.errorMessage}>{validationErrors.data_termino}</div>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.modalLabel}>
                    Motivo do Bloqueio <span style={styles.required}>*</span>
                  </label>
                  <textarea
                    style={styles.modalTextarea}
                    value={bloqueioFormData.motivo}
                    onChange={(e) => handleBloqueioChange('motivo', e.target.value)}
                    placeholder="Descreva o motivo do bloqueio"
                    disabled={submitting}
                  />
                  {validationErrors.motivo && (
                    <div style={styles.errorMessage}>{validationErrors.motivo}</div>
                  )}
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button
                  onClick={handleCloseBloqueioModal}
                  style={styles.modalCancelBtn}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateBloqueio}
                  style={styles.modalConfirmBtn}
                  disabled={submitting}
                >
                  <FiPlus />
                  {submitting ? 'Criando...' : 'Criar Bloqueio'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
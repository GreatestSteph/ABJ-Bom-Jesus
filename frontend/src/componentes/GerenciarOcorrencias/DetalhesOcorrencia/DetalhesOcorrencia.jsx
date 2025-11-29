import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUser, FiAlertCircle, FiFileText, FiEdit2 } from "react-icons/fi";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import API_URL from "../../../config/api";

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
  editButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
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
  nivelBadge: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'inline-block',
    minWidth: '80px'
  },
  nivelLeve: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  },
  nivelModerado: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    border: '1px solid #ffeaa7'
  },
  nivelGrave: {
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
  }
};

export default function DetalhesOcorrencia() {
  const { id } = useParams();
  const [ocorrencia, setOcorrencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOcorrencia = async () => {
      try {
        const response = await fetch(`${API_URL}/occurrences/${id}`);
        if (!response.ok) {
          throw new Error('Ocorrência não encontrada');
        }
        const data = await response.json();
        setOcorrencia(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOcorrencia();
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNivelStyle = (nivel) => {
    switch (nivel) {
      case 'Leve':
        return { ...styles.nivelBadge, ...styles.nivelLeve };
      case 'Moderado':
        return { ...styles.nivelBadge, ...styles.nivelModerado };
      case 'Grave':
        return { ...styles.nivelBadge, ...styles.nivelGrave };
      default:
        return styles.nivelBadge;
    }
  };

  if (loading) {
    return (
      <main style={styles.fundo}>
        <div style={styles.container}>
          <div style={styles.loadingContainer}>
            Carregando detalhes da ocorrência...
          </div>
        </div>
      </main>
    );
  }

  if (error || !ocorrencia) {
    return (
      <main style={styles.fundo}>
        <div style={styles.container}>
          <div style={styles.errorContainer}>
            <h3>Erro ao carregar ocorrência</h3>
            <p>{error || 'Ocorrência não encontrada'}</p>
            <Link to="/ocorrencias/lista" style={styles.backButton}>
              <FiArrowLeft /> Voltar à lista
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.fundo}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Detalhes da Ocorrência #{ocorrencia.id}</h1>
          <div style={styles.buttonGroup}>
            <Link to={`/ocorrencias/editar/${ocorrencia.id}`} style={styles.editButton}>
              <FiEdit2 /> Editar
            </Link>
            <Link to="/ocorrencias/lista" style={styles.backButton}>
              <FiArrowLeft /> Voltar à lista
            </Link>
          </div>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailCard}>
            <div style={styles.cardHeader}>
              <FiCalendar style={styles.cardIcon} />
              Informações Gerais
            </div>
            <div style={styles.cardContent}>
              <div style={styles.label}>Data da Ocorrência</div>
              <div style={styles.value}>{formatDate(ocorrencia.registration_date)}</div>

              <div style={styles.label}>ID da Ocorrência</div>
              <div style={styles.value}>#{ocorrencia.id}</div>

              <div style={styles.label}>Registrado no Sistema</div>
              <div style={styles.value}>{formatDate(ocorrencia.createdAt || ocorrencia.created_at)}</div>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.cardHeader}>
              <FiUser style={styles.cardIcon} />
              Hóspede Envolvido
            </div>
            <div style={styles.cardContent}>
              <div style={styles.label}>Nome do Hóspede</div>
              <div style={styles.value}>{ocorrencia.guest?.nome || 'Não informado'}</div>

              <div style={styles.label}>ID do Hóspede</div>
              <div style={styles.value}>#{ocorrencia.guest?.id || 'N/A'}</div>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.cardHeader}>
              <FiAlertCircle style={styles.cardIcon} />
              Tipo de Ocorrência
            </div>
            <div style={styles.cardContent}>
              <div style={styles.label}>Tipo</div>
              <div style={styles.value}>{ocorrencia.occurrenceType?.nome || 'Não informado'}</div>

              <div style={styles.label}>Nível de Gravidade</div>
              <div style={styles.value}>
                <span style={getNivelStyle(ocorrencia.occurrenceType?.nivel)}>
                  {ocorrencia.occurrenceType?.nivel || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.cardHeader}>
              <FiUser style={styles.cardIcon} />
              Registro
            </div>
            <div style={styles.cardContent}>
              <div style={styles.label}>Registrado por</div>
              <div style={styles.value}>{ocorrencia.registeredByUser?.usuario || 'Não informado'}</div>

              <div style={styles.label}>ID do Usuário</div>
              <div style={styles.value}>#{ocorrencia.registered_by_user_id || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div style={{ ...styles.detailCard, ...styles.descriptionCard }}>
          <div style={styles.cardHeader}>
            <FiFileText style={styles.cardIcon} />
            Descrição da Ocorrência
          </div>
          <div style={styles.cardContent}>
            <p style={styles.descriptionText}>
              {ocorrencia.description || 'Nenhuma descrição fornecida.'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

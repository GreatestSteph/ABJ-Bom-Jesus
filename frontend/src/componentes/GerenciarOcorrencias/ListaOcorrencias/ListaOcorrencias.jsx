import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
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
  th: {
    backgroundColor: "#f0f0f0",
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center'
  },
  modalButtons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  filtersContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
    alignItems: 'end'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  filterLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '2px'
  },
  filterInput: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    width: '100%',
    transition: 'border-color 0.2s'
  },
  filterSelect: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    width: '100%',
    transition: 'border-color 0.2s',
    cursor: 'pointer'
  },
  clearButton: {
    padding: '10px 20px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    height: 'fit-content'
  },
  dateRangeContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  dateRangeLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '2px'
  },
  dateInputsWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  dateInput: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    flex: 1,
    transition: 'border-color 0.2s'
  },
  dateInputError: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '2px solid #dc3545',
    fontSize: '14px',
    flex: 1,
    transition: 'border-color 0.2s',
    backgroundColor: '#fff5f5'
  },
  errorMessage: {
    fontSize: '12px',
    color: '#dc3545',
    marginTop: '4px',
    fontWeight: '500'
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
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '24px 0 12px 0',
    gap: '8px'
  },
  paginationButton: {
    padding: '6px 14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'white',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  paginationButtonActive: {
    padding: '6px 14px',
    border: '1px solid rgb(60, 162, 245)',
    borderRadius: '4px',
    background: 'rgb(60, 162, 245)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  paginationButtonDisabled: {
    padding: '6px 14px',
    border: '1px solid #eee',
    borderRadius: '4px',
    background: '#f5f5f5',
    color: '#aaa',
    cursor: 'not-allowed',
    fontWeight: 'bold'
  },
  nivelBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'inline-block',
    minWidth: '60px'
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
  iconButton: {
    border: '1px solid transparent',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '8px',
    borderRadius: '0.25rem',
    transition: 'all 0.15s ease-in-out',
    margin: '0 2px',
    width: '36px',
    height: '36px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none'
  },
  iconButtonView: {
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
    color: '#fff'
  },
  iconButtonViewHover: {
    backgroundColor: '#5a6268',
    borderColor: '#545b62'
  },
  iconButtonEdit: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: '#fff'
  },
  iconButtonEditHover: {
    backgroundColor: '#0056b3',
    borderColor: '#004085'
  },
  iconButtonDelete: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
    color: '#fff'
  },
  iconButtonDeleteHover: {
    backgroundColor: '#c82333',
    borderColor: '#bd2130'
  },
  addButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background-color 0.2s",
    border: "none",
    cursor: "pointer"
  },
  filtersHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px"
  }
};

// Componente de Paginação
function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1,2,3,4,'...',totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1,'...',totalPages-3,totalPages-2,totalPages-1,totalPages);
      } else {
        pages.push(1,'...',currentPage-1,currentPage,currentPage+1,'...',totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div style={styles.paginationContainer}>
      <button
        style={currentPage === 1 ? styles.paginationButtonDisabled : styles.paginationButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={idx} style={{ padding: '0 6px', color: '#888' }}>...</span>
        ) : (
          <button
            key={page}
            style={currentPage === page ? styles.paginationButtonActive : styles.paginationButton}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        )
      )}
      <button
        style={currentPage === totalPages ? styles.paginationButtonDisabled : styles.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

export default function ListaOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ocorrenciaToDelete, setOcorrenciaToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    guestName: "",
    nivel: "",
    startDate: "",
    endDate: ""
  });

  const OCORRENCIAS_PER_PAGE = 10;

  const fetchOcorrencias = () => {
    const params = new URLSearchParams();
    if (filters.guestName.trim()) {
      params.append('guest_name', filters.guestName.trim());
    }
    if (filters.nivel) {
      params.append('nivel', filters.nivel);
    }
    if (filters.startDate) {
      params.append('start_date', filters.startDate);
    }
    if (filters.endDate) {
      params.append('end_date', filters.endDate);
    }

    const url = `${API_URL}/occurrences${params.toString() ? '?' + params.toString() : ''}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setOcorrencias(data))
      .catch((err) => console.error("Erro ao buscar ocorrências:", err));
  };

  useEffect(() => {
    fetchOcorrencias();
  }, []);

  useEffect(() => {
    fetchOcorrencias();
  }, [filters]);

  const handleDeleteClick = (ocorrencia) => {
    setOcorrenciaToDelete(ocorrencia);
    setDeleteError("");
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!ocorrenciaToDelete) return;

    try {
      const response = await fetch(`${API_URL}/occurrences/${ocorrenciaToDelete.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setDeleteError(data.message || "Erro ao excluir ocorrência.");
        return;
      }

      setOcorrencias(ocorrencias.filter((ocorrencia) => ocorrencia.id !== ocorrenciaToDelete.id));
      setShowModal(false);
      setOcorrenciaToDelete(null);
      setDeleteError("");
    } catch (error) {
      setDeleteError("Erro ao excluir ocorrência. Tente novamente.");
    }
  };

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value
    };

    // If start date is changed and it's greater than end date, update end date
    if (field === 'startDate' && filters.endDate && value) {
      if (new Date(value) > new Date(filters.endDate)) {
        newFilters.endDate = value;
      }
    }

    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      guestName: "",
      nivel: "",
      startDate: "",
      endDate: ""
    });
  };

  // Paginação
  const totalPages = Math.ceil(ocorrencias.length / OCORRENCIAS_PER_PAGE) || 1;
  const paginatedOcorrencias = ocorrencias.slice(
    (currentPage - 1) * OCORRENCIAS_PER_PAGE,
    currentPage * OCORRENCIAS_PER_PAGE
  );

  // Se filtros mudarem, volta para página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
         <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
              <Link to="/ocorrencias" style={styles.functionSelected}>
                Ocorrências
              </Link>

              <Link to="/tipos-ocorrencias" style={styles.functionNotSelected}>
                Tipos de Ocorrências
              </Link>
            </div>
            <hr style={styles.hr}/>

        <div className="mt-4 pt-3 mb-4 mx-5 px-2">
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/ocorrencias/cadastrar-nova" style={styles.addButton}>
              <FiPlus />
              Nova Ocorrência
            </Link>
          </div>

          <div style={styles.filtersContainer}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Hóspede</label>
              <input
                type="text"
                placeholder="Nome do hóspede"
                value={filters.guestName}
                onChange={(e) => handleFilterChange('guestName', e.target.value)}
                style={styles.filterInput}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Nível de Gravidade</label>
              <select
                value={filters.nivel}
                onChange={(e) => handleFilterChange('nivel', e.target.value)}
                style={styles.filterSelect}
              >
                <option value="">Todos os níveis</option>
                <option value="Leve">Leve</option>
                <option value="Moderado">Moderado</option>
                <option value="Grave">Grave</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Data Inicial</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                style={styles.dateInput}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Data Final</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                style={styles.dateInput}
                min={filters.startDate}
              />
            </div>

            <button
              onClick={clearFilters}
              style={styles.clearButton}
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={styles.table} className='mb-5'>
            <thead>
              <tr>
                <th style={styles.th}>Data da Ocorrência</th>
                <th style={styles.th}>Hóspede</th>
                <th style={styles.th}>Tipo de Ocorrência</th>
                <th style={styles.th}>Nível</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOcorrencias.map((ocorrencia) => (
                <tr key={ocorrencia.id}>
                  <td style={styles.td}>{formatDate(ocorrencia.registration_date)}</td>
                  <td style={styles.td}>{ocorrencia.guest?.nome || 'N/A'}</td>
                  <td style={styles.td}>{ocorrencia.occurrenceType?.nome || 'N/A'}</td>
                  <td style={styles.td}>
                    <span style={getNivelStyle(ocorrencia.occurrenceType?.nivel)}>
                      {ocorrencia.occurrenceType?.nivel || 'N/A'}
                    </span>
                  </td>
                  <td style={{ ...styles.td, ...styles.actions }}>
                    <Link
                      to={`/ocorrencias/detalhes/${ocorrencia.id}`}
                      title="Visualizar detalhes"
                      style={{ ...styles.iconButton, ...styles.iconButtonView }}
                    >
                      <FiEye />
                    </Link>
                    <Link
                      to={`/ocorrencias/editar/${ocorrencia.id}`}
                      title="Editar"
                      style={{ ...styles.iconButton, ...styles.iconButtonEdit }}
                    >
                      <FiEdit2 />
                    </Link>
                    <button
                      title="Excluir"
                      style={{ ...styles.iconButton, ...styles.iconButtonDelete }}
                      onClick={() => handleDeleteClick(ocorrencia)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedOcorrencias.length === 0 && (
                <tr>
                  <td style={styles.td} colSpan={5} className="text-center">
                    Nenhuma ocorrência encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {showModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h4>Confirmar Exclusão</h4>
              <p>Tem certeza que deseja excluir esta ocorrência?</p>
              {deleteError && (
                <div style={{
                  backgroundColor: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  color: '#721c24',
                  padding: '12px',
                  borderRadius: '6px',
                  marginTop: '15px',
                  marginBottom: '15px',
                  fontSize: '14px',
                  textAlign: 'left'
                }}>
                  <strong>Erro:</strong> {deleteError}
                </div>
              )}
              <div style={styles.modalButtons}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-danger" onClick={handleDelete}>Confirmar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

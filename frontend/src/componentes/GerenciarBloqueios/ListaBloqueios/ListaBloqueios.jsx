import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiPlus, FiX } from "react-icons/fi";
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
  dateInput: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    flex: 1,
    transition: 'border-color 0.2s'
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
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'inline-block',
    minWidth: '80px'
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
  iconButtonCancel: {
    backgroundColor: '#ffc107',
    borderColor: '#ffc107',
    color: '#fff'
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

export default function ListaBloqueios() {
  const [usuario] = useContext(ContextoUsuario);
  const [bloqueios, setBloqueios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    guestName: "",
    status: "",
    startDate: "",
    endDate: ""
  });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBloqueio, setSelectedBloqueio] = useState(null);
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  const BLOQUEIOS_PER_PAGE = 10;

  const fetchBloqueios = () => {
    const params = new URLSearchParams();
    if (filters.guestName.trim()) {
      params.append('guest_name', filters.guestName.trim());
    }
    if (filters.status) {
      params.append('status', filters.status);
    }
    if (filters.startDate) {
      params.append('start_date', filters.startDate);
    }
    if (filters.endDate) {
      params.append('end_date', filters.endDate);
    }

    const url = `http://localhost:3001/bloqueios${params.toString() ? '?' + params.toString() : ''}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setBloqueios(data))
      .catch((err) => console.error("Erro ao buscar bloqueios:", err));
  };

  useEffect(() => {
    fetchBloqueios();
  }, []);

  useEffect(() => {
    fetchBloqueios();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value
    };

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
      status: "",
      startDate: "",
      endDate: ""
    });
  };

  const totalPages = Math.ceil(bloqueios.length / BLOQUEIOS_PER_PAGE) || 1;
  const paginatedBloqueios = bloqueios.slice(
    (currentPage - 1) * BLOQUEIOS_PER_PAGE,
    currentPage * BLOQUEIOS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleOpenCancelModal = (bloqueio) => {
    setSelectedBloqueio(bloqueio);
    setShowCancelModal(true);
    setMotivoCancelamento("");
    setValidationError("");
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setSelectedBloqueio(null);
    setMotivoCancelamento("");
    setValidationError("");
  };

  const handleCancelBloqueio = async () => {
    if (!motivoCancelamento.trim()) {
      setValidationError("O motivo de cancelamento é obrigatório.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:3001/bloqueios/${selectedBloqueio.id}/cancelar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          motivo_cancelamento: motivoCancelamento.trim(),
          usuario_id: usuario?.id || null
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cancelar bloqueio');
      }

      handleCloseCancelModal();
      fetchBloqueios();
    } catch (err) {
      setValidationError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
        <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
          <Link to="/hospedes" style={styles.functionNotSelected}>
            Hóspedes
          </Link>

          <Link to="/historicodehospedagens" style={styles.functionNotSelected}>
            Lista de Hospedagens
          </Link>

          <Link to="/bloqueios" style={styles.functionSelected}>
            Bloqueios
          </Link>
        </div>
        <hr style={styles.hr}/>

        <div className="mt-4 pt-3 mb-4 mx-5 px-2">
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
              <label style={styles.filterLabel}>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                style={styles.filterSelect}
              >
                <option value="">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="cancelado">Cancelado</option>
                <option value="concluido">Concluído</option>
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
                <th style={styles.th}>Hóspede</th>
                <th style={styles.th}>Motivo</th>
                <th style={styles.th}>Data Início</th>
                <th style={styles.th}>Data Término</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBloqueios.map((bloqueio) => (
                <tr key={bloqueio.id}>
                  <td style={styles.td}>{bloqueio.guest?.nome || 'N/A'}</td>
                  <td style={styles.td}>{bloqueio.motivo.substring(0, 50)}...</td>
                  <td style={styles.td}>{formatDate(bloqueio.data_inicio)}</td>
                  <td style={styles.td}>{formatDate(bloqueio.data_termino)}</td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(bloqueio.status_calculado || bloqueio.status)}>
                      {(bloqueio.status_calculado || bloqueio.status).toUpperCase()}
                    </span>
                  </td>
                  <td style={{ ...styles.td, ...styles.actions }}>
                    <Link
                      to={`/bloqueios/detalhes/${bloqueio.id}`}
                      title="Visualizar detalhes"
                      style={{ ...styles.iconButton, ...styles.iconButtonView }}
                    >
                      <FiEye />
                    </Link>
                    {(bloqueio.status_calculado || bloqueio.status) === 'ativo' && (
                      <button
                        onClick={() => handleOpenCancelModal(bloqueio)}
                        title="Cancelar bloqueio"
                        style={{ ...styles.iconButton, ...styles.iconButtonCancel }}
                      >
                        <FiX />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {paginatedBloqueios.length === 0 && (
                <tr>
                  <td style={styles.td} colSpan={6} className="text-center">
                    Nenhum bloqueio encontrado.
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

        {showCancelModal && selectedBloqueio && (
          <div style={styles.modalOverlay} onClick={handleCloseCancelModal}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <FiX style={{ color: "#ffc107" }} />
                Cancelar Bloqueio
              </div>

              <div style={styles.modalBody}>
                <div style={styles.alertBox}>
                  <strong>Atenção:</strong> O cancelamento de um bloqueio é uma ação irreversível. Prossiga apenas se tiver certeza.
                </div>

                <div style={{ marginBottom: "15px", fontSize: "14px" }}>
                  <strong>Hóspede:</strong> {selectedBloqueio.guest?.nome || 'N/A'}
                </div>

                <label style={styles.modalLabel}>
                  Motivo do Cancelamento <span style={{ color: "#dc3545" }}>*</span>
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

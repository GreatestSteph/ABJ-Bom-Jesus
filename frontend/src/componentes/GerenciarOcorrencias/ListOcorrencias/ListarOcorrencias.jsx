import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
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
    maxWidth: "300px",
    wordWrap: "break-word",
    whiteSpace: "normal",
    verticalAlign: "middle",
  },
  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "flex-start",
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
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '20px'
  },
  searchInput: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '300px'
  },
  barraPesquisa: {
    width: '100%',
    padding: '12px',
    margin: '6px 0 0 0',
    borderRadius: '8px',
    border: '2px solid #e77f3c',
    fontSize: '14px',
    color: '#001b5e',
    outline: 'none',
    transition: 'border-color 0.3s ease',
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
    fontWeight: 'bold',
  },
  hr: {
    border: 'none',
    height: '3px',
    backgroundColor: 'rgb(60, 162, 245)',
    opacity: '100%',
    width: '100%',
    margin: 0 
  },
  barraPesquisa: {
    width: '100%',
    padding: '12px 120px 12px 16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    height: '60px',
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

export default function OcorrenciasList() {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ocorrenciaToDelete, setOcorrenciaToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteError, setDeleteError] = useState("");

  const OCORRENCIAS_PER_PAGE = 10;

  useEffect(() => {
    fetch(`${API_URL}/tipos-ocorrencia`)
      .then((res) => res.json())
      .then((data) => setOcorrencias(data))
      .catch((err) => console.error("Erro ao buscar tipos de ocorrências:", err));
  }, []);

  const handleDeleteClick = (ocorrencia) => {
    setOcorrenciaToDelete(ocorrencia);
    setDeleteError("");
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!ocorrenciaToDelete) return;

    try {
      const response = await fetch(`${API_URL}/tipos-ocorrencia/${ocorrenciaToDelete.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setDeleteError(data.message || "Erro ao excluir tipo de ocorrência.");
        return;
      }

      setOcorrencias(ocorrencias.filter((ocorrencia) => ocorrencia.id !== ocorrenciaToDelete.id));
      setShowModal(false);
      setOcorrenciaToDelete(null);
      setDeleteError("");
    } catch (error) {
      setDeleteError("Erro ao excluir tipo de ocorrência. Tente novamente.");
    }
  };

  // Busca por nome
  const filteredOcorrencias = ocorrencias.filter(ocorrencia => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return ocorrencia.nome?.toLowerCase().includes(term);
  });

  // Paginação
  const totalPages = Math.ceil(filteredOcorrencias.length / OCORRENCIAS_PER_PAGE) || 1;
  const paginatedOcorrencias = filteredOcorrencias.slice(
    (currentPage - 1) * OCORRENCIAS_PER_PAGE,
    currentPage * OCORRENCIAS_PER_PAGE
  );

  // Se searchTerm mudar, volta para página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
         <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
              <Link to="/ocorrencias" style={styles.functionNotSelected}>
                Ocorrências
              </Link>

              <Link to="/tipos-ocorrencias" style={styles.functionSelected}>
                Tipos de Ocorrências
              </Link>
            </div>
            <hr style={styles.hr}/>

        <div style={styles.searchContainer} className="mt-4 pt-3 mb-5 mx-5 px-2">
          <div style={{ position: 'relative', flex: 1, maxWidth: '450px' }}>
            <input
              type="text"
              placeholder="Digite aqui o nome do tipo de ocorrência"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.barraPesquisa}
            />
          </div>

          <Link to="/tipo-ocorrencias/cadastrar" style={styles.addButton}>
            <FiPlus />
            Novo Tipo de Ocorrência
          </Link>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={styles.table} className='mb-5'>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Descrição</th>
                <th style={styles.th}>Nível</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOcorrencias.map((ocorrencia) => (
                <tr key={ocorrencia.id}>
                  <td style={styles.td}>#{ocorrencia.id}</td>
                  <td style={styles.td}>{ocorrencia.nome}</td>
                  <td style={styles.td}>
                    {ocorrencia.descricao || 'Sem descrição'}
                  </td>
                  <td style={styles.td}>
                    <span style={getNivelStyle(ocorrencia.nivel)}>
                      {ocorrencia.nivel}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <Link
                        to={`/tipo-ocorrencias/${ocorrencia.id}`}
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
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedOcorrencias.length === 0 && (
                <tr>
                  <td style={styles.td} colSpan={5} className="text-center">
                    Nenhum tipo de ocorrência encontrado.
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
              <p>Tem certeza que deseja excluir o tipo de ocorrência "{ocorrenciaToDelete?.nome}"?</p>
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

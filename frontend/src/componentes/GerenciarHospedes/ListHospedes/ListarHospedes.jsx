import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import API_URL from "../../../config/api";

function formatCPF(cpf) {
  if (!cpf) return "";
  const numbers = cpf.replace(/\D/g, "");
  if (numbers.length !== 11) return cpf; // Se não tem 11 dígitos, retorna como está
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

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
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  searchInput: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '300px'
  },
  functionNotSelected: {
    color: 'rgb(42, 135, 211)',
    padding: '25px 30px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  functionSelected: {
    borderTopLeftRadius: '20px',
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
  barraPesquisa: {
    width: '100%',
    padding: '12px 120px 12px 16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    height: '60px',
  },
  posicaoBotoes: {
    position: 'absolute',
    top: '50%',
    right: '12px',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: '8px'
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
  iconButtonEdit: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: '#fff'
  },
  iconButtonDelete: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
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
};

// Componente de Paginação
function Pagination({ currentPage, totalPages, onPageChange }) {
  // Mostra no máximo 5 páginas (com ... se necessário)
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

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageModal, setMessageModal] = useState({ type: '', title: '', text: '' });

  const GUESTS_PER_PAGE = 10;

  useEffect(() => {
    fetch(`${API_URL}/guests`)
      .then((res) => res.json())
      .then((data) => setGuests(data))
      .catch((err) => console.error("Erro ao buscar hóspedes:", err));
  }, []);

  const handleDeleteClick = (guest) => {
    setGuestToDelete(guest);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!guestToDelete) return;

    try {
      const res = await fetch(`${API_URL}/guests/${guestToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        // Sucesso
        setGuests(guests.filter((guest) => guest.id !== guestToDelete.id));
        setShowModal(false);
        setGuestToDelete(null);
        setMessageModal({
          type: 'success',
          title: 'Sucesso!',
          text: 'Hóspede excluído com sucesso.'
        });
        setShowMessageModal(true);
      } else {
        // Erro do servidor (400, 404, etc)
        setShowModal(false);
        setGuestToDelete(null);
        setMessageModal({
          type: 'error',
          title: data.error || 'Erro',
          text: data.message || 'Não foi possível excluir o hóspede.'
        });
        setShowMessageModal(true);
      }
    } catch (error) {
      // Erro de rede ou outro erro
      console.error("Erro ao excluir hóspede:", error);
      setShowModal(false);
      setGuestToDelete(null);
      setMessageModal({
        type: 'error',
        title: 'Erro',
        text: 'Erro ao tentar excluir o hóspede. Verifique sua conexão.'
      });
      setShowMessageModal(true);
    }
  };

  // Busca por nome OU CPF (ignorando máscara do CPF)
  const filteredGuests = guests.filter(guest => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    const nomeMatch = guest.nome?.toLowerCase().includes(term);
    // Remove máscara do CPF para busca
    const cpfNumeros = (guest.cpf || "").replace(/\D/g, "");
    const termNumeros = term.replace(/\D/g, "");
    const cpfMatch = cpfNumeros.includes(termNumeros) && termNumeros.length > 0;
    return nomeMatch || cpfMatch;
  });

  // Paginação apenas no frontend
  const totalPages = Math.ceil(filteredGuests.length / GUESTS_PER_PAGE) || 1;
  const paginatedGuests = filteredGuests.slice(
    (currentPage - 1) * GUESTS_PER_PAGE,
    currentPage * GUESTS_PER_PAGE
  );

  // Se searchTerm mudar, volta para página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
         <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
              <Link to="/hospedes" style={styles.functionSelected}>
                Hóspedes
              </Link>
              
              <Link to="/historicodehospedagens" style={styles.functionNotSelected}>
                Lista de Hospedagens
              </Link>

              <Link to="/bloqueios" style={styles.functionNotSelected}>
                Bloqueios
              </Link>
            </div>
            <hr style={styles.hr}/>

        <div className="mt-4 pt-3 mb-4 mx-5 px-2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '450px' }}>
              <input
                type="text"
                placeholder="Digite aqui o nome do hóspede ou CPF"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.barraPesquisa}
              />
            </div>

            <Link to="/hospedes/cadastrar" style={styles.addButton}>
              <FiPlus />
              Novo Hóspede
            </Link>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={styles.table} className='mb-5'>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Nascimento</th>
                <th style={styles.th}>RG</th>
                <th style={styles.th}>CPF</th>
                <th style={styles.th}>Empregado</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedGuests.map((guest) => (
                <tr key={guest.id}>
                  <td style={styles.td}>#{guest.id}</td>
                  <td style={styles.td}>{guest.nome}</td>
                  <td style={styles.td}>
                    {new Date(guest.data_nascimento).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>{guest.rg}</td>
                  <td style={styles.td}>{formatCPF(guest.cpf)}</td>
                  <td style={styles.td}>{guest.empregado ? "Sim" : "Não"}</td>
                  <td style={{ ...styles.td, ...styles.actions }}>
                    <Link
                      to={`/hospedes/detalhes/${guest.id}`}
                      title="Visualizar detalhes"
                      style={{ ...styles.iconButton, ...styles.iconButtonView }}
                    >
                      <FiEye />
                    </Link>
                    <Link
                      to={`/hospedes/${guest.id}`}
                      title="Editar"
                      style={{ ...styles.iconButton, ...styles.iconButtonEdit }}
                    >
                      <FiEdit2 />
                    </Link>
                    <button
                      title="Excluir"
                      style={{ ...styles.iconButton, ...styles.iconButtonDelete }}
                      onClick={() => handleDeleteClick(guest)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedGuests.length === 0 && (
                <tr>
                  <td style={styles.td} colSpan={7} className="text-center">
                    Nenhum hóspede encontrado.
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
              <p>Tem certeza que deseja excluir o hóspede {guestToDelete?.nome}?</p>
              <div style={styles.modalButtons}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-danger" onClick={handleDelete}>Confirmar</button>
              </div>
            </div>
          </div>
        )}

        {showMessageModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <div style={{
                fontSize: '48px',
                color: messageModal.type === 'success' ? '#28a745' : '#dc3545',
                marginBottom: '15px'
              }}>
                {messageModal.type === 'success' ? '✓' : '✕'}
              </div>
              <h4 style={{ marginBottom: '10px' }}>{messageModal.title}</h4>
              <p style={{ marginBottom: '20px', color: '#495057' }}>
                {messageModal.text}
              </p>
              <button
                className={messageModal.type === 'success' ? 'btn btn-success' : 'btn btn-danger'}
                onClick={() => setShowMessageModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

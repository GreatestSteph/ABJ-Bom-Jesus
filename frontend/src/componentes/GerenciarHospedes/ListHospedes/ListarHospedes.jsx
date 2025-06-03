import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
// import lupa from "../../WebsiteDesign/RegisterImages/lupa.svg";
// import digital from "../../WebsiteDesign/RegisterImages/digital.svg";

const styles = {
  fundo: {
    backgroundImage: `url(${fundo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    paddingTop: '180px',
    paddingBottom: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.98) 695px, transparent 115%)',
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
  }
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

  const GUESTS_PER_PAGE = 10;

  useEffect(() => {
    fetch("http://localhost:3001/guests")
      .then((res) => res.json())
      .then((data) => setGuests(data))
      .catch((err) => console.error("Erro ao buscar hóspedes:", err));
  }, []);

  const handleDeleteClick = (guest) => {
    setGuestToDelete(guest);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (!guestToDelete) return;

    fetch(`http://localhost:3001/guests/${guestToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setGuests(guests.filter((guest) => guest.id !== guestToDelete.id));
        setShowModal(false);
        setGuestToDelete(null);
        console.log(data);
      });
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
              <Link to="/hospedes/cadastrar" style={styles.functionNotSelected}>
                Registrar Hóspedes
              </Link>

              <Link to="/hospedes-comportamento" style={styles.functionNotSelected}>
                Relatar Comportamento
              </Link>

              <Link to="/hospedes" style={styles.functionSelected}>
                Pesquisar Hóspedes
              </Link>
            </div>
            <hr style={styles.hr}/>

        <div style={styles.searchContainer} className="mt-4 pt-3 mb-5 mx-5 px-2">
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Digite aqui o nome do hóspede ou CPF"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.barraPesquisa}
            />
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
                  <td style={styles.td}>{guest.cpf}</td>
                  <td style={styles.td}>{guest.empregado ? "Sim" : "Não"}</td>
                  <td style={{ ...styles.td, ...styles.actions }}>
                    <Link to={`/hospedes/${guest.id}`} className="btn btn-sm btn-primary">Editar</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteClick(guest)}>Excluir</button>
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
      </div>
    </main>
  );
}

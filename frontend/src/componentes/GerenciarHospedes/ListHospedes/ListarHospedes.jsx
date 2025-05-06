import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

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
  aroundListBox: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
    width: "100%",
    maxWidth: "1200px",
    fontFamily: "'Raleway', sans-serif",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
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
  }
};

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredGuests = guests.filter(guest =>
    guest.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
        <div style={styles.searchContainer}>
          <div>
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <Link to="/hospedes/cadastrar" className="btn btn-primary">
            Cadastrar Novo Hóspede
          </Link>
        </div>
        
        <h2 className="mb-4">Lista de Hóspedes</h2>
        <table style={styles.table}>
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
            {filteredGuests.map((guest) => (
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
          </tbody>
        </table>

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

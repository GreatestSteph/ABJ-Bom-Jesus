import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import lupa from "../../WebsiteDesign/RegisterImages/lupa.svg";
import API_URL from "../../../config/api";

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
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
  },
  modalButtons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  inputSenha: {
    width: '80%',
    padding: '8px',
    fontSize: '16px',
    marginTop: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
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
};

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setUsers(sortedData);
      })
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  const handleEdit = (userId) => {
    navigate(`/registrousuarios/${userId}`);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setUsers(users.filter((u) => u.id !== userId));
        })
        .catch((err) => console.error("Erro ao excluir usuário:", err));
    }
  };

  const filteredUsers = users.filter(user =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
        <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
          <Link to="/registrousuarios" style={styles.functionNotSelected}>
            Registrar Usuários
          </Link>

          <Link to="/listadeusuarios" style={styles.functionSelected}>
            Pesquisar Usuários
          </Link>
        </div>
        <hr style={styles.hr}/>

        <div style={styles.searchContainer} className="mt-4 pt-3 mb-5 mx-5 px-2">
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Digite aqui o nome do funcionário"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.barraPesquisa}
            />

            <div style={styles.posicaoBotoes}>
              <button
                style={{ backgroundColor: 'rgba(231, 127, 60, 1)', padding: '10px 12px' }}
                className="btn"
                onClick={() => setSearchTerm(searchTerm + ' ')}
              >
                <img src={lupa} alt="Ícone de lupa" />
              </button>              
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={styles.table} className='mb-5'>
            <thead>
              <tr>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Função</th>
                <th style={styles.th}>Usuário</th>
                <th style={{ ...styles.td, display: "none" }}>Senha</th>               
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.nome}</td>
                  <td style={styles.td}>{user.funcao}</td>
                  <td style={styles.td}>{user.usuario}</td>
                  <td style={{ ...styles.td, display: "none" }}>{user.senha}</td>
                  <td style={{ ...styles.td, ...styles.actions }}>
                    <td style={{ ...styles.td, ...styles.actions }}>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(user.id)}
                      >
                        Editar
                      </button>
                      {!(["Administrador", "Admin", "TI"].includes(user.funcao)) && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          Excluir
                        </button>
                      )}
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

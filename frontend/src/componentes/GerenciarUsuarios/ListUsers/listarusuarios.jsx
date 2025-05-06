import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import api from "../../../services/api"; // <- OK!

export default function UserList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  const deletarUsuario = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      await api.delete(`/users/${id}`); // <- usar API configurada
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const styles  = {
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
            backgroundColor: 'white', 
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
            maxWidth: '1000px',
            width: '100%',
            textAlign: 'center',
            color: 'black',
            fontFamily: "'Raleway', sans-serif",
        },
    };

    return (
    <main style={styles.fundo}>
      <div className="d-flex justify-content-between" style={styles.aroundListBox}>
        <div className="w-100">
          <h2>Lista de Usuários</h2>
          <div className="d-flex justify-content-end mb-3">
            <Link to="/editaradicionarperfis">+ Adicionar Usuário</Link>
          </div>
          {usuarios.map((u) => (
            <div key={u.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex gap-4">
                <p>{u.id}</p>
                <p>{u.nome}</p>
                <p>{u.funcao}</p>
                <p>{u.usuario}</p>
                <p>{u.senha}</p>
              </div>
              <div className="d-flex gap-2">
                <Link to={`/editaradicionarperfis/${u.id}`}>Editar</Link>
                <button onClick={() => deletarUsuario(u.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
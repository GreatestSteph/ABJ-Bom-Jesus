import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import api from "../../../services/api";

export default function EditProfiles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    funcao: '',
    usuario: '',
    senha: '',
  });

  useEffect(() => {
    if (id) {
      api.get(`/users/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvar = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/users/${id}`, form);
      } else {
        await api.post('/users', form);
      }
      navigate('/listadeusuarios');
    } catch (err) {
      console.error(err);
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
            color: 'white',
            fontFamily: "'Raleway', sans-serif",
        },
  };

  return (
    <main style={styles.fundo}>
      <div className="d-flex justify-content-between" style={styles.loginBox}>
        <form className="pe-4 w-100" onSubmit={salvar}>
          <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" style={styles.input} required />
          <input type="text" name="funcao" value={form.funcao} onChange={handleChange} placeholder="Função" style={styles.input} required />
          <input type="text" name="usuario" value={form.usuario} onChange={handleChange} placeholder="Usuário" style={styles.input} required />
          <input type="password" name="senha" value={form.senha} onChange={handleChange} placeholder="Senha" style={styles.input} required />
          <div className="d-flex justify-content-between">
            <Link to="/listadeusuarios" style={styles.button} className="me-3">Cancelar</Link>
            <button type="submit" style={styles.button}>
              {id ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
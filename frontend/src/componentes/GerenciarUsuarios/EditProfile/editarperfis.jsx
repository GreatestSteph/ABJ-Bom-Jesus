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

  const styles = {
    fundo: {
      backgroundImage: `url(${fundo})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      backgroundColor: '#e77f3c',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      maxWidth: '600px',
      width: '100%',
      color: 'white',
      fontFamily: "'Raleway', sans-serif",
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      backgroundColor: 'white',
      color: '#333',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      gap: '20px',
    },
    button: {
      flex: 1,
      backgroundColor: '#001b5e',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textDecoration: 'none',
      textAlign: 'center',
      transition: 'background-color 0.3s ease',
    },
    title: {
      fontSize: '24px',
      marginBottom: '30px',
      textAlign: 'center',
      color: 'white',
    }
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>{id ? 'Editar Usuário' : 'Novo Usuário'}</h2>
        <form onSubmit={salvar}>
          <input 
            type="text" 
            name="nome" 
            value={form.nome} 
            onChange={handleChange} 
            placeholder="Nome" 
            style={styles.input} 
            required 
          />
          <input 
            type="text" 
            name="funcao" 
            value={form.funcao} 
            onChange={handleChange} 
            placeholder="Função" 
            style={styles.input} 
            required 
          />
          <input 
            type="text" 
            name="usuario" 
            value={form.usuario} 
            onChange={handleChange} 
            placeholder="Usuário" 
            style={styles.input} 
            required 
          />
          <input 
            type="password" 
            name="senha" 
            value={form.senha} 
            onChange={handleChange} 
            placeholder="Senha" 
            style={styles.input} 
            required 
          />
          <div style={styles.buttonContainer}>
            <Link to="/listadeusuarios" style={styles.button}>
              Cancelar
            </Link>
            <button type="submit" style={styles.button}>
              {id ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

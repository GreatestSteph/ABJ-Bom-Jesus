import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import api from "../../../services/api";

export default function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomeDoProduto: '',
    tamanho: '',
    cor: '',
    quantidade: '',
    marca: '',
    descricao: '',
    custoTotal: '',
  });

  useEffect(() => {
    if (id) {
      api.get(`/produtos/${id}`)
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
        await api.put(`/produtos/${id}`, form);
      } else {
        await api.post('/produtos', form);
      }
      navigate('/listarprodutos');
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
          <input type="text" name="nomeDoProduto" value={form.nomeDoProduto} onChange={handleChange} placeholder="Exemplo: Blusa" style={styles.input} required />
          <input type="text" name="tamanho" value={form.tamanho} onChange={handleChange} placeholder="Exemplo: 36, 16, P, M, GG" style={styles.input} required />
          <input type="text" name="cor" value={form.cor} onChange={handleChange} placeholder="Branco, Preto, etc" style={styles.input} required />
          <input type="number" name="quantidade" value={form.quantidade} onChange={handleChange} placeholder="Exemplo: 10 unidades" style={styles.input} required />
          <input type="text" name="marca" value={form.marca} onChange={handleChange} placeholder="Exemplo: Pantene, Havainas, etc" style={styles.input} required />
          <input type="number" name="custoTotal" value={form.custoTotal} onChange={handleChange} placeholder="Exemplo: R$150,00 ou R$0" style={styles.input} required />
          <input type="text" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descreva o produto aqui" style={styles.input} required />
          <div className="d-flex justify-content-between">
            <Link to="/listarprodutos" style={styles.button} className="me-3">Cancelar</Link>
            <button type="submit" style={styles.button}>
              {id ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
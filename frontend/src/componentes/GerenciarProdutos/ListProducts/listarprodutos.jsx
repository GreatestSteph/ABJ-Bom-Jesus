import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import api from "../../../services/api"; 

export default function ProdutosLista() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get('/produtos')
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }, []);

  const deletarProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      await api.delete(`/produtos/${id}`); 
      setProdutos(produtos.filter(produto => produto.id !== id));
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
          <h2>Lista de Produtos</h2>
          <div className="d-flex justify-content-end mb-3">
            <Link to="/editaradicionarprodutos">+ Adicionar Produto</Link>
          </div>
          {produtos.map((produto) => (
            <div key={produto.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex gap-4">
                <p>{produto.id}</p>
                <p>{produto.nomeDoProduto}</p>
                <p>{produto.tamanho}</p>
                <p>{produto.cor}</p>
                <p>{produto.quantidade}</p>
                <p>{produto.marca}</p>
                <p>{produto.custoTotal}</p>
                <p>{produto.descricao}</p>
              </div>
              <div className="d-flex gap-2">
                <Link to={`/editaradicionarprodutos/${produto.id}`}>Editar</Link>
                <button onClick={() => deletarProduto(produto.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
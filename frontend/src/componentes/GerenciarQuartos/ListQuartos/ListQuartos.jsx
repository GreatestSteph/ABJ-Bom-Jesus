import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import api from "../../../services/api";


export default function ListQuartos() {
  // Estado para armazenar a lista de quartos
  const [quartos, setQuartos] = useState([]);

  // Efeito para carregar quartos ao montar o componente
  useEffect(() => {
    api
      .get("/quartos")
      .then((res) => setQuartos(res.data)) // Atualiza estado com dados da API
      .catch((err) => console.error("Erro ao listar quartos:", err));
  }, []); // Array vazio = executa apenas no mount

  // Função para deletar um quarto
  const deletarQuarto = async (id) => {
    // Confirmação antes de excluir
    if (!window.confirm("Tem certeza que deseja excluir este quarto?")) return;

    try {
      await api.delete(`/quartos/${id}`);
      // Remove o quarto deletado do estado local
      setQuartos((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Erro ao excluir quarto:", err);
    }
  };

  // Objeto de estilos para o componente
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
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>
        <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
                    <Link to="/hospedes" style={styles.functionNotSelected}>
                      Hóspedes
                    </Link>
                                        
                    <Link to="/historicodehospedagens" style={styles.functionNotSelected}>
                      Lista de Hospedagens
                    </Link>
                                        
                    <Link to="/bloqueios" style={styles.functionNotSelected}>
                      Bloqueios
                    </Link>

                    <Link to="/gerenciarquartos/novo" style={styles.functionNotSelected}>
                    Adicionar Quartos
                    </Link>

                    <Link to="/gerenciarquartos" style={styles.functionSelected}>
                    Listar Quartos
                    </Link>
        </div>
        <hr style={styles.hr}/>



        {/* Cabeçalhos das colunas */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={styles.table} className='mb-5 mt-5'>
              <thead>
              <tr>
                <th style={styles.th}>Número</th>
                <th style={styles.th}>Tipo</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Ações</th>
              </tr>
              </thead>
              <tbody>
              {quartos.map((q) => (
                <tr key={q.id}>
                  <td style={styles.td}>{q.numero}</td>
                  <td style={styles.td}>{q.tipo_cama}</td>
                  <td style={styles.td}>{q.status}</td>
                  <td style={{ ...styles.td, ...styles.actions }}>
                    <Link to={`/gerenciarquartos/${q.id}`} className="btn btn-sm btn-primary">Editar</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deletarQuarto(q.id)}>Excluir</button>
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

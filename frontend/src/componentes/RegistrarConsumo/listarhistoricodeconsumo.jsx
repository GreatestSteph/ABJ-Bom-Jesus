 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fundo from "../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import lupa from "../WebsiteDesign/RegisterImages/lupa.svg";
import API_URL from "../../config/api";

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
    padding: "15px",
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

export default function HistoricoDeConsumos() {
  const [consumos, setConsumos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [consumoToDelete, setConsumoToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/consumos`).then(res => res.json()),
      fetch(`${API_URL}/guests`).then(res => res.json()),
      fetch(`${API_URL}/produtos`).then(res => res.json()),
    ])
    .then(([consumosData, hospedesData, produtosData]) => {
      
      const merged = consumosData.map(c => {
        const hospede = hospedesData.find(h => h.id === c.hospedeId);
        const produto = produtosData.find(p => p.id === c.produtoId);

        return {
          ...c,
          hospede,
          produto
        };
      });

      setConsumos(merged);
    })
    .catch(err => console.error("Erro ao buscar dados:", err));
  }, []);

  const handleDeleteClick = (consumo) => {
    setConsumoToDelete(consumo);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (!consumoToDelete) return;

    fetch(`${API_URL}/consumos/${consumoToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setConsumos(consumos.filter(c => c.id !== consumoToDelete.id));
        setShowModal(false);
        setConsumoToDelete(null);
      });
  };

  const filteredConsumos = consumos.filter(c =>
    c.hospede?.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>

        {/* ==== MENU SUPERIOR ==== */}
        <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
          <Link to="/registroprodutos" style={styles.functionNotSelected}>Registrar Produtos</Link>
          <Link to="/listarprodutos" style={styles.functionNotSelected}>Pesquisar Produtos</Link>
          <Link to="/registroconsumos" style={styles.functionNotSelected}>Registrar Consumos</Link>
          <Link to="/listarconsumos" style={styles.functionSelected}>Ver Consumos</Link>
          <Link to="/gerenciarquartos/novo" style={styles.functionNotSelected}>Adicionar Quartos</Link>
          <Link to="/gerenciarquartos" style={styles.functionNotSelected}>Listar Quartos</Link>
        </div>

        <hr style={styles.hr} />

        {/* ==== PESQUISA ==== */}
        <div style={styles.searchContainer} className="mt-4 pt-3 mb-5 mx-5 px-2">
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Pesquise aqui o consumo do hospede"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.barraPesquisa}
            />

            <div style={styles.posicaoBotoes}>
              <button style={{ backgroundColor: 'rgba(231, 127, 60, 1)', padding: '10px 12px'}} className="btn">
                <img src={lupa} alt="Ícone de lupa" />
              </button>              
            </div>
          </div>
        </div>
        
        {/* ==== TABELA ==== */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={styles.table} className='mb-5'>
            <thead>
              <tr>
                <th style={styles.th}>Hospede</th>
                <th style={styles.th}>Data Nascimento</th>
                <th style={styles.th}>Produto Utilizado</th>
                <th style={styles.th}>Tamanho</th>
                <th style={styles.th}>Marca</th>
                <th style={styles.th}>Cor</th>
                <th style={styles.th}>Qtde</th>
                <th style={styles.th}>Data Consumo</th>
                <th style={styles.th}>Reutilizavel</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredConsumos.map((consumo) => (
                <tr key={consumo.id}>

                  <td style={styles.td}>{consumo.hospede?.nome}</td>

                  <td style={styles.td}>
                    {new Date(consumo.hospede?.data_nascimento).toLocaleDateString("pt-BR")}
                  </td>

                  <td style={styles.td}>{consumo.produto?.nomeDoProduto}</td>
                  <td style={styles.td}>{consumo.produto?.tamanho}</td>
                  <td style={styles.td}>{consumo.produto?.marca}</td>
                  <td style={styles.td}>{consumo.produto?.cor}</td>
                  <td style={styles.td}>{consumo.quantidade}</td>

                  <td style={styles.td}>
                    {new Date(consumo.dataConsumo).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>

                  <td style={styles.td}>{consumo.naoReutilizavel ? "Sim" : "Não"}</td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <Link to={`/registroconsumos/${consumo.id}`} className="btn btn-sm btn-primary">Editar</Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteClick(consumo)}>
                        Excluir
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ==== MODAL EXCLUSÃO ==== */}
        {showModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h4>Confirmar Exclusão</h4>
              <p>Tem certeza que deseja excluir este consumo?</p>

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

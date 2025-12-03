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
    minHeight: '100vh',
    paddingTop: '180px',
    paddingBottom: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  },
};

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
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

export default function HistoricoDeConsumos() {
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [itemIsReutilizavel, setItemIsReutilizavel] = useState(false);
  const [consumos, setConsumos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [consumoToDelete, setConsumoToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const CONSUMOS_PER_PAGE = 10;

  
  // retorna true se o consumo representa "reutilizável"
  const isReutilizavelFlag = (consumo) => {
    // tenta ler o campo no próprio consumo, ou no objeto produto (caso venha diferente)
    const raw = consumo?.naoReutilizavel ?? consumo?.produto?.naoReutilizavel;

    // normaliza pra string (cobre: 1, "1", true, "true")
    if (raw === undefined || raw === null) return false;
    const s = String(raw).toLowerCase().trim();
    return s === "1" || s === "true" || s === "sim" || s === "s";
  };


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
    const reutilizavel = isReutilizavelFlag(consumo);

    if (reutilizavel) {
      setItemIsReutilizavel(true);
      setShowReturnModal(true); 
    } else {
      setItemIsReutilizavel(false);
      setShowModal(true);
    }
  };



  const devolverProduto = async () => {
    if (!consumoToDelete) return;

    const produtoId = consumoToDelete.produtoId ?? consumoToDelete.produto?.id;
    // pega quantidade atual do produto de forma segura
    const quantidadeAtual = Number(consumoToDelete.produto?.quantidade ?? 0);

    const novaQuantidade = quantidadeAtual + Number(consumoToDelete.quantidade ?? 1);

    // pega o objeto produto completo se existir
    const produtoAtual = consumoToDelete.produto ?? {};

    await fetch(`${API_URL}/produtos/${produtoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...produtoAtual,
        quantidade: novaQuantidade,
      }),
    });
  };



  const handleDelete = async () => {
    if (!consumoToDelete) return;
    await fetch(`${API_URL}/consumos/${consumoToDelete.id}`, {
      method: "DELETE",
    });
    setConsumos(consumos.filter(c => c.id !== consumoToDelete.id));
    setShowModal(false);
    setConsumoToDelete(null);
  };



  const handleReturnChoice = async (devolveu) => {
    if (!consumoToDelete) return;

    try {
      if (devolveu) {
        await devolverProduto();
      }

      // deleta o consumo
      await fetch(`${API_URL}/consumos/${consumoToDelete.id}`, {
        method: "DELETE",
      });

      setConsumos(prev => prev.filter(c => c.id !== consumoToDelete.id));
    } catch (err) {
      console.error("Erro ao deletar/devolver:", err);
      alert("Erro ao processar exclusão. Veja o console.");
    } finally {
      setShowReturnModal(false);
      setShowModal(false);
      setConsumoToDelete(null);
      setItemIsReutilizavel(false);
    }
  };



  const filteredConsumos = consumos.filter(c =>
    c.hospede?.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredConsumos.length / CONSUMOS_PER_PAGE) || 1;
  const paginatedConsumos = filteredConsumos.slice(
    (currentPage - 1) * CONSUMOS_PER_PAGE,
    currentPage * CONSUMOS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <main style={styles.fundo}>
      <div style={styles.aroundListBox}>

        {/* ==== MENU SUPERIOR ==== */}
        <div style={{borderRadius: '12px'}} className='d-flex flex-start'>
          <Link to="/registroprodutos" style={styles.functionNotSelected}>Registrar Produtos</Link>
          <Link to="/listarprodutos" style={styles.functionNotSelected}>Pesquisar Produtos</Link>
          <Link to="/registroconsumos" style={styles.functionNotSelected}>Registrar Consumos</Link>
          <Link to="/listarconsumos" style={styles.functionSelected}>Ver Consumos</Link>
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
              {paginatedConsumos.map((consumo) => (
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* ==== DEVOLUÇÃO ==== */}
        {showReturnModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h4>Produto Reutilizável</h4>
              <p>O hóspede devolveu o produto?</p>

              <div style={styles.modalButtons}>
                <button className="btn btn-secondary" onClick={() => setShowReturnModal(false)}>Cancelar</button>
                <button className="btn btn-danger" onClick={() => handleReturnChoice(false)}>Não, excluir</button>
                <button className="btn btn-success" onClick={() => handleReturnChoice(true)}>Sim, excluir</button>
              </div>
            </div>
          </div>
        )}

        {/* ==== EXCLUSÃO ==== */}
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

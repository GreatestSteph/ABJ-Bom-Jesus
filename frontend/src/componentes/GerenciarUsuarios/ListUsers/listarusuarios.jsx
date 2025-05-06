import React from "react"; 
import { Link } from "react-router-dom"; 
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png"; 

export default function UserList() {    
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
            <div class style={styles.aroundListBox} className="d-flex justify-content-between">
                <div className="d-flex flex-row px-4 py-3">

                  `Labels da tabela`
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-row justify-content-between">
                        <p>ID</p> 
                        <p>Nome:</p>
                        <p>Função:</p>
                        <p>Usuário:</p>
                        <p>Senha:</p>
                      </div>
                      <div>
                        <p>Ações:</p> 
                      </div>
                    </div>
                    <hr className='mb-3'></hr>

                    `Listagem de usuários`
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-row justify-content-between">
                        <p>"Carrega o ID aqui"</p> 
                        <p>"Carrega o nome aqui"</p>
                        <p>"Função do funcionario"</p>
                        <p>"Usuário do funcionario"</p>
                        <p>"Senha do funcionario"</p>
                      </div>
                      <div>
                        <Link to="/editaradicionarperfis" className="me-3">Editar</Link>
                        <button className="me-3">Excluir</button>
                      </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

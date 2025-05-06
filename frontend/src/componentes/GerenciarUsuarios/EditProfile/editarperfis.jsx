import React from "react"; 
import { Link } from "react-router-dom"; 
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png"; 

export default function EditProfiles() {    
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
        loginBox: {
            backgroundColor: '#e77f3c', 
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            maxWidth: '750px',
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontFamily: "'Raleway', sans-serif",
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
        },
        button: {
            backgroundColor: '#001b5e',
            color: 'white',
            padding: '12px',
            width: '100%',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            marginTop: '20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            textDecoration: 'none',
        },
    };

    return (
        <main style={styles.fundo}>
            <div class style={styles.loginBox} className="d-flex justify-content-between">
                <div className="pe-4">
                  <input type="text" placeholder="Foto" style={styles.input} />
                  <input type="text" placeholder="Nome" style={styles.input} />
                </div>
                <div className="ps-5">
                  <input type="text" placeholder="Função" style={styles.input} />
                  <input type="text" placeholder="Usuário" style={styles.input} />
                  <input type="password" placeholder="Senha" style={styles.input} />
                  <div className="d-flex justify-content-between">
                    <Link to="/listadeusuarios" style={styles.button} className="me-3">Cancelar</Link>
                    <Link to="/listadeusuarios" style={styles.button} className="ms-3">o</Link>
                  </div>
                </div>
            </div>
        </main>
    );
}

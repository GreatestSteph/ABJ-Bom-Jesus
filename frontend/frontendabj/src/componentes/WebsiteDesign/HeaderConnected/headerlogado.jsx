import React from "react"; 
import { Link } from "react-router-dom"; 
import logoABL from "../HeaderandFooterImages/logoABL.png"; 
import iconeAjuda from "../HeaderandFooterImages/iconeAjuda.svg"; 

export default function Headerlogado() {
    const estiloHeader = {
        fundodoHeader: {
            backgroundColor: 'rgb(113, 175, 230)',
            width: '100%',
            position: 'fixed',
            zIndex: 100,
            padding: '10px 20px',
            height: '70px', 
        },
        Entrar: {
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
        },        
    };

    return (
        <header className="d-flex justify-content-between align-items-center" style={estiloHeader.fundodoHeader}>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap" rel="stylesheet" />
            
            <div className="d-flex justify-content-between flex-row">
                <div>
                    <img src={logoABL}></img>
                    <Link to="/perfil" style={estiloHeader.Entrar}>Perfil</Link>
                </div>
                <Link to="/blah" style={estiloHeader.Entrar}>blah</Link>
                <Link to="/blah" style={estiloHeader.Entrar}>blah</Link>
                <Link to="/blah" style={estiloHeader.Entrar}>blah</Link>
                <div>
                    <img src={iconeAjuda}></img>
                    <p>Ajuda</p>
                </div>
            </div>
        </header>
    );
}
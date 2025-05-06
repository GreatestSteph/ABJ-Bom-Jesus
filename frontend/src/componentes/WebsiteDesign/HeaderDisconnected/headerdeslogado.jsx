import React from "react"; 
import { Link } from "react-router-dom"; 
import logoABL from "../HeaderandFooterImages/logoABL.png"; 
import iconeAjuda from "../HeaderandFooterImages/iconeAjuda.svg"; 

export default function Headerdeslogado() {
    const estiloHeader = {
        fundodoHeader: {
            backgroundColor: 'rgb(255, 255, 255)',
            width: '100%',
            position: 'fixed',
            zIndex: 100,
            padding: '10px 20px',
            height: '70px', 
        },
        navItem: {
            color: 'rgb(21, 75, 122)',
            textDecoration: 'none',
            fontWeight: 'bold',
            paddingLeft: '30px',
            paddingRight: '30px',
            paddingBottom: '22px',
            borderBottom: '5px solid rgb(255, 140, 46)',
        },      
        logo: {
            width: '70px',
            marginRight: '30px',
        },  
        ajudaeicone: {
            color: 'rgb(21, 75, 122)',
            textDecoration: 'none',
            fontWeight: 'bold',
            paddingLeft: '5px',
            paddingRight: '5px',
        }
    };

    return (
        <header className="d-flex justify-content-between align-items-center" style={estiloHeader.fundodoHeader}>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap" rel="stylesheet" />
            
            <div>
                <img src={logoABL} alt="Logo ABL" style={estiloHeader.logo} />
                <Link to="/login" style={estiloHeader.navItem}>Entrar </Link>
            </div>

            <div className="d-flex align-items-center">
                <img src={iconeAjuda} alt="Ajuda" style={estiloHeader.icone} />
                <Link to="/ajuda" style={estiloHeader.ajudaeicone}> Ajuda
                </Link>
            </div>
        </header>
    );
}
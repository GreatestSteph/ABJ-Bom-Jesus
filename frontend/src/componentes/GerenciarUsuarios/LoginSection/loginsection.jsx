import React from "react"; 
import { Link } from "react-router-dom"; 
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png"; 
import logoMaior from "../LoginSection/ImagensTelaLogin/logoMaiorLogin.png"; 

export default function LoginSection() {    
    const styles  = {
        fundo: {
            backgroundImage: `url(${fundo})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            paddingTop: '180px',
            paddingBottom: '180px',
            maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.98) 695px, transparent 115%)',
        },        
        logoCircle: {
            marginBottom: "30px",
        },
        button: {
            width: '230px',
            padding: "12px 30px",
            fontSize: "16px",
            backgroundColor: "rgba(248, 113, 3, 0.98)",
            color: "white",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
        },
        buttonHover: {
            backgroundColor: "#0d3050",
        }
    };

    return (
        <main style={styles.fundo}>
            <div className='d-flex justify-content-center' style={styles.logoCircle}>
                <img src={logoMaior} alt="Logo" style={styles.logoImage} />
            </div>
            <div className='d-flex justify-content-center'>
                <Link className='d-flex justify-content-center'  to="/login" style={styles.button}>Entrar</Link>
            </div>
        </main>
    );
}
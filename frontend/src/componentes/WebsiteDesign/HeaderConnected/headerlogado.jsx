import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoABL from "../HeaderandFooterImages/logoABL.png";
import iconeAjuda from "../HeaderandFooterImages/iconeAjuda.svg";
import ContextoUsuario from "../../../services/context";
import { useContext } from "react";


export default function Headerlogado() {
    const [usuarioGlobal, setUsuarioGlobal] = useContext(ContextoUsuario);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [mostrarMenuAjuda, setMostrarMenuAjuda] = useState(false);
    const ajudaRef = useRef(null);

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

    const navStyle = (paths) => ({
        ...estiloHeader.navItem,
        borderBottomColor: paths.includes(currentPath) ? 'rgb(255, 140, 46)' : 'white'
    });

    // Fechar o menu se clicar fora
    useEffect(() => {
        const handleClickFora = (e) => {
            if (ajudaRef.current && !ajudaRef.current.contains(e.target)) {
                setMostrarMenuAjuda(false);
            }
        };
        document.addEventListener("mousedown", handleClickFora);
        return () => {
            document.removeEventListener("mousedown", handleClickFora);
        };
    }, []);

    const handleLogout = () => {
        setUsuarioGlobal({ nome: "", logado: false }); // Desloga
        navigate("/login");
    };

    return (
        <header className="d-flex justify-content-between align-items-center" style={estiloHeader.fundodoHeader}>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap" rel="stylesheet" />

            <div>
                <img src={logoABL} alt="Logo ABL" style={estiloHeader.logo} />

                <Link to="/listadeusuarios" style={navStyle(["/listadeusuarios", "/registrousuarios"])}>
                    Perfis
                </Link>

                <Link to="/hospedes" style={navStyle(["/hospedes", "/hospedes/cadastrar"])}>
                    Gerenciar Hóspedes
                </Link>

                <Link to="/listarprodutos" style={navStyle(["/listarprodutos", "/registroprodutos"])}>
                    Gerenciar Consumo
                </Link>

                <Link to="/ocorrencias" style={navStyle(["/ocorrencias", "/ocorrencias/cadastrar"])}>
                    Gerenciar Ocorrências
                </Link>

                <Link to="/relatorios" style={navStyle(["/relatorios"])}>
                    Relatórios e Estatísticas
                </Link>
            </div>

            <div className="position-relative" ref={ajudaRef}>
                <div
                    className="d-flex align-items-center"
                    onClick={() => setMostrarMenuAjuda(!mostrarMenuAjuda)}
                    style={{ cursor: 'pointer' }}
                >
                    <img src={iconeAjuda} alt="Ajuda" style={estiloHeader.icone} />
                    <span style={estiloHeader.ajudaeicone}>Ajuda</span>
                </div>

                {mostrarMenuAjuda && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        backgroundColor: 'white',
                        boxShadow: '0px 2px 5px rgba(0,0,0,0.15)',
                        borderRadius: '4px',
                        padding: '8px 0',
                        marginTop: '8px',
                        zIndex: 200,
                        minWidth: '140px'
                    }}>
                        <div
                            style={{
                                padding: '10px 20px',
                                color: '#154B7A',
                                fontWeight: 'bold',
                                cursor: 'default'
                            }}
                        >
                            Tutorial
                        </div>
                        <div
                            onClick={handleLogout}
                            style={{
                                padding: '10px 20px',
                                color: '#154B7A',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Deslogar
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

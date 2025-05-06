import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

const styles = {
  footer: {
    backgroundColor: 'rgba(0, 27, 94, 1)',
    color: 'white',
    fontFamily: "'Raleway', sans-serif",
    backgroundSize: 'cover',
    maskImage: 'linear-gradient(to top, rgba(255, 255, 255, 0.98) 285px, transparent 125%)',
  },
  column: {
    minWidth: '200px',
    padding: '10px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  link: {
    fontSize: '14px',
    margin: '5px 0',
    cursor: 'pointer',
  },
  icons: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  icon: {
    fontSize: '20px',
    cursor: 'pointer',
  },
  container: {
    padding: '95px 20px',
    maxWidth: '1300px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
          <h5 style={styles.title}>INSTITUCIONAL</h5>
          <p style={styles.link}>&#8250; Nossa história</p>
          <p style={styles.link}>&#8250; Serviços e ações</p>
        </div>
        <div style={styles.column}>
          <h5 style={styles.title}>ADMINISTRATIVO</h5>
          <p style={styles.link}>&#8250; Registro de Hóspedes</p>
          <p style={styles.link}>&#8250; Registrar Consumo</p>
          <p style={styles.link}>&#8250; Relatar Comportamento</p>
        </div>
        <div style={styles.column}>
          <h5 style={styles.title}>PESQUISA</h5>
          <p style={styles.link}>&#8250; Relatórios Comparativos</p>
          <p style={styles.link}>&#8250; Pesquisar Hóspedes</p>
        </div>
        <div style={styles.column}>
          <h5 style={styles.title}>CONTATO SUPORTE</h5>
          <div style={styles.icons} className="mt-4">
            <FaWhatsapp style={styles.icon} className="me-4"/>
            <FaFacebook style={styles.icon} className="me-4"/>
            <FaInstagram style={styles.icon}/>
          </div>
        </div>
      </div>
    </footer>
  );
}

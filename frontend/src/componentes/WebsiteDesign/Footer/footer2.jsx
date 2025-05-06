import React from "react";

const styles = {
  footer2: {
    backgroundColor: 'rgb(245, 240, 225)',
    color: 'rgba(235, 106, 0, 0.98)',
    fontFamily: "'Raleway', sans-serif",
    backgroundSize: 'cover',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
};

export default function Footer2() {
  return (
    <div style={styles.footer2}>
      <div style={styles.container}>
        <p className="pt-4 px-5">Política de cookies | Política de privacidade</p>
        <p className="pt-md-4 px-5">Todos os direitos reservados © 2025 - Unoeste</p>
      </div>
    </div>
  );
}

import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContextoUsuario from "../../../services/context"; // Caminho correto conforme sua estrutura
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import API_URL from "../../../config/api";


export default function LoginSection2() {
  const [usuarioInput, setUsuarioInput] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [usuarioGlobal, setUsuarioGlobal] = useContext(ContextoUsuario); 

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  const handleLogin = () => {
    if (usuarioInput === "ti" && senha === "12345") {
      setUsuarioGlobal({
        nome: usuarioInput,
        cargo: "TI",
        logado: true
      });
      navigate("/historicodehospedagens");
      return;
    }

    const userFound = users.find(
      (user) => user.usuario === usuarioInput && user.senha === senha
    );

    if (userFound) {
      setUsuarioGlobal({
        nome: userFound.usuario,
        cargo: userFound.funcao,
        logado: true
      });
      navigate("/historicodehospedagens");
      return
    } else {
      setErro("Usuário ou senha inválidos.");
    }
  };


  const styles = {
    fundo: {
      backgroundImage: `url(${fundo})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100%",
      paddingTop: "180px",
      paddingBottom: "180px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maskImage:
        "linear-gradient(to bottom, rgba(255, 255, 255, 0.98) 695px, transparent 115%)",
    },
    loginBox: {
      backgroundColor: "#fff",
      border: "2px solid rgb(228, 182, 130)",
      borderRadius: "20px",
      padding: "40px 40px 20px 40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
      color: "rgb(10, 67, 153)",
      fontFamily: "'Raleway', sans-serif",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "2px solid rgb(10, 67, 153)",
      fontSize: "14px",
      outline: "none",
    },
    button: {
      backgroundColor: "rgb(226, 136, 32)",
      color: "white",
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "20px",
      transition: "background-color 0.3s ease",
    },
    error: {
      color: "red",
      fontSize: "14px",
      marginTop: "25px",
    },
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.loginBox}>
        <h3>Bem-vindo</h3>
        <p>Entre para continuar...</p>
        <input
          type="text"
          placeholder="Usuário"
          value={usuarioInput}
          onChange={(e) => setUsuarioInput(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Entrar
        </button>
        {erro && <p style={styles.error}>{erro}</p>}
      </div>
    </main>
  );
}

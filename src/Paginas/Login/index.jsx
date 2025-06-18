import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const aoEfetuarLogin = (e) => {
    e.preventDefault();
    if (!usuario || !senha) {
      setErro("Preencha todos os campos.");
    } else if (usuario === "admin" && senha === "1234") {
      setErro("");
      navigate("/admin");
    } else {
      setErro("Usuário ou senha inválidos.");
    }
  };

  const aoCadastrar = () => {
    navigate("/cadastro");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={aoEfetuarLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
        <button className="botao-cadastrar" onClick={aoCadastrar}>
          Cadastrar
        </button>
        {erro && <div className="erro">{erro}</div>}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadrastroUsuario.css";

function CadastroUsuario() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();

    if (user && password) {
      // Aqui futuramente você poderá enviar os dados para um backend

      // Mensagem temporária
      setMensagem("Usuário cadastrado com sucesso! Redirecionando...");

      // Limpa os campos
      setUser("");
      setPassword("");

      // Redireciona automaticamente para login após 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setMensagem("Preencha todos os campos!");
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default CadastroUsuario;

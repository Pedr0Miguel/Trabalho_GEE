import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navegar = useNavigate();

  const handleCadastrarClick = () => {
    navegar("/cadastro"); // Navega para a rota de cadastro
  };

  return (
    <div className="login-container">
      {/* ... outros elementos do login ... */}
      <button className="botao-cadastrar" onClick={handleCadastrarClick}>
        Cadastrar
      </button>
    </div>
  );
}

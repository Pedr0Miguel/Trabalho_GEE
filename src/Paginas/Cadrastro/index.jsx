import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormularioCadastro from "./Componentes/FormularioCadastro";
import Mensagem from "./Componentes/Mensagem";

import "./Cadastro.css";

export default function Cadastro() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navegar = useNavigate();

  const aoCadastrar = (e) => {
    e.preventDefault();

    if (usuario && senha) {
      setMensagem("Usuário cadastrado com sucesso! Redirecionando...");

      setUsuario("");
      setSenha("");

      setTimeout(() => {
        navegar("/");
      }, 2000);
    } else {
      setMensagem("Preencha todos os campos!");
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuário</h2>

      <FormularioCadastro
        usuario={usuario}
        senha={senha}
        aoMudarUsuario={setUsuario}
        aoMudarSenha={setSenha}
        aoEnviar={aoCadastrar}
      />

      {mensagem && <Mensagem texto={mensagem} />}
    </div>
  );
}

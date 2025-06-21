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

  const aoCadastrar = async (e) => {
    e.preventDefault();

    if (usuario && senha) {
      try {
        const response = await fetch('http://localhost:3001/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: usuario,
            email: usuario + '@exemplo.com',
            user: usuario,
            pwd: senha,
            level: 'user'
          })
        });
        if (!response.ok) {
          const data = await response.json();
          setMensagem(data.error || 'Erro ao cadastrar usuário.');
          return;
        }
        setMensagem('Usuário cadastrado com sucesso! Redirecionando...');
        setUsuario("");
        setSenha("");
        setTimeout(() => {
          navegar("/");
        }, 2000);
      } catch (err) {
        setMensagem('Erro ao conectar com o servidor.');
      }
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

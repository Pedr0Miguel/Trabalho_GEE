import React from 'react';
import CampoEntrada from './CampoEntrada';

export default function FormularioEntrar({
  usuario,
  senha,
  aoMudarUsuario,
  aoMudarSenha,
  aoEnviar
}) {
  return (
    <form onSubmit={aoEnviar}>
      <CampoEntrada
        type="text"
        placeholder="Usuário"
        valor={usuario}
        aoMudar={aoMudarUsuario}
      />
      <CampoEntrada
        type="password"
        placeholder="Senha"
        valor={senha}
        aoMudar={aoMudarSenha}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

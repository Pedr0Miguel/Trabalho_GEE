import React, { useState } from "react";
import "./Create.css";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [level, setLevel] = useState("user");
  const [status, setStatus] = useState("on");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      user,
      pwd,
      level,
      status,
    };

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar usuário");

      setMensagem("Usuário criado com sucesso!");
      setName("");
      setEmail("");
      setUser("");
      setPwd("");
      setLevel("user");
      setStatus("on");
    } catch (err) {
      setMensagem(`Erro: ${err.message}`);
    }
  };

  return (
    <div className="usuario-content">
      <h2 className="admin-title">Cadastrar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="user">Usuário</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="on">Ativo</option>
          <option value="off">Inativo</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && (
        <div className={`mensagem ${mensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default Create; 
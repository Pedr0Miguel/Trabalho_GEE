import React, { useState } from "react";
import "./Create.css";

const Create = () => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [necessidades, setNecessidades] = useState("");
  const [estatus, setEstatus] = useState("on");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      nome,
      idade,
      telefone,
      necessidades,
      estatus,
    };

    try {
      // Substitua a URL abaixo pela sua rota real de API
      const res = await fetch("/api/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar aluno");

      setMensagem("Aluno criado com sucesso!");
      // Limpa os campos após sucesso
      setId("");
      setNome("");
      setIdade("");
      setTelefone("");
      setNecessidades("");
      setEstatus("on");
    } catch (err) {
      setMensagem(`Erro: ${err.message}`);
    }
  };

  return (
    <div className="create-container horizontal">
      <h2>Criar Aluno</h2>
      <form onSubmit={handleSubmit} className="create-form-horizontal">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="idade">Idade</label>
            <input
              id="idade"
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="necessidades">Necessidades Especiais</label>
            <input
              id="necessidades"
              type="text"
              value={necessidades}
              onChange={(e) => setNecessidades(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="estatus">Estatus</label>
            <select
              id="estatus"
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
              required
            >
              <option value="on">Ligado</option>
              <option value="off">Desligado</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-submit">
          Salvar
        </button>
      </form>
      {mensagem && (
        <p
          className={`form-message ${
            mensagem.includes("sucesso") ? "success" : "error"
          }`}
        >
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default Create;

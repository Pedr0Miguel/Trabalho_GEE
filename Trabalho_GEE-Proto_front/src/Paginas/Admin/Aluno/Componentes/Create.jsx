import React, { useState } from "react";
import "./Create.css";
import { applyPhoneMask, removePhoneMask } from "../../../../utils/phoneMask";

const Create = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [special_needs, setSpecialNeeds] = useState("");
  const [parents, setParents] = useState("");
  const [status, setStatus] = useState("on");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      name,
      age,
      phone_number: removePhoneMask(phone_number), // Remove a máscara antes de enviar
      special_needs,
      parents,
      status,
    };

    try {
      const res = await fetch("/api/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar aluno");

      setMensagem("Aluno criado com sucesso!");
      setId("");
      setName("");
      setAge("");
      setPhoneNumber("");
      setSpecialNeeds("");
      setParents("");
      setStatus("on");
    } catch (err) {
      setMensagem(`Erro: ${err.message}`);
    }
  };

  const handleTelefoneChange = (e) => {
    const maskedValue = applyPhoneMask(e.target.value);
    setPhoneNumber(maskedValue);
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
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Idade</label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Telefone</label>
            <input
              id="phone_number"
              type="tel"
              value={phone_number}
              onChange={handleTelefoneChange}
              placeholder="(11) 99999-9999"
              maxLength="15"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="parents">Responsáveis</label>
            <input
              id="parents"
              type="text"
              value={parents}
              onChange={(e) => setParents(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="special_needs">Necessidades Especiais</label>
            <input
              id="special_needs"
              type="text"
              value={special_needs}
              onChange={(e) => setSpecialNeeds(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="on">Ativo</option>
              <option value="off">Inativo</option>
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


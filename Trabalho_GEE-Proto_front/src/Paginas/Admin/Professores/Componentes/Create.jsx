import React, { useState } from "react";
import "./Create.css";
import { applyPhoneMask, removePhoneMask } from "../../../../utils/phoneMask";

const Create = () => {
  const [name, setName] = useState("");
  const [school_disciplines, setSchoolDisciplines] = useState("");
  const [contact, setContact] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("on");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      school_disciplines,
      contact,
      phone_number: removePhoneMask(phone_number), // Remove a máscara antes de enviar
      status,
    };

    try {
      const res = await fetch("/api/professores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar professor");

      setMensagem("Professor criado com sucesso!");
      setName("");
      setSchoolDisciplines("");
      setContact("");
      setPhoneNumber("");
      setStatus("on");
    } catch (err) {
      setMensagem(`Erro: ${err.message}`);
    }
  };

  const handlePhoneChange = (e) => {
    const maskedValue = applyPhoneMask(e.target.value);
    setPhoneNumber(maskedValue);
  };

  return (
    <div className="professor-content">
      <h2 className="admin-title">Cadastrar Professor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Disciplinas"
          value={school_disciplines}
          onChange={(e) => setSchoolDisciplines(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contato"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={phone_number}
          onChange={handlePhoneChange}
          maxLength="15"
          required
        />
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
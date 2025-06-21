import React, { useState } from "react";
import "./Create.css";

const Create = () => {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [date, setDate] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      description,
      comments,
      date,
    };

    try {
      const res = await fetch("/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar evento");

      setMensagem("Evento criado com sucesso!");
      setId("");
      setDescription("");
      setComments("");
      setDate("");
    } catch (err) {
      setMensagem(`Erro: ${err.message}`);
    }
  };

  return (
    <div className="evento-content">
      <h2 className="admin-title">Cadastrar Evento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Comentários"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Data"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
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
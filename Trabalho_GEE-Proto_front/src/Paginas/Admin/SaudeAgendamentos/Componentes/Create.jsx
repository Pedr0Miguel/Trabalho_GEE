import React, { useState } from "react";
import "./Create.css";

const Create = () => {
  const [id, setId] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [comments, setComments] = useState("");
  const [date, setDate] = useState("");
  const [student, setStudent] = useState("");
  const [professional, setProfessional] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      specialty,
      comments,
      date,
      student,
      professional,
    };

    try {
      const res = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar agendamento");

      setMensagem("Agendamento criado com sucesso!");
      setId("");
      setSpecialty("");
      setComments("");
      setDate("");
      setStudent("");
      setProfessional("");
    } catch (err) {
      setMensagem(`Erro: ${err.message}`);
    }
  };

  return (
    <div className="create-container horizontal">
      <h2>Criar Agendamento</h2>
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
            <label htmlFor="specialty">Especialidade</label>
            <input
              id="specialty"
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="student">Estudante</label>
            <input
              id="student"
              type="text"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="professional">Profissional</label>
            <input
              id="professional"
              type="text"
              value={professional}
              onChange={(e) => setProfessional(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Data</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="comments">Comentários</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="3"
              required
            />
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
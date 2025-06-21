import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Create.css"; // Reaproveita o CSS horizontal do Create
import { applyPhoneMask, removePhoneMask } from "../../../../utils/phoneMask";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professorId, setProfessorId] = useState("");
  const [name, setName] = useState("");
  const [school_disciplines, setSchoolDisciplines] = useState("");
  const [contact, setContact] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("on");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const res = await fetch(`/api/professores/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        setProfessorId(data._id || data.id);
        setName(data.name);
        setSchoolDisciplines(data.school_disciplines);
        setContact(data.contact);
        setPhoneNumber(applyPhoneMask(data.phone_number || "")); // Aplica máscara ao carregar
        setStatus(data.status);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessor();
  }, [id]);

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
      // Usa o ID do parâmetro da URL diretamente
      const res = await fetch(`/api/professores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ao atualizar professor: ${text}`);
      }
      setMensagem("Atualização bem-sucedida!");
      setTimeout(() => navigate("/admin/professores"), 1000);
    } catch (err) {
      setMensagem(`Falha: ${err.message}`);
    }
  };

  const handlePhoneChange = (e) => {
    const maskedValue = applyPhoneMask(e.target.value);
    setPhoneNumber(maskedValue);
  };

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div className="professor-content">
      <h2 className="admin-title">Atualizar Professor</h2>
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
        <button type="submit">Atualizar</button>
      </form>
      {mensagem && (
        <div className={`mensagem ${mensagem.includes('bem-sucedida') ? 'sucesso' : 'erro'}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default Update; 
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Create.css"; // Reaproveita o CSS horizontal do Create
import { applyPhoneMask, removePhoneMask } from "../../../../utils/phoneMask";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alunoId, setAlunoId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [special_needs, setSpecialNeeds] = useState("");
  const [parents, setParents] = useState("");
  const [status, setStatus] = useState("on");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const res = await fetch(`/api/alunos/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        setAlunoId(data._id || data.id);
        setName(data.name);
        setAge(data.age);
        setPhoneNumber(applyPhoneMask(data.phone_number || "")); // Aplica máscara ao carregar
        setSpecialNeeds(data.special_needs);
        setParents(data.parents);
        setStatus(data.status);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAluno();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      age,
      phone_number: removePhoneMask(phone_number), // Remove a máscara antes de enviar
      special_needs,
      parents,
      status,
    };
    try {
      // Usa o ID do parâmetro da URL diretamente
      const res = await fetch(`/api/alunos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ao atualizar aluno: ${text}`);
      }
      setMensagem("Atualização bem-sucedida!");
      setTimeout(() => navigate("/admin/alunos"), 1000);
    } catch (err) {
      setMensagem(`Falha: ${err.message}`);
    }
  };

  const handleTelefoneChange = (e) => {
    const maskedValue = applyPhoneMask(e.target.value);
    setPhoneNumber(maskedValue);
  };

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div className="create-container horizontal">
      <h2>Editar Aluno</h2>
      <form onSubmit={handleSubmit} className="create-form-horizontal">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              id="id"
              type="text"
              value={alunoId}
              onChange={(e) => setAlunoId(e.target.value)}
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
          Atualizar
        </button>
      </form>
      {mensagem && (
        <p
          className={`form-message ${
            mensagem.includes("sucesso") || mensagem.includes("bem-sucedida")
              ? "success"
              : "error"
          }`}
        >
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default Update;


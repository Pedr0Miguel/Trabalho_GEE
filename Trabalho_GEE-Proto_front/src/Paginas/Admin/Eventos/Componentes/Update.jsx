import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Create.css"; // Reaproveita o CSS horizontal do Create

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventoId, setEventoId] = useState("");
  const [eventoIdField, setEventoIdField] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [date, setDate] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await fetch(`/api/eventos/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        setEventoId(data._id || data.id);
        setEventoIdField(data.id);
        setDescription(data.description);
        setComments(data.comments);
        setDate(data.date);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvento();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: eventoIdField,
      description,
      comments,
      date,
    };
    try {
      // Usa o ID do parâmetro da URL diretamente
      const res = await fetch(`/api/eventos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ao atualizar evento: ${text}`);
      }
      setMensagem("Atualização bem-sucedida!");
      setTimeout(() => navigate("/admin/eventos"), 1000);
    } catch (err) {
      setMensagem(`Falha: ${err.message}`);
    }
  };

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div className="evento-content">
      <h2 className="admin-title">Atualizar Evento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={eventoIdField}
          onChange={(e) => setEventoIdField(e.target.value)}
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
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Create.css"; // Reaproveita o CSS horizontal do Create

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alunoId, setAlunoId] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [necessidades, setNecessidades] = useState("");
  const [estatus, setEstatus] = useState("on");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const res = await fetch(`/api/alunos/${id}`);
        if (!res.ok) return; // Não faz nada se não for ok
        const data = await res.json();
        setAlunoId(data.id);
        setNome(data.nome);
        setIdade(data.idade);
        setTelefone(data.telefone);
        setNecessidades(data.necessidades);
        setEstatus(data.estatus);
      } catch (err) {
        // Apenas loga no console, não mostra mensagem na tela
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
      id: alunoId,
      nome,
      idade,
      telefone,
      necessidades,
      estatus,
    };

    try {
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

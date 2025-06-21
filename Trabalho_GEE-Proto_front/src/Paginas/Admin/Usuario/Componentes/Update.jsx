import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Create.css"; // Reaproveita o CSS horizontal do Create

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuarioId, setUsuarioId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [level, setLevel] = useState("user");
  const [status, setStatus] = useState("on");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`/api/usuarios/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        setUsuarioId(data._id || data.id);
        setName(data.name);
        setEmail(data.email);
        setUser(data.user);
        setPwd(data.pwd);
        setLevel(data.level);
        setStatus(data.status);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [id]);

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
      // Usa o ID do parâmetro da URL diretamente
      const res = await fetch(`/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ao atualizar usuário: ${text}`);
      }
      setMensagem("Atualização bem-sucedida!");
      setTimeout(() => navigate("/admin/usuarios"), 1000);
    } catch (err) {
      setMensagem(`Falha: ${err.message}`);
    }
  };

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div className="usuario-content">
      <h2 className="admin-title">Atualizar Usuário</h2>
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
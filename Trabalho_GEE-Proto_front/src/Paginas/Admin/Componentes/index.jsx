import React from "react";
import { useNavigate } from "react-router-dom";

function AdminIndex() {
  const navigate = useNavigate();

  return (
    <div className="cards-container">
      <div className="card" onClick={() => navigate("/admin/professores")}>
        <h2>Cadastro de Professores</h2>
        <p>Gerencie os professores.</p>
      </div>

      <div className="card" onClick={() => navigate("/admin/alunos")}>
        <h2>Cadastro de Alunos</h2>
        <p>Gerencie os alunos.</p>
      </div>

      <div className="card" onClick={() => navigate("/admin/eventos")}>
        <h2>Cadastro de Eventos</h2>
        <p>Gerencie os eventos.</p>
      </div>

      <div
        className="card"
        onClick={() => navigate("/admin/saudeagendamentos")}
      >
        <h2>Agendamentos de Saúde</h2>
        <p>Gerencie os Agendamentos de Saúde.</p>
      </div>

      <div
        className="card"
        onClick={() => navigate("/admin/saudeprofissionais")}
      >
        <h2>Profissionais de Saúde</h2>
        <p>Gerencie os profissionais da saúde.</p>
      </div>

      <div className="card" onClick={() => navigate("/admin/usuarios")}>
        <h2>Cadastro de Usuário</h2>
        <p>Gerencie os usuários do sistema.</p>
      </div>
    </div>
  );
}

export default AdminIndex;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Read.css";

const SelectToUpdate = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/agendamentos")
      .then((res) => res.json())
      .then((data) => {
        setAgendamentos(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAgendamentos = agendamentos.filter((agendamento) =>
    agendamento.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando agendamentos...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Selecione um Agendamento de Saúde para Editar</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Pesquisar por nome do paciente..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table-container">
        <table className="read-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Profissional</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgendamentos.map((agendamento) => (
              <tr key={agendamento.id}>
                <td>{agendamento.id}</td>
                <td>{agendamento.patient_name}</td>
                <td>{agendamento.professional_name}</td>
                <td>{new Date(agendamento.date).toLocaleDateString('pt-BR')}</td>
                <td>{agendamento.time}</td>
                <td>{agendamento.type}</td>
                <td>
                  {agendamento.status === "on" ? (
                    <span className="status-on">Ativo</span>
                  ) : (
                    <span className="status-off">Inativo</span>
                  )}
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/admin/saudeagendamentos/update/${agendamento.id}`)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAgendamentos.length === 0 && (
          <p className="no-results">Nenhum agendamento encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default SelectToUpdate; 
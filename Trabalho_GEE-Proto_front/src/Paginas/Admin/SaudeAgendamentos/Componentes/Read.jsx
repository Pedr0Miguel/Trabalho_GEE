import React, { useState, useEffect } from "react";
import "./Read.css";

const Read = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const response = await fetch("/api/agendamentos");
      if (!response.ok) throw new Error("Erro ao buscar agendamentos");
      
      const data = await response.json();
      setAgendamentos(data);
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgendamentos = agendamentos.filter(agendamento =>
    agendamento.student?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agendamento.professional?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agendamento.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  if (loading) {
    return <div className="loading-text">Carregando agendamentos...</div>;
  }

  return (
    <div className="read-container">
      <h2>Listar Agendamentos</h2>
      
      {mensagem && (
        <div className={`mensagem ${mensagem.includes("Erro") ? "erro" : "sucesso"}`}>
          {mensagem}
        </div>
      )}

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar por estudante, profissional ou especialidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        {filteredAgendamentos.length > 0 ? (
          <table className="read-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Estudante</th>
                <th>Profissional</th>
                <th>Especialidade</th>
                <th>Data</th>
                <th>Comentários</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgendamentos.map((agendamento) => (
                <tr key={agendamento._id}>
                  <td>{agendamento.id}</td>
                  <td>{agendamento.student || "-"}</td>
                  <td>{agendamento.professional || "-"}</td>
                  <td>{agendamento.specialty || "-"}</td>
                  <td>{formatDate(agendamento.date)}</td>
                  <td>{agendamento.comments || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            {searchTerm ? "Nenhum agendamento encontrado para a busca." : "Nenhum agendamento cadastrado."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Read; 
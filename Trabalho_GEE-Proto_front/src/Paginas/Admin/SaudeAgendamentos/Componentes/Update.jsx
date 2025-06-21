import React, { useState, useEffect } from "react";
import "./Update.css";

const Update = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    specialty: "",
    comments: "",
    date: "",
    student: "",
    professional: ""
  });

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

  const handleAgendamentoSelect = (agendamento) => {
    setSelectedAgendamento(agendamento);
    setFormData({
      id: agendamento.id || "",
      specialty: agendamento.specialty || "",
      comments: agendamento.comments || "",
      date: agendamento.date ? agendamento.date.split('T')[0] : "",
      student: agendamento.student || "",
      professional: agendamento.professional || ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAgendamento) {
      setMensagem("Por favor, selecione um agendamento para atualizar.");
      return;
    }

    try {
      const response = await fetch(`/api/agendamentos/${selectedAgendamento._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Erro ao atualizar agendamento");

      setMensagem("Agendamento atualizado com sucesso!");
      fetchAgendamentos(); // Refresh the list
      setSelectedAgendamento(null);
      setFormData({
        id: "",
        specialty: "",
        comments: "",
        date: "",
        student: "",
        professional: ""
      });
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="loading-text">Carregando agendamentos...</div>;
  }

  return (
    <div className="update-container">
      <h2>Atualizar Agendamento</h2>
      
      {mensagem && (
        <div className={`mensagem ${mensagem.includes("Erro") ? "erro" : "sucesso"}`}>
          {mensagem}
        </div>
      )}

      <div className="update-content">
        <div className="selection-section">
          <h3>Selecionar Agendamento</h3>
          <div className="agendamentos-list">
            {agendamentos.length > 0 ? (
              agendamentos.map((agendamento) => (
                <div
                  key={agendamento._id}
                  className={`agendamento-item ${
                    selectedAgendamento?._id === agendamento._id ? 'selected' : ''
                  }`}
                  onClick={() => handleAgendamentoSelect(agendamento)}
                >
                  <div className="agendamento-info">
                    <strong>{agendamento.student || "Sem estudante"}</strong>
                    <span>{agendamento.professional || "Sem profissional"}</span>
                    <span>{agendamento.date ? new Date(agendamento.date).toLocaleDateString("pt-BR") : "Sem data"}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-agendamentos">Nenhum agendamento encontrado.</p>
            )}
          </div>
        </div>

        {selectedAgendamento && (
          <div className="form-section">
            <h3>Editar Agendamento</h3>
            <form onSubmit={handleSubmit} className="update-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input
                    id="id"
                    name="id"
                    type="text"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="specialty">Especialidade</label>
                  <input
                    id="specialty"
                    name="specialty"
                    type="text"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="student">Estudante</label>
                  <input
                    id="student"
                    name="student"
                    type="text"
                    value={formData.student}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="professional">Profissional</label>
                  <input
                    id="professional"
                    name="professional"
                    type="text"
                    value={formData.professional}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Data</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="comments">Comentários</label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>
              </div>
              
              <button type="submit" className="btn-submit">
                Atualizar Agendamento
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update; 
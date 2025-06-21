import React, { useState, useEffect } from "react";
import "./Delete.css";

const Delete = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [agendamentoToDelete, setAgendamentoToDelete] = useState(null);

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

  const handleDeleteClick = (agendamento) => {
    setAgendamentoToDelete(agendamento);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!agendamentoToDelete) return;

    try {
      const response = await fetch(`/api/agendamentos/${agendamentoToDelete._id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar agendamento");

      setMensagem("Agendamento deletado com sucesso!");
      fetchAgendamentos(); // Refresh the list
      setShowModal(false);
      setAgendamentoToDelete(null);
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
      setShowModal(false);
      setAgendamentoToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setAgendamentoToDelete(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  if (loading) {
    return <div className="loading-text">Carregando agendamentos...</div>;
  }

  return (
    <div className="delete-container">
      <h2>Deletar Agendamento</h2>
      
      {mensagem && (
        <div className={`mensagem ${mensagem.includes("Erro") ? "erro" : "sucesso"}`}>
          {mensagem}
        </div>
      )}

      <div className="agendamentos-grid">
        {agendamentos.length > 0 ? (
          agendamentos.map((agendamento) => (
            <div key={agendamento._id} className="agendamento-card">
              <div className="agendamento-header">
                <h3>{agendamento.student || "Sem estudante"}</h3>
                <span className="status-badge status-on">
                  Agendado
                </span>
              </div>
              
              <div className="agendamento-details">
                <div className="detail-item">
                  <strong>ID:</strong>
                  <span>{agendamento.id || "Não informado"}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Profissional:</strong>
                  <span>{agendamento.professional || "Não informado"}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Especialidade:</strong>
                  <span>{agendamento.specialty || "Não informado"}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Data:</strong>
                  <span>{formatDate(agendamento.date)}</span>
                </div>
                
                {agendamento.comments && (
                  <div className="detail-item">
                    <strong>Comentários:</strong>
                    <span>{agendamento.comments}</span>
                  </div>
                )}
              </div>
              
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(agendamento)}
              >
                Deletar
              </button>
            </div>
          ))
        ) : (
          <div className="no-agendamentos">
            <p>Nenhum agendamento encontrado.</p>
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja deletar o agendamento de{" "}
              <strong>{agendamentoToDelete?.student}</strong>?
            </p>
            <p className="warning-text">
              Esta ação não pode ser desfeita.
            </p>
            
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={handleCancelDelete}>
                Cancelar
              </button>
              <button className="modal-btn confirm" onClick={handleConfirmDelete}>
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delete; 
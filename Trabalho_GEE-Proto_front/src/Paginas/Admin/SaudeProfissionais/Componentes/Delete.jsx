import React, { useState, useEffect } from "react";
import "./Delete.css";

const Delete = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [profissionalToDelete, setProfissionalToDelete] = useState(null);

  useEffect(() => {
    fetchProfissionais();
  }, []);

  const fetchProfissionais = async () => {
    try {
      const response = await fetch("/api/profissionais");
      if (!response.ok) throw new Error("Erro ao buscar profissionais");
      
      const data = await response.json();
      setProfissionais(data);
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (profissional) => {
    setProfissionalToDelete(profissional);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!profissionalToDelete) return;

    try {
      const response = await fetch(`/api/profissionais/${profissionalToDelete._id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar profissional");

      setMensagem("Profissional deletado com sucesso!");
      fetchProfissionais(); // Refresh the list
      setShowModal(false);
      setProfissionalToDelete(null);
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
      setShowModal(false);
      setProfissionalToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setProfissionalToDelete(null);
  };

  if (loading) {
    return <div className="loading-text">Carregando profissionais...</div>;
  }

  return (
    <div className="delete-container">
      <h2>Deletar Profissional</h2>
      
      {mensagem && (
        <div className={`mensagem ${mensagem.includes("Erro") ? "erro" : "sucesso"}`}>
          {mensagem}
        </div>
      )}

      <div className="profissionais-grid">
        {profissionais.length > 0 ? (
          profissionais.map((profissional) => (
            <div key={profissional._id} className="profissional-card">
              <div className="profissional-header">
                <h3>{profissional.name || "Sem nome"}</h3>
                <span className={`status-badge ${profissional.status === "off" ? "status-off" : "status-on"}`}>
                  {profissional.status === "on" ? "Ativo" : "Inativo"}
                </span>
              </div>
              
              <div className="profissional-details">
                <div className="detail-item">
                  <strong>ID:</strong>
                  <span>{profissional.id || "Não informado"}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Especialidade:</strong>
                  <span>{profissional.specialty || "Não informada"}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Contato:</strong>
                  <span>{profissional.contact || "Não informado"}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Telefone:</strong>
                  <span>{profissional.phone_number || "Não informado"}</span>
                </div>
              </div>
              
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(profissional)}
              >
                Deletar
              </button>
            </div>
          ))
        ) : (
          <div className="no-profissionais">
            <p>Nenhum profissional encontrado.</p>
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja deletar o profissional{" "}
              <strong>{profissionalToDelete?.name}</strong>?
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
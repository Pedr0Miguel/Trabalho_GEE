import React, { useState, useEffect } from "react";
import "./Delete.css";

const Modal = ({ isOpen, onClose, onConfirm, professor }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>
          Tem certeza que deseja excluir o professor <b>{professor?.name}</b>?
        </p>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-btn confirm" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

const Delete = () => {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [professorToDelete, setProfessorToDelete] = useState(null);

  useEffect(() => {
    fetch("/api/professores")
      .then((res) => res.json())
      .then((data) => {
        setProfessores(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (professor) => {
    setProfessorToDelete(professor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProfessorToDelete(null);
  };

  const confirmDelete = async () => {
    if (!professorToDelete) return;
    try {
      const res = await fetch(`/api/professores/${professorToDelete._id || professorToDelete.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Erro ao deletar professor');
      setProfessores(professores.filter((professor) => (professor._id || professor.id) !== (professorToDelete._id || professorToDelete.id)));
      closeModal();
    } catch (err) {
      alert('Erro ao deletar professor');
    }
  };

  const filteredProfessores = professores.filter((professor) =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando professores...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Excluir Professores</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table-container">
        <table className="read-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Disciplinas</th>
              <th>Contato</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfessores.map((professor) => (
              <tr key={professor._id}>
                <td>{professor._id}</td>
                <td>{professor.name}</td>
                <td>{professor.school_disciplines}</td>
                <td>{professor.contact}</td>
                <td>{professor.phone_number}</td>
                <td>
                  {professor.status === "on" ? (
                    <span className="status-on">Ativo</span>
                  ) : (
                    <span className="status-off">Inativo</span>
                  )}
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => openModal(professor)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProfessores.length === 0 && (
          <p className="no-results">Nenhum professor encontrado.</p>
        )}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        professor={professorToDelete}
      />
    </div>
  );
};

export default Delete; 
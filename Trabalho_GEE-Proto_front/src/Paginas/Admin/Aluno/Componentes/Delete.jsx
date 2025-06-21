import React, { useState, useEffect } from "react";
import "./Delete.css";

const Modal = ({ isOpen, onClose, onConfirm, aluno }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>
          Tem certeza que deseja excluir o aluno <b>{aluno?.name}</b>?
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
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alunoToDelete, setAlunoToDelete] = useState(null);

  useEffect(() => {
    fetch("/api/alunos")
      .then((res) => res.json())
      .then((data) => {
        setAlunos(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (aluno) => {
    setAlunoToDelete(aluno);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setAlunoToDelete(null);
  };

  const confirmDelete = async () => {
    if (!alunoToDelete) return;
    try {
      const res = await fetch(`/api/alunos/${alunoToDelete._id || alunoToDelete.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Erro ao deletar aluno');
      setAlunos(alunos.filter((aluno) => (aluno._id || aluno.id) !== (alunoToDelete._id || alunoToDelete.id)));
      closeModal();
    } catch (err) {
      alert('Erro ao deletar aluno');
    }
  };

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando alunos...</p>;

  return (
    <div className="delete-container">
      <h2>Excluir Alunos</h2>
      <div className="warning-message">
        <p>
          Atenção: Esta ação é irreversível. Ao excluir um aluno, todos os dados
          relacionados serão permanentemente removidos do sistema.
        </p>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table-container">
        <table className="delete-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Responsáveis</th>
              <th>Telefone</th>
              <th>Necessidades Especiais</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlunos.map((aluno) => (
              <tr key={aluno._id}>
                <td>{aluno.id}</td>
                <td>{aluno.name}</td>
                <td>{aluno.age}</td>
                <td>{aluno.parents}</td>
                <td>{aluno.phone_number}</td>
                <td>{aluno.special_needs}</td>
                <td>
                  {aluno.status === "on" ? (
                    <span className="status-on">Ativo</span>
                  ) : (
                    <span className="status-off">Inativo</span>
                  )}
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => openModal(aluno)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAlunos.length === 0 && (
          <p className="no-results">Nenhum aluno encontrado.</p>
        )}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        aluno={alunoToDelete}
      />
    </div>
  );
};

export default Delete;

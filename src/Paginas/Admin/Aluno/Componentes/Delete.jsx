import React, { useState, useEffect } from "react";
import "./Delete.css";

const Modal = ({ isOpen, onClose, onConfirm, aluno }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>
          Tem certeza que deseja excluir o aluno <b>{aluno?.nome}</b>?
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
    // Simulação de dados (remova quando tiver backend)
    setTimeout(() => {
      setAlunos([
        {
          id: 1,
          nome: "Maria",
          idade: 22,
          telefone: "11999999999",
          necessidades: "Nenhuma",
          estatus: "on",
        },
        {
          id: 2,
          nome: "João",
          idade: 20,
          telefone: "11988888888",
          necessidades: "Autismo",
          estatus: "off",
        },
        {
          id: 3,
          nome: "Ana",
          idade: 23,
          telefone: "11977777777",
          necessidades: "Síndrome de Down",
          estatus: "on",
        },
      ]);
      setLoading(false);
    }, 800);

    // Para usar backend real, descomente:
    /*
    fetch("/api/alunos")
      .then((res) => res.json())
      .then((data) => {
        setAlunos(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    */
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

  const confirmDelete = () => {
    setAlunos(alunos.filter((aluno) => aluno.id !== alunoToDelete.id));
    closeModal();
    // Aqui você pode fazer a requisição para deletar no backend
  };

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th>Telefone</th>
              <th>Necessidades Especiais</th>
              <th>Estatus</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.idade}</td>
                <td>{aluno.telefone}</td>
                <td>{aluno.necessidades}</td>
                <td>
                  {aluno.estatus === "on" ? (
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

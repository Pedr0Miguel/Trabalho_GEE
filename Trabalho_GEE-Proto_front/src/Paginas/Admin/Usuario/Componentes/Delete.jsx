import React, { useState, useEffect } from "react";
import "./Delete.css";

const Modal = ({ isOpen, onClose, onConfirm, usuario }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>
          Tem certeza que deseja excluir o usuário <b>{usuario?.name}</b>?
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
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);

  useEffect(() => {
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (usuario) => {
    setUsuarioToDelete(usuario);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setUsuarioToDelete(null);
  };

  const confirmDelete = async () => {
    if (!usuarioToDelete) return;
    try {
      const res = await fetch(`/api/usuarios/${usuarioToDelete._id || usuarioToDelete.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Erro ao deletar usuário');
      setUsuarios(usuarios.filter((usuario) => (usuario._id || usuario.id) !== (usuarioToDelete._id || usuarioToDelete.id)));
      closeModal();
    } catch (err) {
      alert('Erro ao deletar usuário');
    }
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando usuários...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Excluir Usuários</h2>
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
              <th>Email</th>
              <th>Usuário</th>
              <th>Nível</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario._id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.user}</td>
                <td>{usuario.level}</td>
                <td>
                  {usuario.status === "on" ? (
                    <span className="status-on">Ativo</span>
                  ) : (
                    <span className="status-off">Inativo</span>
                  )}
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => openModal(usuario)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsuarios.length === 0 && (
          <p className="no-results">Nenhum usuário encontrado.</p>
        )}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        usuario={usuarioToDelete}
      />
    </div>
  );
};

export default Delete; 
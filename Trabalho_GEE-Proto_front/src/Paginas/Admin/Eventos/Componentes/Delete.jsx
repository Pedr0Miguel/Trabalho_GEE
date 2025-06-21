import React, { useState, useEffect } from "react";
import "./Delete.css";

const Modal = ({ isOpen, onClose, onConfirm, evento }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>
          Tem certeza que deseja excluir o evento <b>{evento?.description}</b>?
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
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState(null);

  useEffect(() => {
    fetch("/api/eventos")
      .then((res) => res.json())
      .then((data) => {
        setEventos(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (evento) => {
    setEventoToDelete(evento);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEventoToDelete(null);
  };

  const confirmDelete = async () => {
    if (!eventoToDelete) return;
    try {
      const res = await fetch(`/api/eventos/${eventoToDelete._id || eventoToDelete.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Erro ao deletar evento');
      setEventos(eventos.filter((evento) => (evento._id || evento.id) !== (eventoToDelete._id || eventoToDelete.id)));
      closeModal();
    } catch (err) {
      alert('Erro ao deletar evento');
    }
  };

  const filteredEventos = eventos.filter((evento) =>
    evento.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando eventos...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Excluir Eventos</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Pesquisar por descrição..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table-container">
        <table className="read-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Comentários</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredEventos.map((evento) => (
              <tr key={evento._id}>
                <td>{evento.id}</td>
                <td>{evento.description}</td>
                <td>{evento.comments}</td>
                <td>{evento.date}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => openModal(evento)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEventos.length === 0 && (
          <p className="no-results">Nenhum evento encontrado.</p>
        )}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        evento={eventoToDelete}
      />
    </div>
  );
};

export default Delete; 
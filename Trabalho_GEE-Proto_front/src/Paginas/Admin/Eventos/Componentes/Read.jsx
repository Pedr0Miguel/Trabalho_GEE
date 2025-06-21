import React, { useState, useEffect } from "react";
import "./Read.css";

const Read = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Pesquisa por descrição
  const filteredEventos = eventos.filter((evento) =>
    evento.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando eventos...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Lista de Eventos</h2>
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
            </tr>
          </thead>
          <tbody>
            {filteredEventos.map((evento) => (
              <tr key={evento._id}>
                <td>{evento.id}</td>
                <td>{evento.description}</td>
                <td>{evento.comments}</td>
                <td>{evento.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEventos.length === 0 && (
          <p className="no-results">Nenhum evento encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Read; 
import React, { useState, useEffect } from "react";
import "./Read.css";

const Read = () => {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Pesquisa apenas por nome
  const filteredProfessores = professores.filter((professor) =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando professores...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Lista de Professores</h2>
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
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProfessores.length === 0 && (
          <p className="no-results">Nenhum professor encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Read; 
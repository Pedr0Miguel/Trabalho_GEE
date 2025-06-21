import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Read.css";

const SelectToUpdate = () => {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const filteredProfessores = professores.filter((professor) =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando professores...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Selecione um Professor para Editar</h2>
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
              <tr key={professor.id}>
                <td>{professor.id}</td>
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
                    className="edit-button"
                    onClick={() => navigate(`/admin/professores/update/${professor.id}`)}
                  >
                    Editar
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
    </div>
  );
};

export default SelectToUpdate; 
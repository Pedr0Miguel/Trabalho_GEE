import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Read.css";

const SelectToUpdate = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/profissionais")
      .then((res) => res.json())
      .then((data) => {
        setProfissionais(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProfissionais = profissionais.filter((profissional) =>
    profissional.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando profissionais...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Selecione um Profissional de Saúde para Editar</h2>
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
              <th>Especialidade</th>
              <th>Contato</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfissionais.map((profissional) => (
              <tr key={profissional._id}>
                <td>{profissional.id}</td>
                <td>{profissional.name}</td>
                <td>{profissional.specialty}</td>
                <td>{profissional.contact}</td>
                <td>{profissional.phone_number}</td>
                <td>
                  {profissional.status === "on" ? (
                    <span className="status-on">Ativo</span>
                  ) : (
                    <span className="status-off">Inativo</span>
                  )}
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/admin/saudeprofissionais/update/${profissional._id}`)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProfissionais.length === 0 && (
          <p className="no-results">Nenhum profissional encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default SelectToUpdate; 
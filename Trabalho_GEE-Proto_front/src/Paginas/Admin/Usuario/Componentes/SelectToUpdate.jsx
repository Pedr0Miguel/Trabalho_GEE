import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Read.css";

const SelectToUpdate = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/users")
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

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando usuários...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Selecione um Usuário para Editar</h2>
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
              <th>Tipo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.type}</td>
                <td>
                  {usuario.status === "on" ? (
                    <span className="status-on">Ativo</span>
                  ) : (
                    <span className="status-off">Inativo</span>
                  )}
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/admin/usuarios/update/${usuario.id}`)}
                  >
                    Editar
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
    </div>
  );
};

export default SelectToUpdate; 
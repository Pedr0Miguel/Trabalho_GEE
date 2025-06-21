import React, { useState, useEffect } from "react";
import "./Read.css";

const Read = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Pesquisa apenas por nome
  const filteredAlunos = alunos.filter((aluno) =>
    aluno.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando alunos...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Lista de Alunos</h2>
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
              <th>Idade</th>
              <th>Responsáveis</th>
              <th>Telefone</th>
              <th>Necessidades Especiais</th>
              <th>Status</th>
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
                <td>{aluno.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAlunos.length === 0 && (
          <p className="no-results">Nenhum aluno encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Read;

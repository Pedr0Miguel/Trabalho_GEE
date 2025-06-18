import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Read.css";

const SelectToUpdate = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading-text">Carregando alunos...</p>;

  return (
    <div className="read-container">
      <h2 className="admin-title">Selecione um Aluno para Editar</h2>
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
                    className="edit-button"
                    onClick={() => navigate(`/admin/alunos/update/${aluno.id}`)}
                  >
                    Editar
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
    </div>
  );
};

export default SelectToUpdate;

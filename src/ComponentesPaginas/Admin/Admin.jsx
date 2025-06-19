// src/pages/Admin.jsx
import './Admin.css';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  const cards = [
    { title: 'Cadastro de Professores', path: '/crud/professores' },
    { title: 'Cadastro de Alunos', path: '/crud/alunos' },
    { title: 'Cadastro de Eventos', path: '/crud/eventos' },
    { title: 'Agendamentos de Saúde', path: '/crud/agendamentos-saude' },
    { title: 'Profissionais de Saúde', path: '/crud/profissionais-saude' },
    { title: 'Configurações', path: '/crud/configuracoes' },
  ];

  return (
    <div className="admin-container">
      <h1 className="admin-title">Painel Administrativo</h1>
      <div className="admin-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="admin-card"
            onClick={() => navigate(card.path)}
          >
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

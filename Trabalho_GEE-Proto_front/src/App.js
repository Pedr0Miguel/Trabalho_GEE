import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Paginas/Login";
import Cadastro from "./Paginas/Cadrastro";
import Admin from "./Paginas/Admin/index.jsx";
import Aluno from "./Paginas/Admin/Aluno/Componentes";
import Professores from "./Paginas/Admin/Professores/Componentes";
import Usuario from "./Paginas/Admin/Usuario/Componentes";
import SaudeProfissionais from "./Paginas/Admin/SaudeProfissionais/Componentes";
import SaudeAgendamentos from "./Paginas/Admin/SaudeAgendamentos/Componentes";
import Eventos from "./Paginas/Admin/Eventos/Componentes";
import Update from "./Paginas/Admin/Aluno/Componentes/Update";
import SelectToUpdate from "./Paginas/Admin/Aluno/Componentes/SelectToUpdate";
import UpdateProfessor from "./Paginas/Admin/Professores/Componentes/Update";
import UpdateEvento from "./Paginas/Admin/Eventos/Componentes/Update";
import UpdateUsuario from "./Paginas/Admin/Usuario/Componentes/Update";
import UpdateProfissional from "./Paginas/Admin/SaudeProfissionais/Componentes/Update";
import UpdateAgendamento from "./Paginas/Admin/SaudeAgendamentos/Componentes/Update";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/alunos" element={<Aluno />} />
        <Route path="/admin/professores" element={<Professores />} />
        <Route path="/admin/usuarios" element={<Usuario />} />
        <Route
          path="/admin/saudeprofissionais"
          element={<SaudeProfissionais />}
        />
        <Route
          path="/admin/saudeagendamentos"
          element={<SaudeAgendamentos />}
        />
        <Route path="/admin/eventos" element={<Eventos />} />
        
        {/* Rotas de Update */}
        <Route path="/admin/alunos/update/:id" element={<Update />} />
        <Route path="/admin/professores/update/:id" element={<UpdateProfessor />} />
        <Route path="/admin/eventos/update/:id" element={<UpdateEvento />} />
        <Route path="/admin/usuarios/update/:id" element={<UpdateUsuario />} />
        <Route path="/admin/saudeprofissionais/update/:id" element={<UpdateProfissional />} />
        <Route path="/admin/saudeagendamentos/update/:id" element={<UpdateAgendamento />} />
        
        {/* Rotas de SelectToUpdate */}
        <Route
          path="/admin/alunos/select-update"
          element={<SelectToUpdate />}
        />
      </Routes>
    </Router>
  );
}

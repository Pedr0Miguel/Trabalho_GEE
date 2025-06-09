import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./ComponentesPaginas/Login/login";
import Admin from "./ComponentesPaginas/Admin/Admin";
import CadastroUsuario from "./ComponentesPaginas/CadrastroUsuario/CadrastroUsuario"; // ADICIONE ESTA LINHA

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />{" "}
        {/* ADICIONE ESTA LINHA */}
        {/* Outras rotas de cadastro */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;

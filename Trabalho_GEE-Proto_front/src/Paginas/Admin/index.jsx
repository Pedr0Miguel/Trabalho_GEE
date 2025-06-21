import React from "react";
import "./index.css";
import Cards from "./Componentes";

function AdminIndex() {
  return (
    <div className="admin-outer-center">
      <div className="admin-container">
        <h1 className="admin-title">Painel Administrativo</h1>
        <Cards />
      </div>
    </div>
  );
}

export default AdminIndex;

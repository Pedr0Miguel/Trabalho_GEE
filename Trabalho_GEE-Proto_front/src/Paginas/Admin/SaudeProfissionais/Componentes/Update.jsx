import React, { useState, useEffect } from "react";
import "./Update.css";
import { applyPhoneMask, removePhoneMask } from "../../../../utils/phoneMask";

const Update = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [selectedProfissional, setSelectedProfissional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    specialty: "",
    contact: "",
    phone_number: "",
    status: "on"
  });

  useEffect(() => {
    fetchProfissionais();
  }, []);

  const fetchProfissionais = async () => {
    try {
      const response = await fetch("/api/profissionais");
      if (!response.ok) throw new Error("Erro ao buscar profissionais");
      
      const data = await response.json();
      setProfissionais(data);
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleProfissionalSelect = (profissional) => {
    setSelectedProfissional(profissional);
    setFormData({
      id: profissional.id || "",
      name: profissional.name || "",
      specialty: profissional.specialty || "",
      contact: profissional.contact || "",
      phone_number: applyPhoneMask(profissional.phone_number || ""), // Aplica máscara ao selecionar
      status: profissional.status || "on"
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone_number") {
      const maskedValue = applyPhoneMask(value);
      setFormData(prev => ({
        ...prev,
        [name]: maskedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedProfissional) {
      setMensagem("Por favor, selecione um profissional para atualizar.");
      return;
    }

    try {
      const payload = {
        ...formData,
        phone_number: removePhoneMask(formData.phone_number) // Remove a máscara antes de enviar
      };

      const response = await fetch(`/api/profissionais/${selectedProfissional._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erro ao atualizar profissional");

      setMensagem("Profissional atualizado com sucesso!");
      fetchProfissionais(); // Refresh the list
      setSelectedProfissional(null);
      setFormData({
        id: "",
        name: "",
        specialty: "",
        contact: "",
        phone_number: "",
        status: "on"
      });
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="loading-text">Carregando profissionais...</div>;
  }

  return (
    <div className="update-container">
      <h2>Atualizar Profissional</h2>
      
      {mensagem && (
        <div className={`mensagem ${mensagem.includes("Erro") ? "erro" : "sucesso"}`}>
          {mensagem}
        </div>
      )}

      <div className="update-content">
        <div className="selection-section">
          <h3>Selecionar Profissional</h3>
          <div className="profissionais-list">
            {profissionais.length > 0 ? (
              profissionais.map((profissional) => (
                <div
                  key={profissional._id}
                  className={`profissional-item ${
                    selectedProfissional?._id === profissional._id ? 'selected' : ''
                  }`}
                  onClick={() => handleProfissionalSelect(profissional)}
                >
                  <div className="profissional-info">
                    <strong>{profissional.name || "Sem nome"}</strong>
                    <span>{profissional.specialty || "Sem especialidade"}</span>
                    <span>ID: {profissional.id || "N/A"}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-profissionais">Nenhum profissional encontrado.</p>
            )}
          </div>
        </div>

        {selectedProfissional && (
          <div className="form-section">
            <h3>Editar Profissional</h3>
            <form onSubmit={handleSubmit} className="update-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input
                    id="id"
                    name="id"
                    type="text"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="specialty">Especialidade</label>
                  <input
                    id="specialty"
                    name="specialty"
                    type="text"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contato</label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone_number">Telefone</label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    maxLength="15"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="on">Ativo</option>
                    <option value="off">Inativo</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="btn-submit">
                Atualizar Profissional
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update; 
import React from 'react';

export default function CampoEntrada({ type, placeholder, valor, aoMudar }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={valor}
      onChange={(e) => aoMudar(e.target.value)}
    />
  );
}

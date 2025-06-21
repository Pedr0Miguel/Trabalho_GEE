/**
 * Aplica máscara de telefone no formato (XX) XXXXX-XXXX
 * @param {string} value - Valor a ser mascarado
 * @returns {string} - Valor com máscara aplicada
 */
export const applyPhoneMask = (value) => {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara baseada no número de dígitos
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
};

/**
 * Remove a máscara de telefone, retornando apenas os números
 * @param {string} value - Valor com máscara
 * @returns {string} - Valor sem máscara (apenas números)
 */
export const removePhoneMask = (value) => {
  return value.replace(/\D/g, '');
}; 
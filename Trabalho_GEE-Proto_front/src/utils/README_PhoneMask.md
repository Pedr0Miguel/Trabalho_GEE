# Máscara de Telefone - Implementação

## Visão Geral
Foi implementada uma máscara de telefone brasileiro para garantir que os números sejam inseridos no formato correto e com o limite adequado de caracteres.

## Arquivo Utilitário
- **Localização**: `src/utils/phoneMask.js`
- **Funções disponíveis**:
  - `applyPhoneMask(value)`: Aplica a máscara no formato brasileiro
  - `removePhoneMask(value)`: Remove a máscara e retorna apenas números
  - `isPhoneComplete(value)`: Valida se o telefone está completo

## Formato da Máscara
- **DDD**: (11)
- **Número**: 99999-9999 (com 9 dígitos) ou 9999-9999 (com 8 dígitos)
- **Exemplo**: (11) 99999-9999

## Componentes Atualizados

### 1. Alunos
- **Create**: `src/Paginas/Admin/Aluno/Componentes/Create.jsx`
- **Update**: `src/Paginas/Admin/Aluno/Componentes/Update.jsx`

### 2. Professores
- **Create**: `src/Paginas/Admin/Professores/Componentes/Create.jsx`
- **Update**: `src/Paginas/Admin/Professores/Componentes/Update.jsx`

### 3. Profissionais de Saúde
- **Create**: `src/Paginas/Admin/SaudeProfissionais/Componentes/Create.jsx`
- **Update**: `src/Paginas/Admin/SaudeProfissionais/Componentes/Update.jsx`

## Funcionalidades Implementadas

### 1. Aplicação Automática da Máscara
- A máscara é aplicada automaticamente durante a digitação
- Formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX

### 2. Validação de Entrada
- Aceita apenas números
- Limita a 11 dígitos (DDD + 9 dígitos)
- Máximo de 15 caracteres incluindo formatação

### 3. Placeholder Informativo
- Mostra o formato esperado: "(11) 99999-9999"

### 4. Processamento de Dados
- **Envio**: Remove a máscara antes de enviar para o backend
- **Carregamento**: Aplica a máscara ao carregar dados existentes

## Como Usar

### Importação
```javascript
import { applyPhoneMask, removePhoneMask } from "../../../../utils/phoneMask";
```

### Aplicação no onChange
```javascript
const handleTelefoneChange = (e) => {
  const maskedValue = applyPhoneMask(e.target.value);
  setTelefone(maskedValue);
};
```

### Remoção antes do envio
```javascript
const payload = {
  telefone: removePhoneMask(telefone)
};
```

### Aplicação ao carregar dados
```javascript
setTelefone(applyPhoneMask(data.telefone || ""));
```

## Benefícios
1. **Experiência do usuário**: Formatação automática e visual
2. **Validação**: Previne entrada de dados incorretos
3. **Consistência**: Padrão único em todo o sistema
4. **Compatibilidade**: Funciona com telefones de 8 e 9 dígitos 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const rotaProfessores = require('./routes/rotaProfessores');
const userRoutes = require('./routes/userRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const rotaProfissionais = require('./routes/rotaProfissionais');

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/professores', rotaProfessores);
app.use('/api/usuarios', userRoutes);
app.use('/api/alunos', studentsRoutes);
app.use('/api/eventos', eventsRoutes);
app.use('/api/profissionais', rotaProfissionais);


// Swagger Config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestão de Ensino Especial',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Caminho relativo ao diretório atual
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
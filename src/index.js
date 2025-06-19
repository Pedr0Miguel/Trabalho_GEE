import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import rotaProfessores from './routes/rotaProfessores.js';
import userRoutes from './routes/userRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';
import rotaProfissionais from './routes/rotaProfissionais.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
console.log('MONGO_URI:', process.env.MONGO_URI); // Adicione esta linha para depuração

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
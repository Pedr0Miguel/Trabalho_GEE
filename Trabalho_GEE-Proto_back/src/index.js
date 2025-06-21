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
import appointmentsRoutes from './routes/appointmentsRoutes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// URI padrão para MongoDB (você pode alterar para sua URI real)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gee_proto';
console.log('MONGO_URI:', MONGO_URI);

// Conexão com o MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Rotas
app.use('/api/professores', rotaProfessores);
app.use('/api/usuarios', userRoutes);
app.use('/api/alunos', studentsRoutes);
app.use('/api/eventos', eventsRoutes);
app.use('/api/profissionais', rotaProfissionais);
app.use('/api/agendamentos', appointmentsRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
});

// Swagger Config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestão de Ensino Especial',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
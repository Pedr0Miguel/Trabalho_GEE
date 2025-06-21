import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// URI padrão para MongoDB (mesma configuração do index.js)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gee_proto';
console.log('MONGO_URI:', MONGO_URI);

async function cleanupDatabase() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB');

    // Remover o índice problemático
    const db = mongoose.connection.db;
    
    try {
      await db.collection('users').dropIndex('id_1');
      console.log('Índice id_1 removido com sucesso');
    } catch (err) {
      if (err.code === 27) {
        console.log('Índice id_1 não existe');
      } else {
        console.log('Erro ao remover índice:', err);
      }
    }

    // Remover documentos com id: null
    const result = await db.collection('users').deleteMany({ id: null });
    console.log(`${result.deletedCount} documentos com id: null removidos`);

    console.log('Limpeza concluída!');
  } catch (error) {
    console.error('Erro durante a limpeza:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  }
}

cleanupDatabase(); 
import express from 'express';
import User from '../models/User.js'; // Adicione esta linha

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários - Wesley
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários - Wesley]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       500:
 *         description: Erro interno
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Usuários - Wesley]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários - Wesley]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               user:
 *                 type: string
 *               pwd:
 *                 type: string
 *               level:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  console.log('Recebendo requisição POST /api/usuarios');
  console.log('Body da requisição:', req.body);
  
  const { name, email, user, pwd, level } = req.body;
  console.log('Dados extraídos:', { name, email, user, pwd, level });
  
  if (!name || !email || !user || !pwd || !level) {
    console.log('Campos obrigatórios faltando');
    return res.status(400).json({ error: "Campos obrigatórios faltando" });
  }
  
  try {
    console.log('Criando novo usuário...');
    const newUser = new User({ name, email, user, pwd, level });
    console.log('Usuário criado:', newUser);
    
    console.log('Salvando no banco...');
    await newUser.save();
    console.log('Usuário salvo com sucesso');
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Erro ao criar usuário', 
      details: error.message 
    });
  }
});

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Usuários - Wesley]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               pwd:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Usuário ou senha inválidos
 */
router.post('/login', async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  try {
    const foundUser = await User.findOne({ user, pwd });
    if (!foundUser) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
    res.status(200).json({ message: 'Login bem-sucedido', user: foundUser });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários - Wesley]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

export default router;

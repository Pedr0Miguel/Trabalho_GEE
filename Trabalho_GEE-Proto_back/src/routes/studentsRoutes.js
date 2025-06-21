import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Alunos - Kaueh Vitali Bento
 *   description: Gerenciamento de alunos
 */

/**
 * @swagger
 * /api/alunos:
 *   post:
 *     summary: Cadastra um novo aluno
 *     tags: [Alunos - Kaueh Vitali Bento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               special_needs:
 *                 type: string
 *               parents:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aluno cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
});

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Lista todos os alunos ativos
 *     tags: [Alunos - Kaueh Vitali Bento]
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
 *       500:
 *         description: Erro interno
 */
router.get('/', async (req, res) => {
  try {
    const students = await Student.find({ status: 'on' });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

/**
 * @swagger
 * /api/alunos/{id}:
 *   get:
 *     summary: Busca um aluno por ID
 *     tags: [Alunos - Kaueh Vitali Bento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *       404:
 *         description: Aluno não encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

/**
 * @swagger
 * /api/alunos/{id}:
 *   put:
 *     summary: Atualiza os dados de um aluno
 *     tags: [Alunos - Kaueh Vitali Bento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               special_needs:
 *                 type: string
 *               parents:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar aluno' });
  }
});

/**
 * @swagger
 * /api/alunos/{id}:
 *   delete:
 *     summary: Desativa um aluno
 *     tags: [Alunos - Kaueh Vitali Bento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno desativado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, { status: 'off' }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json({ message: 'Aluno desativado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao desativar aluno' });
  }
});

export default router;

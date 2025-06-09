const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

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
router.put('/:id', (req, res) => {
  const students = readStudents();
  const index = students.findIndex(s => s.id === req.params.id);

  if (index === -1) return res.status(404).json({ error: 'Aluno não encontrado' });

  const updatedStudent = {
    ...students[index],
    ...req.body,
    id: students[index].id 
  };

  students[index] = updatedStudent;
  writeStudents(students);
  res.json(updatedStudent);
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
router.delete('/:id', (req, res) => {
  const students = readStudents();
  const index = students.findIndex(s => s.id === req.params.id);

  if (index === -1) return res.status(404).json({ error: 'Aluno não encontrado' });

  students[index].status = 'off';
  writeStudents(students);
  res.json({ message: 'Aluno desativado com sucesso' });
});

module.exports = router;
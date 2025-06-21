import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Agendamentos - Saúde
 *   description: Gerenciamento de agendamentos de saúde
 */

/**
 * @swagger
 * /api/agendamentos:
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags: [Agendamentos - Saúde]
 *     responses:
 *       200:
 *         description: Lista de agendamentos retornada com sucesso
 *       500:
 *         description: Erro interno
 */
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
});

/**
 * @swagger
 * /api/agendamentos/{id}:
 *   get:
 *     summary: Busca um agendamento por ID
 *     tags: [Agendamentos - Saúde]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *       404:
 *         description: Agendamento não encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar agendamento' });
  }
});

/**
 * @swagger
 * /api/agendamentos:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos - Saúde]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               specialty:
 *                 type: string
 *               comments:
 *                 type: string
 *               date:
 *                 type: string
 *               student:
 *                 type: string
 *               professional:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
});

/**
 * @swagger
 * /api/agendamentos/{id}:
 *   put:
 *     summary: Atualiza um agendamento existente
 *     tags: [Agendamentos - Saúde]
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
 *               specialty:
 *                 type: string
 *               comments:
 *                 type: string
 *               date:
 *                 type: string
 *               student:
 *                 type: string
 *               professional:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar agendamento' });
  }
});

/**
 * @swagger
 * /api/agendamentos/{id}:
 *   delete:
 *     summary: Remove um agendamento
 *     tags: [Agendamentos - Saúde]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Agendamento removido com sucesso
 *       404:
 *         description: Agendamento não encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover agendamento' });
  }
});

export default router; 
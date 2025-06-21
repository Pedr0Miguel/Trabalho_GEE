import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Eventos - Gabriel Cardoso Coelho
 *   description: Gerenciamento de eventos
 */ 

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Lista todos os eventos
 *     tags: [Eventos - Gabriel Cardoso Coelho]
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 *       500:
 *         description: Erro interno
 */
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
});

/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     summary: Busca um evento por ID
 *     tags: [Eventos - Gabriel Cardoso Coelho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento não encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar evento' });
  }
});

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos - Gabriel Cardoso Coelho]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
});

/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Eventos - Gabriel Cardoso Coelho]
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
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       404:
 *         description: Evento não encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar evento' });
  }
});

/**
 * @swagger
 * /api/eventos/{id}:
 *   delete:
 *     summary: Remove um evento
 *     tags: [Eventos - Gabriel Cardoso Coelho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Evento removido com sucesso
 *       404:
 *         description: Evento não encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Evento não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover evento' });
  }
});

export default router;

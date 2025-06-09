const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const EVENTS_FILE = path.join(__dirname, '../db/events.json');

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
  const events = await fs.readFile(EVENTS_FILE, 'utf-8');
  res.json(JSON.parse(events));
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
  const events = JSON.parse(await fs.readFile(EVENTS_FILE, 'utf-8'));
  const event = events.find(e => e.id === req.params.id);
  res.json(event || { error: 'Evento não encontrado' });
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
  const events = JSON.parse(await fs.readFile(EVENTS_FILE, 'utf-8'));
  const newEvent = { id: Date.now().toString(), ...req.body };
  events.push(newEvent);
  await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2));
  res.status(201).json(newEvent);
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
  const events = JSON.parse(await fs.readFile(EVENTS_FILE, 'utf-8'));
  const index = events.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Evento não encontrado' });
  events[index] = { ...events[index], ...req.body };
  await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2));
  res.json(events[index]);
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
  const events = JSON.parse(await fs.readFile(EVENTS_FILE, 'utf-8'));
  const filteredEvents = events.filter(e => e.id !== req.params.id);
  await fs.writeFile(EVENTS_FILE, JSON.stringify(filteredEvents, null, 2));
  res.status(204).send();
});

module.exports = router;
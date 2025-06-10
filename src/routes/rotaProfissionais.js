import express from 'express';
import Professional from '../models/Professional.js';

/**
 * @swagger
 * tags:
 *   name: Profissionais - Ana Clara
 *   description: Rotas para gerenciar profissionais da saúde
 */

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const professionals = await Professional.find();
    res.json(professionals);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar profissionais' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);
    if (!professional) return res.status(404).send('Profissional não encontrado');
    res.json(professional);
  } catch (err) {
    res.status(500).send('Erro ao buscar profissional');
  }
});

router.get('/name/:name', async (req, res) => {
  try {
    const filtered = await Professional.find({ name: { $regex: req.params.name, $options: 'i' } });
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar profissionais' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProfessional = new Professional(req.body);
    await newProfessional.save();
    res.status(201).json(newProfessional);
  } catch (err) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Professional.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send('Profissional não encontrado');
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar profissional' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Professional.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Profissional não encontrado');
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Erro ao deletar profissional');
  }
});

export default router;

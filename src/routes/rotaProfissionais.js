const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const professionalsPath = path.join(__dirname, '../db/professionals.json');

/**
 * @swagger
 * tags:
 *   name: Profissionais - Ana Clara
 *   description: Rotas para gerenciar profissionais da saúde
 */

/**
 * @swagger
 * /api/profissionais:
 *   get:
 *     summary: Lista todos os profissionais
 *     tags: [Profissionais - Ana Clara]
 *     responses:
 *       200:
 *         description: Lista de profissionais retornada com sucesso
 */
router.get('/', (req, res) => {
    const professionals = JSON.parse(fs.readFileSync(professionalsPath));
    res.json(professionals);
});

/**
 * @swagger
 * /api/profissionais/{id}:
 *   get:
 *     summary: Buscar profissional por ID
 *     tags: [Profissionais - Ana Clara]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional
 *     responses:
 *       200:
 *         description: Profissional encontrado
 *       404:
 *         description: Profissional não encontrado
 */
router.get('/:id', (req, res) => {
    const professionals = JSON.parse(fs.readFileSync(professionalsPath));
    const professional = professionals.find(p => p.id === req.params.id);
    if (professional) res.json(professional);
    else res.status(404).send('Profissional não encontrado');
});

/**
 * @swagger
 * /api/profissionais/name/{name}:
 *   get:
 *     summary: Buscar profissional por nome
 *     tags: [Profissionais - Ana Clara]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome parcial ou completo
 *     responses:
 *       200:
 *         description: Lista de profissionais filtrada
 */
router.get('/name/:name', (req, res) => {
    const professionals = JSON.parse(fs.readFileSync(professionalsPath));
    const filtered = professionals.filter(p => p.name.toLowerCase().includes(req.params.name.toLowerCase()));
    res.json(filtered);
});

/**
 * @swagger
 * /api/profissionais:
 *   post:
 *     summary: Cadastrar novo profissional
 *     tags: [Profissionais - Ana Clara]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialty
 *               - contact
 *               - phone_number
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               contact:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profissional criado com sucesso
 */
router.post('/', (req, res) => {
    const professionals = JSON.parse(fs.readFileSync(professionalsPath));
    const newProfessional = { id: Date.now().toString(), ...req.body };
    professionals.push(newProfessional);
    fs.writeFileSync(professionalsPath, JSON.stringify(professionals, null, 2));
    res.status(201).json(newProfessional);
});

/**
 * @swagger
 * /api/profissionais/{id}:
 *   put:
 *     summary: Atualizar um profissional
 *     tags: [Profissionais - Ana Clara]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Profissional atualizado
 *       404:
 *         description: Profissional não encontrado
 */
router.put('/:id', (req, res) => {
    let professionals = JSON.parse(fs.readFileSync(professionalsPath));
    const index = professionals.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        professionals[index] = { ...professionals[index], ...req.body };
        fs.writeFileSync(professionalsPath, JSON.stringify(professionals, null, 2));
        res.json(professionals[index]);
    } else {
        res.status(404).send('Profissional não encontrado');
    }
});

/**
 * @swagger
 * /api/profissionais/{id}:
 *   delete:
 *     summary: Deletar um profissional
 *     tags: [Profissionais - Ana Clara]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional
 *     responses:
 *       204:
 *         description: Profissional deletado
 *       404:
 *         description: Profissional não encontrado
 */
router.delete('/:id', (req, res) => {
    let professionals = JSON.parse(fs.readFileSync(professionalsPath));
    const newProfessionals = professionals.filter(p => p.id !== req.params.id);
    if (professionals.length === newProfessionals.length) {
        res.status(404).send('Profissional não encontrado');
    } else {
        fs.writeFileSync(professionalsPath, JSON.stringify(newProfessionals, null, 2));
        res.status(204).send();
    }
});

module.exports = router;

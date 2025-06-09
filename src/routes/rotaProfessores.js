const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

/**
 * @swagger
 * tags:
 *   name: Professores - Pedro Miguel Plaça Lima
 *   description: Gerenciamento de professores
 */

/**
 * @swagger
 * /api/professores:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Professores - Pedro Miguel Plaça Lima]
 *     responses:
 *       200:
 *         description: Lista de professores retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../db/professores.json'), 'utf8');
    const professores = JSON.parse(data);

    // Usando array.map para formatar os dados
    const formattedProfessores = professores.map(prof => ({
      id: prof.id,
      name: prof.name.toUpperCase(),
      status: prof.status === 'on' ? 'Ativo' : 'Inativo',
    }));

    res.json(formattedProfessores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler dados' });
  }
});

/**
 * @swagger
 * /api/professores/{idOrName}:
 *   get:
 *     summary: Busca um professor por ID ou nome
 *     tags: [Professores - Pedro Miguel Plaça Lima]
 *     parameters:
 *       - in: path
 *         name: idOrName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor encontrado
 *       404:
 *         description: Professor não encontrado
 */
router.get('/:idOrName', async (req, res) => {
  try {
    const professores = JSON.parse(await fs.readFile(path.join(__dirname, '../db/professores.json'), 'utf8'));
    const { idOrName } = req.params;

    // Busca por ID ou qualquer parte do nome (case insensitive)
    const lowerCaseQuery = idOrName.toLowerCase();
    const matchingProfessores = professores.filter(t => 
      t.id === idOrName || t.name.toLowerCase().includes(lowerCaseQuery)
    );

    if (matchingProfessores.length === 0) {
      return res.status(404).json({ error: 'Nenhum professor encontrado' });
    }

    res.json(matchingProfessores);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

/**
 * @swagger
 * /api/professores:
 *   post:
 *     summary: Cadastra um novo professor
 *     tags: [Professores - Pedro Miguel Plaça Lima]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               school_disciplines:
 *                 type: string
 *               contact:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  const { name, school_disciplines, contact, phone_number } = req.body;

  // Validação básica (campos obrigatórios)
  if (!name || !school_disciplines || !contact || !phone_number) {
    return res.status(400).json({ error: "Campos obrigatórios faltando" });
  }

  // Validação avançada (exemplo para telefone)
  const phoneRegex = /^[\d\s()-]+$/; // Aceita números, espaços, parênteses e traços
  if (!phoneRegex.test(phone_number)) {
    return res.status(400).json({ error: "Telefone inválido" });
  }

  try {
    const professores = JSON.parse(await fs.readFile(path.join(__dirname, '../db/professores.json'), 'utf8'));
    const newTeacher = { 
      id: crypto.randomUUID(), 
      ...req.body, 
      status: "on" 
    };
    professores.push(newTeacher);
    await fs.writeFile(path.join(__dirname, '../db/professores.json'), JSON.stringify(professores, null, 2));
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /api/professores/{id}:
 *   put:
 *     summary: Atualiza um professor
 *     tags: [Professores - Pedro Miguel Plaça Lima]
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
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Professor atualizado
 *       404:
 *         description: Professor não encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const professores = JSON.parse(await fs.readFile(path.join(__dirname, '../db/professores.json'), 'utf8'));
    const index = professores.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Professor não encontrado" });
    professores[index] = { ...professores[index], ...req.body };
    await fs.writeFile(path.join(__dirname, '../db/professores.json'), JSON.stringify(professores, null, 2));
    res.json(professores[index]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar" });
  }
});

/**
 * @swagger
 * /api/professores/{id}:
 *   delete:
 *     summary: Remove um professor
 *     tags: [Professores - Pedro Miguel Plaça Lima]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor removido
 *       404:
 *         description: Professor não encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const professores = JSON.parse(await fs.readFile(path.join(__dirname, '../db/professores.json'), 'utf8'));
    const filtered = professores.filter(p => p.id !== req.params.id);
    if (professores.length === filtered.length) return res.status(404).json({ error: "Professor não encontrado" });
    await fs.writeFile(path.join(__dirname, '../db/professores.json'), JSON.stringify(filtered, null, 2));
    res.json({ message: "Professor removido" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir" });
  }
});

module.exports = router;
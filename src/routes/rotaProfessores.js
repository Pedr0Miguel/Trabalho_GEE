import express from 'express';
import Professor from '../models/Professor.js';

const router = express.Router();

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
    const professores = await Professor.find();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar professores' });
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
  try {
    const novo = new Professor(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: 'Dados inválidos' });
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
    const atualizado = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: 'Professor não encontrado' });
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar' });
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
    const removido = await Professor.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ error: 'Professor não encontrado' });
    res.json({ message: 'Professor removido' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir' });
  }
});

export default router;
const express = require('express');
const router = express.Router();
const connectDB = require('../db');

// GET: Listar todas as contas
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const contas = await db.collection('accounts').find().toArray();
    res.json(contas);
  } catch (err) {
    console.error('[ERRO] ao buscar contas:', err);
    res.status(500).json({ erro: 'Erro ao buscar contas' });
  }
});

// POST: Adicionar nova conta
router.post('/', async (req, res) => {
  const { nome, senha, cookie_json } = req.body;
  if (!nome || !senha) return res.status(400).json({ erro: 'Nome e senha são obrigatórios' });

  try {
    const db = await connectDB();
    const result = await db.collection('accounts').insertOne({
      nome,
      senha,
      cookie_json: cookie_json || null,
      createdAt: new Date()
    });
    res.json({ status: 'Conta adicionada', id: result.insertedId });
  } catch (err) {
    console.error('[ERRO] ao adicionar conta:', err);
    res.status(500).json({ erro: 'Erro ao adicionar conta' });
  }
});

// PUT: Atualizar senha
router.put('/:id/senha', async (req, res) => {
  const { senha } = req.body;
  const { id } = req.params;
  if (!senha) return res.status(400).json({ erro: 'Senha é obrigatória' });

  try {
    const db = await connectDB();
    const { ObjectId } = require('mongodb');
    await db.collection('accounts').updateOne(
      { _id: new ObjectId(id) },
      { $set: { senha } }
    );
    res.json({ status: 'Senha atualizada' });
  } catch (err) {
    console.error('[ERRO] ao atualizar senha:', err);
    res.status(500).json({ erro: 'Erro ao atualizar senha' });
  }
});

// DELETE: Remover conta
router.delete('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = require('mongodb');
    await db.collection('accounts').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ status: 'Conta deletada' });
  } catch (err) {
    console.error('[ERRO] ao deletar conta:', err);
    res.status(500).json({ erro: 'Erro ao deletar conta' });
  }
});

module.exports = router;

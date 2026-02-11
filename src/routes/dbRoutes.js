const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todas as contas
router.get('/contas', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM accounts ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('[ERRO] ao buscar contas:', err);
    res.status(500).json({ erro: 'Erro ao buscar contas' });
  }
});

// Atualizar senha de uma conta
router.post('/contas/:id/senha', async (req, res) => {
  const { senha } = req.body;
  const { id } = req.params;
  if (!senha) return res.status(400).json({ erro: 'Senha é obrigatória' });

  try {
    await db.query('UPDATE accounts SET senha = $1 WHERE id = $2', [senha, id]);
    res.json({ status: 'Senha atualizada com sucesso' });
  } catch (err) {
    console.error('[ERRO] ao atualizar senha:', err);
    res.status(500).json({ erro: 'Erro ao atualizar senha' });
  }
});

// Deletar conta
router.delete('/contas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM accounts WHERE id = $1', [id]);
    res.json({ status: 'Conta deletada' });
  } catch (err) {
    console.error('[ERRO] ao deletar conta:', err);
    res.status(500).json({ erro: 'Erro ao deletar conta' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db');

// exemplo: alterar campo da tabela
router.post('/alterar-cookie-null', async (req, res) => {
  try {
    await db.query(`ALTER TABLE accounts ALTER COLUMN cookie_json DROP NOT NULL;`);
    res.json({ status: 'cookie_json agora permite null' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Falha ao alterar tabela', detalhe: err.message });
  }
});

// outro exemplo: listar contas
router.get('/contas', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM accounts');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar contas' });
  }
});

module.exports = router;

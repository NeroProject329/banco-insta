require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());
app.use('/api/contas', require('./src/routes/accounts'));

app.listen(PORT, () => {
  console.log(`🚀 Admin MongoDB API rodando em http://localhost:${PORT}`);
});

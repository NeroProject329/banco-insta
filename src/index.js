require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());
app.use('/api', require('./routes/dbRoutes'));

app.listen(PORT, () => {
  console.log(`🛠️ Admin DB API rodando em http://localhost:${PORT}`);
});

const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const dbRoutes = require('./routes/dbRoutes');
app.use('/db', dbRoutes);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`🛠️ Mini DB Admin rodando na porta ${PORT}`);
});

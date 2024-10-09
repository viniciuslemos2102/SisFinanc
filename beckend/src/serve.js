// backend/server.js
const express = require('express');
const cors = require('cors');
const gastosRoutes = require('./routes/gastos');

const app = express();
require('./utils/cron'); // Adicione esta linha

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', gastosRoutes);


app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});

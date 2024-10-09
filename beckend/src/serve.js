// server.js
const express = require('express');
const cors = require('cors');
const gastosRoutes = require('./routes/gastos'); // Ajuste o caminho conforme necessário

const app = express();
app.use(cors());
app.use(express.json()); // Para analisar JSON no corpo das requisições

// Integrar as rotas
app.use('/api', gastosRoutes);

// Configurar a porta do servidor
const PORT = process.env.PORT || 3001;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

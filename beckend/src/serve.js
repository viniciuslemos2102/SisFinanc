// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const gastosRoutes = require('./routes/gastos');
const carneRoutes = require('./routes/carneRoutes');
const estoqueRoutes = require('./routes/estoque');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');
const authenticateUser = require('./middleware/authenticate'); // Middleware de autenticação

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const app = express();
app.use(cors());
app.use(express.json()); // Para analisar JSON no corpo das requisições

// Rotas públicas (sem autenticação)
app.use('/api/auth', authRoutes);

// Rotas protegidas (com autenticação)
app.use('/api/gastos', authenticateUser, gastosRoutes);
app.use('/api/carnes', authenticateUser, carneRoutes);
app.use('/api/estoque', authenticateUser, estoqueRoutes);
app.use('/api/protegido', authenticateUser, protectedRoutes);

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor', error: err.message });
});

// Configurar a porta do servidor
const PORT = process.env.PORT || 3001;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

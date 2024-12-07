const express = require('express');
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json()); // Para analisar JSON no corpo das requisições

// Verifica se o JWT_SECRET está configurado
if (!process.env.JWT_SECRET) {
  console.error('Erro: JWT_SECRET não está configurado no arquivo .env');
  process.exit(1);
}

// Registra as rotas
app.use('/api', routes);

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('Erro capturado:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno no servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Configura a porta
const PORT = process.env.PORT || 3001;

console.log('JWT Secret:', process.env.JWT_SECRET);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
  console.log(`JWT Secret configurado: ${!!process.env.JWT_SECRET}`);
});

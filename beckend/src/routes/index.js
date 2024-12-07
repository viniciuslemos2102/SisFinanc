const express = require('express');
const authRoutes = require('./auth');
const gastosRoutes = require('./gastos');
const carneRoutes = require('./carneRoutes');
const estoqueRoutes = require('./estoque');
const protectedRoutes = require('./protectedRoutes');
const authenticateUser = require('../middleware/authenticate');

const router = express.Router();

// Rotas públicas
router.use('/auth', authRoutes);

// Rotas protegidas
router.use('/gastos', authenticateUser, gastosRoutes);
router.use('/carnes', authenticateUser, carneRoutes);
router.use('/estoque', authenticateUser, estoqueRoutes);
router.use('/protegido', authenticateUser, protectedRoutes);

module.exports = router;

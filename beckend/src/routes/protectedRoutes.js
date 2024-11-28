// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();

// Rota protegida de exemplo
router.get('/', (req, res) => {
  // O usuário autenticado está disponível no req.user
  res.status(200).json({
    message: `Bem-vindo(a) à rota protegida, ${req.user.username}!`,
    user: req.user,
  });
});

module.exports = router;

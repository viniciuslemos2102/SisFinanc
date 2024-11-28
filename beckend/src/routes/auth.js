// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registrar novo usuário
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!['churrasqueiro', 'tecnico'].includes(role)) {
      return res.status(400).json({ message: 'Role inválido' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
});

// routes/auth.js (continuação)
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Senha inválida' });
  
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        'seu_segredo_jwt',
        { expiresIn: '8h' }
      );
  
      res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao autenticar', error });
    }
  });
    
module.exports = router;

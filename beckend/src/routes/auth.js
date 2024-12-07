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
    console.log('Tentando logar com:', username);

    // Busca o usuário no banco
    const user = await User.findOne({ where: { username } });
    console.log('Usuário encontrado:', user);

    if (!user) {
      console.log('Usuário não encontrado.');
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Compara a senha fornecida com o hash no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Senha válida:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Senha inválida.');
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'seu_segredo_jwt',
      { expiresIn: '8h' }
    );

    console.log('Login bem-sucedido.');
    return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


    
module.exports = router;

// routes/estoque.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Estoque = require('../models/Estoque');

const router = express.Router();

// Configurar multer para upload de fotos
const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post('/estoque', upload.single('foto'), async (req, res) => {
  try {
    const { estoque_inicial, chegada, estoque_final, data } = req.body;
    const foto = req.file ? req.file.path : null;

    // Cálculo da diferença
    const diferenca = Number(estoque_inicial) + Number(chegada || 0) - Number(estoque_final);

    // Criar ou atualizar estoque
    const novoEstoque = await Estoque.create({
      estoque_inicial,
      chegada: chegada || null,
      estoque_final,
      diferenca,
      foto,
      data,
    });

    return res.status(201).json(novoEstoque);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao salvar estoque' });
  }
});

module.exports = router;

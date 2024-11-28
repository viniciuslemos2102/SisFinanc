// routes/estoque.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Estoque = require('../models/Estoque');
const authenticateUser = require('../middleware/authenticate');


const router = express.Router();

// Configurar multer para upload de fotos
const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post('/estoque', authenticateUser, upload.single('foto'), async (req, res) => {
  try {
    const { estoque_inicial, chegada, estoque_final, data } = req.body;
    const created_by = req.user.username; // Obtido via token de autenticação.
    const foto = req.file ? req.file.path : null;

    const diferenca = Number(estoque_inicial) + Number(chegada || 0) - Number(estoque_final);

    const novoEstoque = await Estoque.create({
      estoque_inicial,
      chegada: chegada || null,
      estoque_final,
      diferenca,
      foto,
      data,
      created_by,
    });

    return res.status(201).json(novoEstoque);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar estoque', error });
  }
});

router.get('/estoque', authenticateUser, async (req, res) => {
  try {
    const estoques = await Estoque.findAll();
    return res.status(200).json(estoques);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar estoques', error });
  }
});

router.put('/estoque/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { estoque_inicial, chegada, estoque_final, data } = req.body;

    const estoque = await Estoque.findByPk(id);
    if (!estoque) return res.status(404).json({ message: 'Estoque não encontrado' });

    const diferenca = Number(estoque_inicial) + Number(chegada || 0) - Number(estoque_final);

    await estoque.update({
      estoque_inicial,
      chegada: chegada || null,
      estoque_final,
      diferenca,
      data,
    });

    return res.status(200).json(estoque);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar estoque', error });
  }
});


module.exports = router;

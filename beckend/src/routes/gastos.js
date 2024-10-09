const express = require('express');
const Gasto = require('../models/Gasto');
const router = express.Router();

// Rota para criar um novo gasto
router.post('/', async (req, res) => {
  try {
    const { data, valor, recebedor, tipo, subtitulo, unidade, referencia } = req.body;
    const novoGasto = await Gasto.create({
      data,
      valor,
      recebedor,
      tipo,
      subtitulo,
      unidade,
      referencia,
    });
    res.status(201).json(novoGasto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar gasto' });
  }
});

// Rota para obter todos os gastos
router.get('/', async (req, res) => {
  try {
    const gastos = await Gasto.findAll();
    res.status(200).json(gastos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar gastos' });
  }
});

// Rota para obter gastos filtrados
router.get('/filter', async (req, res) => {
  const { startDate, endDate, tipo, unidade } = req.query;
  let query = {};
  
  if (startDate && endDate) {
    query.data = { [Op.gte]: new Date(startDate), [Op.lte]: new Date(endDate) };
  }
  if (tipo) {
    query.tipo = tipo;
  }
  if (unidade) {
    query.unidade = unidade;
  }
  
  try {
    const gastosFiltrados = await Gasto.findAll({ where: query });
    res.status(200).json(gastosFiltrados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar gastos filtrados' });
  }
});

module.exports = router;

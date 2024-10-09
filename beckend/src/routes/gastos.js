const express = require('express');
const { Op } = require('sequelize'); // Importando Op do Sequelize
const Gasto = require('../models/Gasto'); // Ajuste o caminho conforme necessário
const router = express.Router();

// Criar um novo gasto
router.post('/', async (req, res) => {
  console.log("Dados recebidos:", req.body); // Adicione esta linha para verificar os dados
  try {
    if (isNaN(req.body.valor) || req.body.valor === "") {
      return res.status(400).json({ error: 'O valor deve ser um número' });
    }
    const novoGasto = await Gasto.create({
      ...req.body,
      valor: parseFloat(req.body.valor), // Certifique-se de que valor é numérico
    });
    res.status(201).json(novoGasto);
  } catch (error) {
    console.error("Erro ao criar gasto:", error);
    res.status(500).json({ error: 'Erro ao criar gasto' });
  }
});

// Obter todos os gastos
router.get('/', async (req, res) => {
  try {
    const gastos = await Gasto.findAll();
    res.json(gastos);
  } catch (error) {
    console.error("Erro ao buscar gastos:", error);
    res.status(500).json({ error: 'Erro ao buscar gastos' });
  }
});

// Atualizar um gasto existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.valor && isNaN(req.body.valor)) {
      return res.status(400).json({ error: 'O valor deve ser um número' });
    }
    const [updated] = await Gasto.update(req.body, { where: { id } });
    if (updated) {
      const updatedGasto = await Gasto.findOne({ where: { id } });
      res.json(updatedGasto);
    } else {
      res.status(404).json({ error: 'Gasto não encontrado' });
    }
  } catch (error) {
    console.error("Erro ao atualizar gasto:", error);
    res.status(500).json({ error: 'Erro ao atualizar gasto' });
  }
});

// Remover um gasto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Gasto.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send(); // Sucesso, mas sem conteúdo
    } else {
      res.status(404).json({ error: 'Gasto não encontrado' });
    }
  } catch (error) {
    console.error("Erro ao remover gasto:", error);
    res.status(500).json({ error: 'Erro ao remover gasto' });
  }
});

// Rota para obter gastos filtrados
router.get('/filter', async (req, res) => {
  const { startDate, endDate, tipo, unidade } = req.query;
  let query = {};
  
  // Filtrar por data
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ error: 'Datas inválidas' });
    }
    query.data = { [Op.gte]: start, [Op.lte]: end };
  }
  
  // Filtrar por tipo
  if (tipo) {
    query.tipo = tipo;
  }
  
  // Filtrar por unidade
  if (unidade) {
    query.unidade = unidade;
  }
  
  try {
    const gastosFiltrados = await Gasto.findAll({ where: query });
    res.status(200).json(gastosFiltrados);
  } catch (error) {
    console.error("Erro ao buscar gastos filtrados:", error);
    res.status(500).json({ error: 'Erro ao buscar gastos filtrados' });
  }
});

module.exports = router;

// controllers/carneController.js
const Carne = require('../models/Carne');

exports.adicionarCarne = async (req, res) => {
  try {
    const { compras, carnesPrime, fixos, variaveis, passagens, naoIdentificados, comprasEmDinheiro, extra } = req.body;
    const carne = await Carne.create({ compras, carnesPrime, fixos, variaveis, passagens, naoIdentificados, comprasEmDinheiro, extra });
    res.status(201).json(carne);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listarCarnes = async (req, res) => {
  try {
    const carnes = await Carne.findAll();
    res.status(200).json(carnes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// models/Carne.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carne = sequelize.define('Carne', {
  compras: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  carnesPrime: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fixos: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  variaveis: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  passagens: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  naoIdentificados: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comprasEmDinheiro: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  extra: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Sincronizar o modelo com o banco de dados
Carne.sync();

module.exports = Carne;

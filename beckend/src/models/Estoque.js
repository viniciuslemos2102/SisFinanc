// models/Estoque.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configure sua conexão ao DB.

const Estoque = sequelize.define('Estoque', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  estoque_inicial: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  chegada: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  estoque_final: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  diferenca: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true, // Caminho para a foto.
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Estoque;

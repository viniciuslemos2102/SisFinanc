// src/models/Gasto.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho conforme necessário

class Gasto extends Model {}

Gasto.init(
  {
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    recebedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitulo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Gasto',
    tableName: 'Gastos',
    timestamps: true,
  }
);

module.exports = Gasto;

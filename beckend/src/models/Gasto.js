const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const Gasto = sequelize.define('Gasto', {
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
    type: DataTypes.ENUM('fixo', 'variável'),
    allowNull: false,
  },
  subtitulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unidade: {
    type: DataTypes.ENUM('Prime', 'Gastro'),
    allowNull: false,
  },
  referencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING, // Novo campo para categorias
    allowNull: true,
  },
});

// Sincroniza o modelo com o banco de dados
sequelize.sync();

module.exports = Gasto;

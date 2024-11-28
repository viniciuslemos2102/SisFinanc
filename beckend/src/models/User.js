// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuração do banco.

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('churrasqueiro', 'tecnico'),
    allowNull: false,
  },
}, {
  tableName: 'Users', // Certifique-se de que o nome da tabela está correto.
});

module.exports = User;

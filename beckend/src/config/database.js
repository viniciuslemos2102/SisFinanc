// src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_development', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

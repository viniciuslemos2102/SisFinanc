'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carnes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      compras: {
        type: Sequelize.FLOAT
      },
      carnesPrime: {
        type: Sequelize.FLOAT
      },
      fixos: {
        type: Sequelize.FLOAT
      },
      variaveis: {
        type: Sequelize.FLOAT
      },
      passagens: {
        type: Sequelize.FLOAT
      },
      naoIdentificados: {
        type: Sequelize.FLOAT
      },
      comprasEmDinheiro: {
        type: Sequelize.FLOAT
      },
      extra: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carnes');
  }
};
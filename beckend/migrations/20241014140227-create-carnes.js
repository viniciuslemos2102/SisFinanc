'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carnes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      compras: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      carnesPrime: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fixos: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      variaveis: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      passagens: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      naoIdentificados: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      comprasEmDinheiro: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      extra: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('carnes');
  },
};

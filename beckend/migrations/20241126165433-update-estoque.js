'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('estoques', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      estoque_inicial: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      chegada: {
        type: Sequelize.FLOAT,
        allowNull: true, // Campo opcional.
      },
      estoque_final: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      diferenca: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      foto: {
        type: Sequelize.STRING, // Caminho para a imagem.
        allowNull: true,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('estoques');
  },
};

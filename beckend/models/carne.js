'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carne extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Carne.init({
    compras: DataTypes.FLOAT,
    carnesPrime: DataTypes.FLOAT,
    fixos: DataTypes.FLOAT,
    variaveis: DataTypes.FLOAT,
    passagens: DataTypes.FLOAT,
    naoIdentificados: DataTypes.FLOAT,
    comprasEmDinheiro: DataTypes.FLOAT,
    extra: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Carne',
  });
  return Carne;
};
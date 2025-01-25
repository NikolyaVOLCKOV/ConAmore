'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tests.init({
    somevar: DataTypes.INTEGER,
    anothervar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tests',
  });
  return tests;
};
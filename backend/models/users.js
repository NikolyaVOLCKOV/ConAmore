'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        email:{
            type: DataTypes.STRING ,
            allowNull: false,
        },
        
        password_hash:{
            type: DataTypes.STRING ,
            allowNull: false,
        },

        name:{
            type: DataTypes.STRING ,
            allowNull: false,
        },

        phone:{
            type: DataTypes.STRING ,
            allowNull: false,
        },

        created_at:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,

            allowNull: false,
        },

        role: {
            type: DataTypes.STRING,
            defaultValue: 'user',
        },

        confirm_reg: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
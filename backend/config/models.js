const {sequelize} = require('./db.js')
const { DataTypes } = require('sequelize');

//Здксь будут все модели

const products = sequelize.define(
    'products',
    {
        article:{
            type: DataTypes.INTEGER,
            defaultValue: sequelize.literal("nextval('users_id_seq'::regclass)"),
            allowNull: false,
            primaryKey: true
        },
        product_name: {type: DataTypes.TEXT,  allowNull: false},
        product_description: {type: DataTypes.TEXT,  allowNull: false},
    },
    {
        timestamps: false,
        tableName: 'products'
    }
 )

 module.exports = {
    products
 }
const {sequelize} = require('../db.js')
const { DataTypes } = require('sequelize');
const { features_ex } = require('./features.js')

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

        product_name: {
            type: DataTypes.TEXT,  
            allowNull: false
        },

        product_description: {
            type: DataTypes.TEXT,  
            allowNull: false
        },
    },

    {
        timestamps: false,
        tableName: 'products'
    }
 )

 const product_features = sequelize.define(
    'product_features',
    {
        article: {
            type: DataTypes.INTEGER,
            defaultValue: sequelize.literal("nextval('users_id_seq'::regclass)"),
            allowNull: false,
            references: {
                model: products,
                key: 'article',
            }
        },

        feature_value_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: sequelize.literal("nextval('users_id_seq'::regclass)"),
            references: {
                model: features_ex,
                key: 'feature_value_id'
            }
        }
    },
    {
        timestamps: false,
        tableName: 'product_features'
    }
 )

 module.exports = {
    products,
    product_features
 }
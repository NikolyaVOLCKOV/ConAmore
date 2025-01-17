const {sequelize} = require('../db.js')
const { DataTypes } = require('sequelize');

const features = sequelize.define(
    'features',
    {
        feature_id: {
        type: DataTypes.INTEGER,
        defaultValue: sequelize.literal("nextval('users_id_seq'::regclass)"),
        allowNull: false,
        primaryKey: true
        },

        feature_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },

    {
        timestamps: false,
        tableName: 'products'
    }
)

const features_ex = sequelize.define(
    'features_ex',
    {
        feature_value:{
            type: DataTypes.TEXT,
            allowNull: false
        },

        feature_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: features,
                key: 'feature_id'
            }
        },
        feature_value_id:{
            type: DataTypes.INTEGER,
            defaultValue: sequelize.literal("nextval('users_id_seq'::regclass)"),
            allowNull: false,
            primaryKey: true
        }
    },

    {
        timestamps: false,
        tableName: 'products'
    }
)

module,exports = {
    features,
    features_ex
}
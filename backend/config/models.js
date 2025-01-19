const { use } = require('../routers/products.js');
const {sequelize} = require('./db.js');
const { DataTypes, DATE } = require('sequelize');

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Соединение с БД было успешно установлено(sequelize)');
    } catch (e) {
      console.log('Невозможно выполнить подключение к БД(sequelize): ', e);
    }
  })();

// проверка синхронизации 
// sequelize.sync({ force: false })  // force: false означает, что таблицы не будут пересозданы
//   .then(() => {
//     console.log('Все модели синхронизированы с базой данных');
//   })
//   .catch((err) => {
//     console.error('Ошибка при синхронизации:', err);
//   });

const features = sequelize.define(
    'features',
    {
        feature_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE',
        },
        feature_value_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,

        }
    },

    {
        timestamps: false,
        tableName: 'products'
    }
)

const products = sequelize.define(
    'products',
    {
        article: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, // Используйте autoIncrement для первичного ключа
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
);

const product_features = sequelize.define(
    'product_features',
    {
        article: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: products, // Связь с моделью 'products'
                key: 'article',
            },
            onDelete: 'CASCADE', // Укажите поведение при удалении
            onUpdate: 'CASCADE',
            primaryKey: true // Укажите поведение при обновлении
        },
        feature_value_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: features_ex, // Связь с моделью 'features_ex'
                key: 'feature_value_id'
            },
            onDelete: 'CASCADE', // Укажите поведение при удалении
            onUpdate: 'CASCADE',
            primaryKey: true // Укажите поведение при обновлении
        }
    },
    {
        timestamps: false,
        tableName: 'product_features'
    }
);

const product_images = sequelize.define(
    'product_images',
    {
        product_article:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: products, // Связь с моделью 'products'
                key: 'article',
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE',
            primaryKey: true
        },
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        image_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_type: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_buffer: {
            type: DataTypes.BLOB,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'product_images'
    }
)

const users = sequelize.define(
    'users',
    {
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

    },
    {
        timestamps: false,
        tableName: 'users'
    }
)

const orders = sequelize.define(
    'orders',
    {
        user_id:{
            type: DataTypes.STRING,
            references:{
                model: users,
                key: 'id'
            },
            primaryKey: true,
            allowNull: false
        },
        product_article:{
            type: DataTypes.STRING,
            references:{
                model: products,
                key: 'article'
            },
            primaryKey: true,
            allowNull: false
        },
        ordered_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        status:{
            type: DataTypes.DATE,
            defaultValue: 'Оформлен',
            allowNull: false
        }

    },
    {
        timestamps: false,
        tableName: 'orders'
    }
)

const favorites = sequelize.define(
    'favorites',
    {
        article: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: products, 
                key: 'article',
            },
            onDelete: 'CASCADE', // Укажите поведение при удалении
            onUpdate: 'CASCADE',
            primaryKey: true // Укажите поведение при обновлении
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users, 
                key: 'id'
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE',
            primaryKey: true 
        }
    },
    {
        timestamps: false,
        tableName: 'favorites'
    }
)

const cart = sequelize.define(
    'favorites',
    {
        article: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: products, 
                key: 'article',
            },
            onDelete: 'CASCADE', // Укажите поведение при удалении
            onUpdate: 'CASCADE',
            primaryKey: true // Укажите поведение при обновлении
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users, 
                key: 'id'
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE',
            primaryKey: true 
        }
    },
    {
        timestamps: false,
        tableName: 'favorites'
    }
)


module.exports = {
    products,
    product_features,
    features,
    features_ex,
    product_images,
    users,
    orders,
    favorites,
    cart,

};

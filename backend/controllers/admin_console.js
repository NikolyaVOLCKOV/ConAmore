const { pool, sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

// Проверка соединения
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Соединение с БД было успешно установлено(sequelize)');
    } catch (e) {
      console.log('Невозможно выполнить подключение к БД(sequelize): ', e);
    }
  })();

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

//  sequelize.sync().then(result=>{
//     console.log(result);
//   })
//   .catch(err=> console.log(err));

sequelize.sync({ force: false })  // force: false означает, что таблицы не будут пересозданы
  .then(() => {
    console.log('Все модели синхронизированы с базой данных');
  })
  .catch((err) => {
    console.error('Ошибка при синхронизации:', err);
  });

// TODO переписать всё с помощью ORM
class Product_Controllers{

    // async AddProduct(req, res){ 
    //     const client = await pool.connect();
    //     const {product_name, product_description, product_features} = req.body;

    //     try{

    //         if (!product_name || !product_description || !product_features){
    //             return res.status(404).json({message: "Не все данные о товаре указаны"})
    //         }

    //         await client.query("INSERT INTO products (product_name, product_description, product_features) VALUES($1, $2, $3)", 
    //             [product_name, product_description, product_features]
    //         );

    //         return res.status(200).json({message:"Товар успешно добавлен"});
    //     }
    //     catch(err){
    //         console.error(err);
    //     }
    //     finally{
    //         client.release();
    //     }
    // }

    async AddProduct(req, res){ 
        const {product_name, product_description} = req.body;

        try{

            if (!product_name || !product_description){
                return res.status(404).json({message: "Не все данные о товаре указаны"})
            }

            const product_info = await products.create({
                product_name: product_name,
                product_description: product_description
            })

            console.log(product_info.toJSON())
            return res.status(200).json({message:"Товар успешно добавлен"});
        }
        catch(err){
            console.error(err);
        }
    }
    
    async ChangeProductInfo(req, res){ 
        const client = await pool.connect();
        const {product_name, product_description, product_features} = req.body;
        
        try{

            await client.query("UPDATE products SET product_name = $1, product_description = $2, product_features = $3", 
                [product_name, product_description, product_features]
            );

            return res.status(200).json({message:"Данные о товаре успешно обновлены"});
        }
        catch(err){
            console.error(err);
        }
        finally{
            client.release();
        }

    }

    async DeleteProduct(req, res){  
        const client = await pool.connect();
        const article = req.body.article;

        try{
            if(!product_article){
                return res.status(404).json({message:"Товар с таким артикулом не найден"})
            }

            await client.query('DELETE FROM products WHERE article = $1',
                [article]
            );

            return res.status(200).json({message:"Товар успешно удалён"});
        }
        catch(err){
            console.error(err);
        }
        finally{
            client.release();
        }
    }
    
    async AddImages(req, res){
        const client = await pool.connect();
        const article = req.body.article;
        try {
            await client.query('BEGIN');
            
            // Подготовка параметризованного запроса
            const query = `
              INSERT INTO product_images (image_name, image_buffer, image_type, product_article) VALUES($1,$2,$3,$4)
            `;
        
            // Обработка каждого файла в массиве
            for (const file of req.files) {
                // console.log(req.files);
                // console.log(file.originalname)
                console.log(file.buffer)
              await client.query(query, [file.originalname, file.buffer, file.mimetype, article]);
            }

            await client.query('COMMIT');
            res.send('Файлы успешно загружены и сохранены в базе данных');
          } catch (err) {
            await client.query('ROLLBACK');
            console.error(err);
            res.status(500).send('Ошибка при сохранении файлов');
          } finally {
            client.release();
          }
    }

    async ReturnImages(req, res){
        const client = await pool.connect();
        const article = req.body.article;

        try{
            const result = await client.query('SELECT image_buffer, image_type FROM product_images WHERE product_article = $1',
                [article]
            )

            const images = result.rows.map(row =>({
                ImageData: row.image_buffer,
                ImageType: row.image_type
            }))
            res.json(images)         
        }
        catch(err){
            console.error(err)
        }
        finally{
            client.release()
        }

    }

}

module.exports = new Product_Controllers();
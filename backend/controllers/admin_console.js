const { pool, sequelize } = require('../config/db.js');
const { products, product_features } = require('../config/models.js');

// TODO переписать всё с помощью ORM
class Product_Controllers{

    async AddProduct(req, res){ 
        const {product_name, product_description, feature_value_id} = req.body;
        const t = await sequelize.transaction()

        try{
            // if (!product_name || !product_description){
            //     return res.status(404).json({message: "Не все данные о товаре указаны"})
            // }

            const product_info = await products.create(
                {
                    product_name: product_name,
                    product_description: product_description
                },
                { transaction: t }
            )

            const productFeaturesData = feature_value_id.map(feature_value_id => ({
                article: product_info.article,
                feature_value_id: feature_value_id
            }));
            console.log(productFeaturesData)

            const product_features_info = await product_features.bulkCreate(
                productFeaturesData,
                { transaction: t }
            )

            console.log(product_info.toJSON());
            console.log(product_features_info);

            await t.commit()
            return res.status(200).json({message:"Товар успешно добавлен"});
        }
        catch(err){
            await  t.rollback();
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
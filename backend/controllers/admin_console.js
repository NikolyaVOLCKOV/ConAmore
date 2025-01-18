const { sequelize } = require('../config/db.js');
const { products, product_features, product_images } = require('../config/models.js');
const { trace } = require('../routers/products.js');

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
    
    async UpdateProductInfo(req, res){ 
        const {product_name, product_description, article} = req.body;
        const t = await sequelize.transaction();
        
        try{
            const UpdatePI = await products.update(
                {
                    product_name: product_name, 
                    product_description: product_description
                },
                {
                    where:{article: article},
                    transaction: t
                }
            )

            // console.log(UpdatePI)
            await t.commit();
            return res.status(200).json({message:"Данные о товаре успешно обновлены"});
        }
        catch(err){
            await  t.rollback();
            console.error(err);
        }
    }

    async DeleteProduct(req, res){  
        const article = req.body.article;
        const t = await sequelize.transaction();

        try{
            if(!article){
                return res.status(404).json({message:"Товар с таким артикулом не найден"})
            }

            const DeletefromPF = await product_features.destroy(
                {
                    where: {
                        article: article
                    },
                    transaction: t
                }
            )

            const DeletefromP = await products.destroy(
                {
                    where: {
                        article: article
                    },
                    transaction: t
                }
            )

            await t.commit();
            return res.status(200).json({message:"Товар успешно удалён"});
        }
        catch(err){
            await t.rollback();
            console.error(err);
        }
    }
    
    async AddImages(req, res){
        const article = req.body.article;
        const t = await sequelize.transaction();

        try {
            console.log(req.files);
            
            // Обработка каждого файла в массиве
            for (const file of req.files) {
                // console.log(file.originalname)
                // console.log(file.buffer)
                const AddImg = await product_images.create(
                    {
                        product_article: article,
                        image_name: file.originalname,
                        image_type:  file.mimetype,
                        image_buffer: file.buffer,
                    },
                    { transaction: t }
                )
            }
 
            await t.commit()
            res.send('Файлы успешно загружены и сохранены в базе данных');
          }
          catch (err) {
            await t.rollback();
            console.error(err);
            res.status(500).send('Ошибка при сохранении файлов');
          } 
    }

    async ReturnImages(req, res){
        const article = req.body.article;

        try{
            const ReturnImgs = await product_images.findAll(
                {
                    where:{
                        product_article: article
                    }
                },
            )
            // console.log(ReturnImgs)
            const images = ReturnImgs.map(row =>({
                ImageData: row.image_buffer.toString('base64'),
                ImageType: row.image_type
            }))

            // console.log(images)
            return res.status(200).json(images)       
        }
        catch(err){
            console.error(err)
        }
    }

}

module.exports = new Product_Controllers();
const { pool, sequelize } = require('../../config/db.js');
const { products, product_features, features_ex } = require('../../config/models.js');
const { Op } = require('sequelize')

class FilterControlles{

    async ProductFilter(req, res) {
        const client = await pool.connect();
        const { filters } = req.body; 
        const filters_length = filters.length;

        if (!filters || filters.length === 0) {
            return res.status(400).json({ message: "Не указаны фильтры для поиска" });
        }
    
        try {

            const result = await product_features.findAll({
                attributes: [
                    [sequelize.col('product.article'), 'article'],
                    [sequelize.col('product.product_name'), 'product_name'], // Используем alias 'product' для продукта
                    [sequelize.fn('array_agg', sequelize.col('featureEx.feature_value')), 'feature_value'] // Агрегируем значения feature_value
                ],
                include: [
                    {
                        model: products,
                        as: 'product', // Указываем alias 'product', который задан в ассоциации
                        attributes: [], // Исключаем лишние атрибуты, если они не нужны
                        required: true,
                    },
                    {
                        model: features_ex,
                        as: 'featureEx', // Указываем alias 'featureEx', который задан в ассоциации
                        attributes: [], // Исключаем лишние атрибуты, если они не нужны
                        required: true,
                    }
                ],
                where: {
                    '$product_features.feature_value_id$': {
                        [Op.any]: filters, // Фильтрация значений feature_value_id
                    },
                },
                group: ['product.article', 'product.product_name'], // Группировка по статьям и именам продуктов
                having: sequelize.where(
                    sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('product_features.feature_value_id'))),
                    {
                        [Op.eq]: filters_length, // Условие для количества уникальных значений
                    }
                ),
            });
            
            return res.status(200).json(result);
        } catch (err) {
            console.error("Ошибка выполнения запроса:", err);
            return res.status(500).json({ message: "Произошла ошибка сервера" });
        }
        finally{
            client.release()
        }
    }
}

module.exports = new FilterControlles();
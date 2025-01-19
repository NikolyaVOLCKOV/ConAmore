const { pool, sequelize } = require('../../config/db.js');
const { products, product_features, features_ex } = require('../../config/models.js');

class FilterControlles{

    async ProductFilter(req, res) {
        const client = await pool.connect();
        const { filters } = req.body; 
        const filters_length = filters.length;

        if (!filters || filters.length === 0) {
            return res.status(400).json({ message: "Не указаны фильтры для поиска" });
        }
    
        try {
            const result = await client.query('SELECT p.article, p.product_name, array_agg(fe.feature_value) AS feature_value FROM product_features pf JOIN products p ON pf.article = p.article JOIN features_ex fe ON pf.feature_value_id = fe.feature_value_id WHERE pf.feature_value_id = ANY($1::int[])GROUP BY p.article, p.product_name HAVING COUNT(DISTINCT pf.feature_value_id) = $2;',
                [filters, filters_length]
            );
    
            return res.status(200).json(result.rows);
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
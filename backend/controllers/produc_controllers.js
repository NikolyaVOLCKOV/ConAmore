const { pool } = require('../config/db.js');

class Product_Controllers{

    async AddProduct(req, res){ //Я полагаю это для админки?
        const client = await pool.connect();
        const {product_name, product_description, product_features} = req.body;

        try{

            if (!product_name || !product_description || !product_features){
                return res.status(404).json({message: "Не все данные о товаре указаны"})
            }

            await client.query("INSERT INTO products (product_name, product_description, product_features) VALUES($1, $2, $3, $4)", 
                [product_name, product_description, product_features]
            );

            return res.status(200).json({message:"Товар успешно добавлен"});
        }
        catch(err){
            console.error(err);
        }
        finally{
            client.release();
        }
    }
    
    async ChangeProductInfo(req, res){  //Ну это точно для админки
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

    async DeleteProduct(req, res){  //И это тоже для админки?
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

    async AddToCart(req, res){
        const client = await pool.connect();
        const user_id = req.id;
        const product_article = req.body.article;

        try{
            await client.query('INSERT INTO cart(user_id, product_article) VALUES($1, $2)',
                [user_id, product_article]
            )

            return res.status(200).json({message:"Товар добавлен в корзину"})
        }
        catch(err){
            console.log(err);
        }
        finally{
            client.release();
        }
    }

    async AddToFavorites(req, res){
        const client = await pool.connect();
        const user_id = req.id;
        const product_article = req.body.article;

        try{
            await client.query('INSERT INTO favorites(user_id, product_article) VALUES($1, $2)',
                [user_id, product_article]
            )

            return res.status(200).json({message:"Товар добавлен в избранное"})
        }
        catch(err){
            console.log(err);
        }
        finally{
            client.release();
        }
    }

    async DeleteProductFromCart(req, res){  
        const client = await pool.connect();
        const user_id = req.id;
        const article = req.body.article;

        try{
            await client.query('DELETE FROM cart WHERE user_id = $1 AND product_article = $2',
                [user_id, article]
            );

            return res.status(200).json({message:"Товар успешно удалён из корзины"});
        }
        catch(err){
            console.error(err);
        }
        finally{
            client.release();
        }
    }

    async DeleteProductFromFAvorites(req, res){  
        const client = await pool.connect();
        const user_id = req.id;
        const article = req.body.article;

        try{
            await client.query('DELETE FROM favorites WHERE user_id = $1 AND product_article = $2',
                [user_id, article]
            );

            return res.status(200).json({message:"Товар успешно удалён из избранного"});
        }
        catch(err){
            console.error(err);
        }
        finally{
            client.release();
        }
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Фильтры товаров
    
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

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Поиск товаров


}

module.exports = new Product_Controllers();
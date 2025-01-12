const { pool } = require('../../config/db.js');

class FavoritesControllers{

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

}

module.exports = new FavoritesControllers()
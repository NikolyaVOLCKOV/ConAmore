const { pool } = require('../../config/db.js');

class CartControllers{

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


}

module.exports = new CartControllers()
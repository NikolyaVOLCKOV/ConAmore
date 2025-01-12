const { pool } = require('../../config/db.js');

class OrdersControllers{

    async MakeOrder(req, res){
        const client = await pool.connect();
        const user_id = req.id;
        const product_article = req.body.article;

        try{

            await client.query('INSERT INTO orders (user_id, product_article VALUES($1, $2)',
                [user_id, product_article]
            )

            return res.status(200).json({message:"Ваш заказ оформлен"})
        }
        catch(err){
            console.error(err);
        }
        finally{
            client.release();
        }
    }

    async UpdateOrderStatus(req, res){
        const client = await pool.connect();
        const user_id = req.id;
        const { product_article, status } = req.body;

        try{

            await client.query('UPDATE orders SET status = $1 WHERE user_id = $2 AND product_article = $3',
                [status, user_id, product_article]
            )

            return res.status(200).json({message:"Ваш заказ оформлен"})
        }
        catch(err){
            console.error(err);
        }
        finally{
            client.release();
        }

    }

}

module.exports = new OrdersControllers()
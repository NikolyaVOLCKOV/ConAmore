const { cart } = require('../../config/models.js');
const { sequelize } = require('../../config/db.js');
const { where } = require('sequelize');

class CartControllers{

    async AddToCart(req, res){
        const user_id = req.id;
        const product_article = req.body.article;
        const t = await sequelize.transaction();

        try{
            const addcart = await cart.create(
                {
                    user_id: user_id,
                    product_article: product_article
                },
                { transaction: t}
            )

            await t.commit()
            return res.status(200).json({message:"Товар добавлен в корзину"})
        }
        catch(err){
            await t.rollback()
            console.log(err);
        }
    }

    async DeleteProductFromCart(req, res){  
        const user_id = req.id;
        const article = req.body.article;
        const t = await sequelize.transaction();

        try{
            const deletecart = await cart.destroy(
                {
                    where: {
                        user_id: user_id,
                        product_article: article
                    },
                    transaction: t
                },
            )

            await t.commit()
            return res.status(200).json({message:"Товар успешно удалён из корзины"});
        }
        catch(err){
            await t.rollback()
            console.error(err);
        }
    }

}

module.exports = new CartControllers()
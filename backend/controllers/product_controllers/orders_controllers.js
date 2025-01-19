const { orders } = require('../../config/models.js');
const { sequelize } = require('../../config/db.js');
const { where } = require('sequelize');

class OrdersControllers{

    async MakeOrder(req, res){
        const user_id = req.id;
        const product_article = req.body.article;
        const t = await sequelize.transaction();

        try{
            const makeordr = await orders.create(
                { 
                    user_id: user_id,
                    product_article: product_article
                },
                { transaction: t}
            )

            await t.commit()
            return res.status(200).json({message:"Ваш заказ оформлен"})
        }
        catch(err){
            await t.rollback()
            console.error(err);
        }
    }

    async UpdateOrderStatus(req, res){
        const { product_article, status, user_id } = req.body;
        const t = await sequelize.transaction()

        try{
            const updateOstat = await orders.update(
                {
                    status: status,
                    where:{
                        user_id: user_id,
                        product_article: product_article
                    }
                },
                { transaction: t }
            )

            await t.commit()
            return res.status(200).json({message:`Статус заказа изменён на ${status}`})
        }
        catch(err){
            await t.rollback()
            console.error(err);
        }
    }

    async DeleteOrder(req, res){
        const {user_id, product_article} = req.body
        const t = await sequelize.transaction()

        try{
            const deleteO = await orders.destroy(
                {
                    where:{
                        user_id: user_id,
                        product_article: product_article
                    },
                    transaction: t
                },
            )

            await t.commit()
            return res.status(200).json({message:`Заказ ${product_article} удалён!`})
        }
        catch(err){
            await t.rollback()
            console.error(err);
        }
    }

}

module.exports = new OrdersControllers()
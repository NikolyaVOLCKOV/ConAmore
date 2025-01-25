const { favorites } = require('../../config/models.js');
const { sequelize } = require('../../config/db.js');
const { where } = require('sequelize');

class FavoritesControllers{

    async AddToFavorites(req, res){
        const user_id = req.id;
        const product_article = req.body.article;
        const t = await sequelize.transaction();

        try{
            const addFav = await favorites.create(
                { 
                    user_id: user_id,
                    product_article: product_article
                },
                { transaction: t }
            )

            await t.commit()
            return res.status(200).json({message:"Товар добавлен в избранное"})
        }
        catch(err){
            await t.rollback()
            console.log(err);
        }

    }

    async DeleteProductFromFAvorites(req, res){  
        const user_id = req.id;
        const article = req.body.article;
        const t = await sequelize.transaction();

        try{
            const deleteFav = await favorites.destroy(
                {
                    where:{
                        user_id: user_id,
                        product_article: article
                    },
                    transaction: t
                },
            )
      
            await t.commit()
            return res.status(200).json({message:"Товар успешно удалён из избранного"});
        }
        catch(err){
            await t.rollback()
            console.error(err);
        }
    }

}

module.exports = new FavoritesControllers()
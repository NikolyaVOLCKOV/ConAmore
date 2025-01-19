const { Op } = require('sequelize')
const { products } = require('../../config/models.js');

class SearchControllers{

    async SearchProduct(req, res){
        const inputData = req.body.inputData;   

        try{
            const searchp = await products.findAll(
                {
                    where:{
                        product_name: {
                            [Op.iLike]: `%${inputData}%`
                        }
                    }
                }
            )

            return res.status(200).json(searchp)
        }
        catch(err){
            console.log(err)
        }

    }
    
}

module.exports = new SearchControllers()
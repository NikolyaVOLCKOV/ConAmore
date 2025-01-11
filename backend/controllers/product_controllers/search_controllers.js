const { pool } = require('../../config/db.js');

class SearchControllers{

    async SearchProduct(req, res){
        const client = await pool.connect();
        const inputData = req.body.inputData;

        try{

            const result = await client.query('SELECT product_name FROM products WHERE product_name ILIKE $1',
                [inputData]
            )

            return res.status(200).json(result.rows)
        }
        catch(err){
            console.log(err)
        }
        finally{
            client.release()
        }
    }
    
}

module.exports = new SearchControllers()
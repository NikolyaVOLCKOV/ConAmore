const { pool } = require('../config/db.js')
const bcrypt = require('bcrypt')

const PasswordHasher = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(password, salt)
    
    return hash
}

const GetData = async (username) =>{
    const client = await pool.connect();
    try{
        const result = await client.query('SELECT password_hash, id, name, role, confirm_reg, email FROM users WHERE name = $1',
            [username]
        );
        return result.rows[0];
    }
    catch(err){
        console.error()
    }
    finally{
        client.release()
    }

}

module.exports = {
    PasswordHasher,
    GetData,
}
const { pool } = require('../config/db.js')
const bcrypt = require('bcrypt')

const PasswordHasher = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(password, salt)
    
    return hash
}

const GetData = async (mail) =>{
    const client = await pool.connect();
    try{
        const result = await client.query('SELECT name, password_hash, id, name, role, confirm_reg FROM users WHERE email = $1',
            [mail]
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
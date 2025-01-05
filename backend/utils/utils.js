const { pool } = require('../config/db.js')
const bcrypt = require('bcrypt')

const PasswordHasher = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(password, salt)
    
    return hash
}

module.exports = {
    PasswordHasher
}
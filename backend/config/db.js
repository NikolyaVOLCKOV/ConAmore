const { Pool } = require('pg');

const pool = new Pool({
    host: '92.255.78.34',
    port: 5432,
    user: 'postgres',
    password: '1111',
    database: 'con_amore'
})

module.exports = {
    pool,
};
const { Pool } = require('pg');
const { Sequelize } = require('sequelize')

//Я мог изменить на локальную базу данных
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1111',
    database: 'Con_Amore'
})

// Это для того чтобы sequelize работал именно с нашкй бд
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'postgres',
    username: 'postgres',
    password: '1111',
    database:'Con_Amore',
    logging: console.log
}) 

module.exports = {
    pool,
    sequelize,
};
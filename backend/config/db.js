const { Pool } = require('pg');
const { Sequelize } = require('sequelize')

//Я мог изменить на локальную базу данных
const pool = new Pool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Это для того чтобы sequelize работал именно с нашкй бд
const sequelize = new Sequelize({
    host: process.env.HOST,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: console.log
}) 

module.exports = {
    pool,
    sequelize,
};
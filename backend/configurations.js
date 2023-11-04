// MySQL without ORM
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Fast12##',
    database: 'sys',
    connectionLimit: 10, // Adjust as needed
});

const connectDB = async() => {
    pool.getConnection()
    .then((connection) => {
        console.log('Connected to MySQL database');
        connection.release(); // Release the connection when done
    })
    .catch((err) => {
        console.error('Error connecting to MySQL:', err);
    });
}
module.exports = connectDB;


// with ORM
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sys', 'root', 'Fast12##', {
  host: 'localhost',
  dialect: 'mysql',
});
module.exports = sequelize;

// for Postgres
const { Client } = require('pg');

const db = new Client({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "shakir",
  database: "postest",
});

module.exports = connectDB;
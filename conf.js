const env = require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection(process.env.DATABASE_URL || '');

module.exports = connection;
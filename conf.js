const env = require('dotenv').config();
const mysql = require('mysql');
const pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL || '');

module.exports = pool;
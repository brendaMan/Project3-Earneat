const env = require('dotenv').config();
const msql = require('mysql');
const connection = msql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b59f8f499683f6',
    password: 'ffaefde3',
    database: 'heroku_de005115e0ec957',
});

module.exports = connection;
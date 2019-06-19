const msql = require('mysql');
const connection = msql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b59f8f499683f6',
    password: 'ffaefde3',
    database: 'eu-cdbr-west-02.cleardb.net',
});

module.exports = connection;
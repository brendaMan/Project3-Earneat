const express = require('express');
const path = require('path');
const server = express();
const port = process.env.PORT || 8000;

server.set("port", port); // informar al serv que puerto se está usando

server.use('/', express.static(path.join(__dirname, '/build')));

server.get('/api', function(req, res){
    res.write('GET    /api/user             List of users\n');
    res.write('GET    /api/user/:userid     User details.\n');
    res.write('\n');
    res.write('POST   /api/login            Log in.\n');
    res.end();
})

server.get('/api/user', function(req, res){
    res.end('List of users');
})

server.get('/api/user/:userid', function(req, res){
    res.end('user');
})

server.get('/api/login', function(req, res){
    if (Math.random() > 0.5) {
        return res.sendStatus(200); // Login ok
    } else {
        return res.sendStatus(404); // Login error
    }
})

server.listen(port, function() { 
    console.log('This is on port ' + port);
})
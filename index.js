const express = require('express');
const path = require('path');
const server = express();
const port = process.env.PORT || 8000;

server.set("port", port);

server.use('/', express.static(path.join(__dirname, '/build')));

server.get('/api', function(req, res){
    res.write('/api/user             List of users\n');
    res.write('/api/user/:userid     User details. hola\n');
    res.end();
})

server.get('/api/user', function(req, res){
    res.end('Lista de usuarios');
})


server.get('/api/user/:userid', function(req, res){
    res.end('usuario');
})

server.listen(port, function() { 
    console.log('This is on port ' + port);
})
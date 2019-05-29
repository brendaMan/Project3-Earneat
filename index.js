const express = require('express');
const server = express();
const port = process.env.PORT || 8000;

server.set("port", port);
server.get('/', function(req, res){
    res.write('/api/user             List of users\n');
    res.write('/api/user/:userid     User details\n');
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
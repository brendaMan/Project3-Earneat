const express = require('express');
const path = require('path');
const server = express();
const connection = require('./conf');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sha1 = require('sha1'); 
const port = process.env.PORT || 8000;

server.use(passport.initialize());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
    })
);


server.set("port", port); 
server.use('/', express.static(path.join(__dirname, '/build')));

// ?----------------------------- USER ----------------------------------------

server.get('/api', (req, res) => {
    res.write('GET    /api/users             List of users\n');
    res.write('GET    /api/users/:id     User details.\n');
    res.write('\n');
    res.write('POST   /api/login            Log in.\n');
    res.end();
})

server.get('/api/users', (req, res) => {
    connection.query('SELECT * from user', (err, results) =>{
        if (err) {
            console.log(err)
            res.status(500).send(err.message);
        } else {
            res.json(results);
        }
    });
});

server.get('/api/users/:id', (req, res) => {
    connection.query('SELECT * from user WHERE id= ?', [req.params.userid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message);
        } else {
            res.json(results && results[0]);
        }
    });
})

server.post('/api/users', (req, res) => {
    const formData = req.body;
        connection.query('INSERT INTO user SET ?', formData, (err, results) => {
            if (err) {
                console.log(err);
                res.results(500).send('There is an error');
            } else {
                res.sendStatus(200);
            }
        });
});

server.patch('/api/users/:id', (req, res) => {
    const idUser = req.params.id;
    const formData = req.body;
        connection.query('UPDATE user SET ? WHERE id = ?', [formData, idUser], err => {
            if (err) {
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.sendStatus(200);
            }
        });
});


// ?---------------------------------- LOG IN/ LOG OFF -----------------------------------------

server.post('/api/login', (req, res, next) => {
    console.log('login starting');
    passport.authenticate('local', function(err, user, info){
        console.log('login finish')
        if (err || !user) {
            res.status(401);
            res.json({ message:'There is a problem logging in'})
        } else {
            res.status(200);
            res.json(user)
        }
    })(req, res, next);
});

server.post('/api/logoff', (req, res) => {
    if (Math.random() > 0.5) {
        return res.sendStatus(200); // Logoff ok
    } else {
        return res.sendStatus(404); // Logoff error
    }
});


// ?------------------------------------ VOTE ----------------------------------------


server.post('/api/votos', (req, res) => {
    const formData = req.body;
        connection.query('INSERT INTO votos SET ?', formData, (err, results) => {
            if (err) {
                console.log(err);
                res.results(500).send('You can post your vote')
            } else {
                res.sendStatus(200);
            }
        });
});


// ?------------------------------- PREMIO ---------------------------------------------

server.get('/api/premios', (req, res) => {
    connection.query('SELECT * from premios', (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message);
        } else {
            res.json(results);
        }
    });
});

server.post('/api/premios', (req, res) => {
    const formData = req.body;
    connection.query('INSERT into premios SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.results(500).send('Error');
        } else {
            res.sendStatus(200);
        }
    });
});

server.patch('api/premios/:id', (req, res) => {
    const idPremio = req.params.id;
    const formData = req.body;
        connection.query('UPDATE premio SET ? WHERE id = ?', [formData, idPremio], err => {
            if (err) {
                res.status(500).send('Error');
            } else {
                res.sendStatus(200);
            }
        });
});

// autentificacion del passport 
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(username, password, done) {
        const salt = '0X(PkJ%49nm09 75NUN6I$2]]0m6h95x';
        console.log('LOGGING IN...', {username, password})
        connection.query('SELECT * FROM user WHERE email = ? AND hash = ?', [username, sha1(password + salt)], (err, results) => {
            console.log('LOGIN RESULT', results[0]);
            done(err, results[0])
        });
    }
))

server.on("error", (e) => console.log(e))

server.listen(port, () => { 
    console.log('This is on port ' + port);
})
const express = require('express');
const path = require('path');
const server = express();
const connection = require('./conf');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const cookieParser = require('cookie-parser'); 
const sha1 = require('sha1'); 
const port = process.env.PORT || 8000;
const secret = 'cUb5jR$csB=+7xtr'

server.use(passport.initialize());
server.use(bodyParser.json());
server.use(cookieParser(secret))
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(username, password, done) {
        const salt = '0X(PkJ%49nm09 75NUN6I$2]]0m6h95x';
        console.log('LOGGING IN...', {username, password})
        connection.query('SELECT * FROM user WHERE email = ? AND hash = ?', [username, sha1(password + salt)], (err, results) => {
            console.log('LOGIN RESULT', results[0]);
            const user = results[0];
            done(err, user)
        });
    }
))

passport.use(new JwtStrategy({
    jwtFromRequest: (req) => req.cookies && req.cookies.jwt,
    secretOrKey: secret
}, 
    function(payload, done) {
        console.log('Payload extraido', payload);
        done(null, payload.user)
    }
))

server.set("port", port); 
server.use('/', express.static(path.join(__dirname, '/build')));

// ?----------------------------- USER ----------------------------------------

server.get('/api', (req, res) => {
    res.write('GET    /api/users             List of users\n');
    res.write('GET    /api/users/:id         User details.\n');
    res.write('GET    /api/users/me                         ');
    res.write(                '\n'                           );
    res.write('POST   /api/login                   Log in.\n');
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

server.get('/api/users/me', passport.authenticate('jwt', {
    session: false}), (req, res) => { 
        console.log('terminado autentificación jwt', req.user);
        // Sabemos, si es usuario valido, y si es administrador
        res.json(req.user);
    }
);

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


server.get('/api/newsfeed', (req, res) => {
    connection.query('SELECT * FROM newsfeed ORDER BY date DESC LIMIT 20', [req.params.userid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message);
        } else {
            res.json(results);
        }
    });
})



// ?---------------------------------- LOG IN/ LOG OFF -----------------------------------------

server.post('/api/login', (req, res, next) => {
    console.log('login starting');
    passport.authenticate('local', function(err, user){
        console.log('login finish')
        if (err || !user) {
            res.status(401);
            res.json({ message:'There is a problem logging in'})
        } else {
            jwt.sign({user}, secret,(err, token) => {
                console.log('jwt generate', err, token)
                if(err) return res.status(500).json(err)
                res.cookie('jwt', token, {
                    httpOnly: true 
                })
                res.status(200).send(user)
            })
        }
    })(req, res, next);
});

server.post('/api/logout', (req, res, nex) => {
    res.clearCookie('jwt').send()
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



server.on("error", (e) => console.log(e))

server.listen(port, () => { 
    console.log('This is on port ' + port);
})
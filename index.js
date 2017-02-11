const express = require('express');
const app = express();
var path    = require("path");
const session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
    if (req.session.auth) {
        res.send('Hello Chitra');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req,res) => {
    if (req.session.auth) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname + '/login.html'));
    }
});

app.get('/login-submit',(req,res) => {
    var username = req.query.username,
        password = req.query.pass;
    if (username == 'chitra' && password == '12345') {
        req.session.auth = true;
        console.log('success');
        res.redirect('/');
    } else {
        res.send('wrong password');
    }
});

app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
});
app.listen(1337, () => {
    console.log("server started", 1337);
});

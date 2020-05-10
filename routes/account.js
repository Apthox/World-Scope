var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models/dbconnection');
var User = require('../models/user');



router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Log in Page' });
});

router.post('/login', async function(req, res, next) {
    console.log(req.body);
    var data = await User.authenticate_user(req.body.username, req.body.password);
    console.log(data);
    if (data["success"]) {
        req.session.user = data["user"];
        req.session.authed = true;
        console.log("Was authenticated!");
        res.redirect('/');
    } else {
        console.log("Was not authenticated!");
        res.render('login', { message: "error logging in" });
    }
});


router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
})

router.post('/signup', async function(req, res, next) {
    var resp = await User.createUser(req.body.username, req.body.password);
    console.log(resp);
    if (resp["success"]) {
        req.session.user = resp["user"];
        req.session.authed = true;
        res.redirect('/');
    } else {
        res.render('signup', { message: resp["msg"] });
    }
})



module.exports = router;


// work On making the map and game routes
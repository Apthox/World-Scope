var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models/dbconnection');
var User = require('../models/user');



router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Log in Page' });
});

router.post('/login', async function(req, res, next) {
    var data = await User.authenticate_user(req.body.username, req.body.password);
    console.log(data);
    if (data["success"]) {
        console.log("Was authenticated!");
        res.redirect('/')
    } else {
        console.log("Was not authenticated!");
        res.render('/login', { message: "error logging in" });
    }
});


router.get('/logout', function(req, res, next) {
    res.render('logout', { title: 'Express' });
});

router.post('/signup', function(req, res, next) {
    console.log(User.prototype);
    console.log("Username > " + req.body.username);
    console.log("Password > " + req.body.password);
    var user = User.createUser(req.body.username, req.body.password);
    console.log(user.prototype);
    if (user) {
        console.log(user);
        res.redirect('/');
    } else {
        res.redirect('/signup', { message: "error creating user: User Already Exists" });
    }
})



module.exports = router;


// work On making the map and game routes
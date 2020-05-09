var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models/dbconnection');
var User = require('../models/user');



router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Log in Page' });
});

<<<<<<< HEAD
router.post('/login',function(req,res,next) {
    var userdata = User.authenticate_user(req.body.username,req.body.password);
    if(userdata) {
        console.log("logged in");
=======
router.post('/login', async function(req, res, next) {
    var data = await User.authenticate_user(req.body.username, req.body.password);
    console.log(data);
    if (data["success"]) {
        console.log("Was authenticated!");
>>>>>>> ccddbe823b6d2c161c1a605d602142b40c7c6caa
        res.redirect('/')
    } else {
        console.log("Was not authenticated!");
        res.render('/login', { message: "error logging in" });
    }
});


router.get('/logout', function(req, res, next) {
    res.render('logout', { title: 'Express' });
});

<<<<<<< HEAD
router.get('/signup',function(req,res,next) {
    res.render('signup');
})

router.post('/signup',function(req, res, next) {
=======
router.post('/signup', function(req, res, next) {
>>>>>>> ccddbe823b6d2c161c1a605d602142b40c7c6caa
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
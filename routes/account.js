var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

var db = require('../models/dbconnection');




router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/login',function(req,res,next) {
    var userdata = User.authenticate_user(req.body.username,req.body.password);
    if(userdata) {
        res.redirect('/')
    }
    else {
        res.redirect('/login')
    }
});


router.get('/logout', function(req, res, next) {
    res.render('logout', { title: 'Express' });
});

router.post('/signup',function(req, res, next) {
    bcrypt.hash(req.body.password,10,function(err,hash) {
        db.get_dbo_instance().then(async (dbo) => {
            dbo.User.create({
                username: req.body.username,
                password:hash
            }).then((data) => {
                if(data) {
                    res.redirect('/')
                }
            })
        })
    })
})



module.exports = router;
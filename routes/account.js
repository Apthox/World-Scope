var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.get('/logout', function(req, res, next) {
    res.render('logout', { title: 'Express' });
});

module.exports = router;
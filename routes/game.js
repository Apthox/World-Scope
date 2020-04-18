var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('game', { title: 'Express', layout: ""});
});

module.exports = router;
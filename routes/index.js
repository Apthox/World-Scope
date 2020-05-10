var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {
        authed: req.session.authed,
        user: req.session.user
    });
});

module.exports = router;
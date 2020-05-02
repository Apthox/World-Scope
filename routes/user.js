var express = require('express');
var router = express.Router();

var user = require("../controllers/user");

router.get('/login', function(req, res, next) {
  user.loginUser(req, res);
});

module.exports = router;

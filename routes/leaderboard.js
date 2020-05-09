var express = require('express');
var router = express.Router();
var gameModel = require('../models/game');

router.get('/', async function(req, res, next) {
    let leaderboard = await gameModel.get_leaderboard(10);
    res.render('leaderboard', { "leaderboard": JSON.stringify(leaderboard) });
});

module.exports = router;
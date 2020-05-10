var express = require('express');
var router = express.Router();
var gameModel = require('../models/game');

router.get('/', async function(req, res, next) {
    let leaderboard = await gameModel.get_leaderboard(10);
    console.log(req.query.points);
    res.render('leaderboard', { "leaderboard": JSON.stringify(leaderboard), "points": req.query.points, "username": req.query.username });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var mapModel = require('./../models/map');

router.get('/', function(req, res, next) {
    res.render('game', { title: 'Express', layout: "" });
});

router.get('/getQuestion', async function(req, res, next) {
    let maps = await mapModel.get_random_maps();
    console.log(maps);

    res.end(maps);
});

module.exports = router;
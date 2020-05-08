var express = require('express');
var router = express.Router();
var mapModel = require('./../models/map');
var gameController = require('./../controllers/game')
var gameModel = require('./../models/game');

router.get('/start', async function(req, res) {
    try {
        let id = await gameModel.create_game("Anonymous");
        console.log(id);
        console.log(id.toHexString());

        req.session.game = id.toHexString();
        req.session.new_stage = true;
        req.session.params = {
            points: 0,
            stage: undefined
        }

        res.redirect('/game')

    } catch (err) {
        res.end("couldnt make it happen bro. \n" + err)
    }
});

// example
// params = {
//     stage = {
//         location: [lat, long],
//         hint: "something helpful",
//         answers: []
//     },
//     point: 0
// }
router.get('/', gameController.is_in_game, async function(req, res) {
    if (req.session.new_stage) {
        // get new params
        req.session.params["stage"] = await gameController.get_random_stage();
        req.session.new_stage = false;
    }

    res.render('game', {
        title: 'Express',
        layout: "",
        game_id: req.session.game,
        params: JSON.stringify(req.session.params)
    });
});

// example body
// body = {
//     "location": [lat, long],
//     "answer": "answer"
// }
router.post('/', gameController.is_in_game, function(req, res) {
    let location = req.body.location;
    let answer = req.body.answer;

});

module.exports = router;
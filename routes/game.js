var express = require('express');
var router = express.Router();
var mapModel = require('./../models/map');
var gameController = require('./../controllers/game')
var gameModel = require('./../models/game');

router.get('/start', async function(req, res) {
    try {
        let id;
        if (req.session.user) {
            id = await gameModel.create_game(req.session.user["_id"], req.session.user["username"]);
        } else {
            id = await gameModel.create_game("Anonymous", "Anonymous");
        }
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

    //-33.8605405, 151.2095494];

    res.render('game', {
        title: 'Express',
        layout: "",
        game_id: req.session.game,
        params: JSON.stringify(req.session.params),
        user: req.session.user
    });
});

// example body
// body = {
//     "location": [lat, long],
//     "answer": "answer"
// }
router.post('/', gameController.is_in_game, async function(req, res) {
    let resp = {
        correct: false
    }

    console.log(req.body);
    let location = req.body["location[]"];
    let answer = req.body.answer;
    console.log("Post Recieved!");
    console.log(location);
    console.log(answer);
    let result = await gameController.verify_answer(location, answer);

    if (result) {
        console.log("Was Answered Correctly!")
        req.session.params["points"] += 1;
        req.session.new_stage = true;
        resp["correct"] = true;
        res.json(resp);
        return;
    }

    console.log("was Answered Incorrectly!");

    // TODO: Log to database game is over
    gameModel.update_game(req.session.game, {
        "end": Math.round(new Date().getTime() / 1000),
        "points": req.session.params["points"]
    });

    req.session.params = undefined;
    req.session.game = undefined;
    req.session.new_stage = undefined;
    res.json(resp);
});

module.exports = router;
var mapModel = require("./../models/map");
var shuffle = require('shuffle-array');

module.exports.is_in_game = function(req, res, next) {
    if (req.session.game) {
        next();
    } else {
        res.redirect("/");
    }
}

module.exports.get_random_stage = async function() {
    let maps = await mapModel.get_random_maps();
    let location = [maps[0]["latitude"], maps[0]["longitude"]];
    let hint = maps[0]["hint"];
    let answers = [];
    for (var i = 0; i < 4; i++) {
        answers.push(maps[i]["title"])
    }

    return {
        "location": location,
        "hint": hint,
        "answers": shuffle(answers)
    }
}

module.exports.verify_answer = async function(location, answer) {
    let map = await mapModel.get_maps_by_coordinates(parseFloat(location[0]), parseFloat(location[1]));

    console.log(map);

    if (map["title"] == answer) {
        return true;
    }
    return false;
}
const map_model = require('./../models/map');
var shuffle = require('shuffle-array');

module.exports.get_random_maps = async function(req, res) {
    let maps = await map_model.get_random_maps();

    let head = maps[0];

    let head_coords = {
        latitude: head["latitude"],
        longitude: head["longitude"]
    }

    let locations = [];

    for (var i = 0; i < maps.length; i++) {
        locations.push({
            "title": maps[i]["title"],
            "hunt": map[i]["hint"]
        });
    }

    locations = shuffle(locations);

    let resp = {
        "coords": head_coords,
        "location": locations
    };

    console.log(resp);
    res.json(resp);
}
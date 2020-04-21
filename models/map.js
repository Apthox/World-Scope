//map(question,hint,latitude,longitude)

var mongo = require('mongodb');
var dbconnection = require('./dbconnection');

module.exports.get_maps_by_coordinates = async (latitude,longitude) => {
    var db = await dbconnection.get_dbo_instance();

    db.collection('map').find({latitude,longitude}).then(map => {
        return map;
    });
}

module.exports.get_games(id) = async () => {
    
}

module.exports.create_game = async (user_id,points,start,finish) => {


    var db = await dbconnection.get_dbo_instance();

    db.collection('map').insertOne({
        user_id: mongo.ObjectID(user_id),
        points:points,
        start: Math.round(new Date().getTime() / 1000),
        end: -1
    })
}

module.exports.update_game_time = async (game_id) => {
    var user_id = mongo.ObjectID(user_id);

    var db = await dbconnection.get_dbo_instance();

    var endTime = { $set: {end: Math.round(new Date().getTime() / 1000)} };
    db.collection('game').updateOne({_id: game_id},endTime)
}
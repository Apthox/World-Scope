//game schema(game_id,user_id,points,start,finished)
var mongo = require('mongodb');
var dbconnection = require('./dbconnection');


module.exports.get_game_Id(id) = async (id) => {
    var db = await dbconnection.get_dbo_instance();

    db.collection('game').findById({_id: id}).then(game => {
        return game;
    });
}

module.exports.get_games(id) = async () => {
    return new Promise(async (resiolve,reject) => {
        var db = await dbconnection.get_dbo_instance();

        db.collection('game').findOne(id).then(data => {
            resolve(data);
        })
    })
}

module.exports.create_game = async (user_id,points,start,finish) => {


    var db = await dbconnection.get_dbo_instance();

    db.collection('game').insertOne({
        user_id: mongo.ObjectID(user_id),
        points:points,
        start: Math.round(new Date().getTime() / 1000),
        end: -1
    })
}

//working on recording poitns user scored to be completed

module.exports.update_game_time = async (game_id) => {
    var user_id = mongo.ObjectID(user_id);

    var db = await dbconnection.get_dbo_instance();

    var endTime = { $set: {end: Math.round(new Date().getTime() / 1000)} };
    db.collection('game').updateOne({_id: game_id},endTime)
}

module.exports.update_game_score = async (points) => {
    var user_id = mongo.ObjectID(user_id);

    var db = await dbconnection.get_dbo_instance();

    var points_update = { $set: {points: points} };
    db.collection('game').updateOne({_id: game_id},points_update)
}
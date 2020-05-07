//map(question,hint,latitude,longitude)

var mongo = require('mongodb');
var dbconnection = require('./dbconnection');

module.exports.get_maps_by_coordinates = async (latitude,longitude) => {
    return new Promise(async (resolve,reject) => {
        var db = await dbconnection.get_dbo_instance();
        db.collection('map').find({latitude,longitude}).then(data => {
            resolve(data);
        });
    })
    
    
}

module.exports.get_random_maps(id) = () => {
    return new Promise(async (resolve, reject) => {
        var db = await dbconnection.get_dbo_instance();

        db.collection('map').aggregate([{$sample: {size: 4}}]).then(data => {
            resolve(data);
        })
    });
}

module.exports.create_map = async (user_id,points,start,finish) => {

    var db = await dbconnection.get_dbo_instance();

    db.collection('map').insertOne({
        user_id: mongo.ObjectID(user_id),
        points:points,
        start: Math.round(new Date().getTime() / 1000),
        end: -1
    })
}

module.exports.update_map_hint = async (hint) => {
    var user_id = mongo.ObjectID(user_id);
    
    var db = await dbconnection.get_dbo_instance();

    var mapupdate = { $set: {hint: hint} };
    db.collection('map').updateOne({hint: hunt},mapupdate)
}


//finish map functions of updating and deleting map records
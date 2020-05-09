//map(question,hint,latitude,longitude)

var mongo = require('mongodb');
var dbconnection = require('./dbconnection');

module.exports.get_maps_by_coordinates = async(latitude, longitude) => {
    return new Promise(async(resolve, reject) => {
        var db = await dbconnection.get_dbo_instance();
        let map = db.collection('map');
        map.findOne({ "latitude": latitude, "longitude": longitude }, function(err, result) {
            if (err) {
                throw err;
            }
            resolve(result);
        })
    });
}

module.exports.get_random_maps = () => {
    return new Promise(async(resolve, reject) => {
        var db = await dbconnection.get_dbo_instance();

        let map = db.collection('map');

        map.aggregate([{ $sample: { size: 4 } }]).toArray(function(err, results) {
            console.log(results);
            resolve(results);
        });
    });
}

module.exports.create_map = async(map) => {
    var db = await dbconnection.get_dbo_instance();
    db.collection('map').insertOne(map);
}

module.exports.update_map_hint = async(hint) => {
    var user_id = mongo.ObjectID(user_id);
    
    var db = await dbconnection.get_dbo_instance();

    var mapupdate = { $set: { hint: hint } };
    db.collection('map').updateOne({ hint: hunt }, mapupdate)
}


//finish map functions of updating and deleting map records
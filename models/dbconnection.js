var mongoClient = require('mongodb').MongoClient;

var uri = "mongodb://sampop:Project2@cluster0-shard-00-00-hnxfk.mongodb.net:27017,cluster0-shard-00-01-hnxfk.mongodb.net:27017,cluster0-shard-00-02-hnxfk.mongodb.net:27017/project3?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";


// create instance variable
module.exports.dbo_instance = undefined;

module.exports.get_dbo_instance = async function() {
    if (module.exports.dbo_instance == undefined) {
        let dbo = await new Promise( (resolve, reject) => {
            mongoClient.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true },(err,db) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                var dbo = db.db('project3')
                resolve(dbo);
            })
        });

        module.exports.dbo_instance = dbo;
    }

    // if it gets here then it means it exits
    // so return what u have
    return module.exports.dbo_instance;
}
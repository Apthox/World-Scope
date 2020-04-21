var mongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://sampop:Project2@cluster0-hnxfk.mongodb.net/world-scope?retryWrites=true&w=majority";


// create instance variable
module.exports.dbo_instance = undefined;

module.exports.get_dbo_instance = async function() {
    if (module.exports.dbo_instance == undefined) {
        let dbo = await new Promise( (resolve, reject) => {
            mongoClient.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true },(err,db) => {
                if(err) {
                    console.log("Could not establish connection with server!");
                    console.log(err);
                    reject(err);
                }
                var dbo = db.db('world-scope');
                dbo.listCollections().toArray().then(arr => {console.log(arr)})
                console.log(dbo);
                resolve(dbo);
            })
        });

        module.exports.dbo_instance = dbo;
    }

    // if it gets here then it means it exits
    // so return what u have
    return module.exports.dbo_instance;
}
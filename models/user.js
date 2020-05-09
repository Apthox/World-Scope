
var dbconnection = require('./dbconnection');
var bcrypt = require('bcrypt');

// return object with user id
module.exports.authenticate_user = async function (username, password) {

    let resp = {
        "success": true,
        "msg": "",
        "UUID": ""
    }

    // check database if someone with username exists
    let dbo = await dbconnection.get_dbo_instance();
    // if exits get passwor
    let users = await dbo.collection('users').find({username:username}).toArray();
    if(users.length < 1) {
        resp["success"] = false;
        return resp;
    }

    let passwordHash = users[0].password;
    // user bcrypt to check if password matches hash
    let success = await new Promise((resolve,reject) => {
        bcrypt.compare(password, passwordHash, function(err,result) {
            if(err) {
                reject(false);
            }
            if(result) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
    
    // return true if matches
    resp["success"] = success;
    resp["UUID"] = users[0]._id;
    return success;
};

module.exports.createUser = async function(username, password, salt) {
    console.log("Create User Function == 1");

    let dbo = await dbconnection.get_dbo_instance();

    let hash = await new Promise((resolve, reject) => {
        bcrypt.genSalt(12).then(salt => {
            bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                reject(err);
            }
            resolve(hash);
        })});
    });

    console.log("Stored Hash > " + hash);

    dbo.collection('users').insertOne({
        username:username,
        password:hash
    });

    return true;

}

module.exports.get_users = async function() {
    let dbo = await dbconnection.get_dbo_instance();
    dbo.collection('users').find();
}

module.exports.find_user_by_username = async function(username) {
    let dbo = await dbconnection.get_dbo_instance();
    dbo.collection('users').find({"username": username});
}


module.exports.remove_user = async function(username) {
    let dbo = await dbconnection.get_dbo_instance();
    dbo.collection('users').removeOne({
        "username": username
    });
}

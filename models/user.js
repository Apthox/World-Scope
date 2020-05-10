var dbconnection = require('./dbconnection');
var bcrypt = require('bcrypt');

// return object with user id
module.exports.authenticate_user = async function(username, password) {
    let resp = {
        "success": true,
        "msg": "",
    }

    // check database if someone with username exists
    let dbo = await dbconnection.get_dbo_instance();
    // if exits get passwor
    let users = await dbo.collection('users').find({ username: username }).toArray();
    if (users.length < 1) {
        resp["success"] = false;
        return resp;
    }

    let passwordHash = users[0].password;
    // user bcrypt to check if password matches hash
    let success = await new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function(err, result) {
            if (err) {
                resp["msg"] = "System Error!";
                reject(false);
            }
            if (result) {
                resolve(true);
            } else {
                resolve(false);
                resp["msg"] = "incorrect password/username";
            }
        });
    });

    // return true if matches
    resp["success"] = success;
    resp["user"] = users[0];
    return resp;
};

module.exports.createUser = async function(username, password) {

    let resp = {
        success: false,
        msg: "",
        user: undefined
    }

    let dbo = await dbconnection.get_dbo_instance();

    let users = await module.exports.find_users_by_username(username);

    if (users.length > 0) {
        resp["msg"] = "username taken!";
    }

    let hash = await new Promise((resolve, reject) => {
        bcrypt.genSalt(12).then(salt => {
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            })
        });
    });

    await dbo.collection('users').insertOne({
        username: username,
        password: hash
    });

    users = await dbo.collection('users').find({ username: username }).toArray();
    if (users.length < 1) {
        resp["msg"] = "System error!";
        return resp;
    }

    resp["success"] = true;
    resp["user"] = users[0];
    return resp;

}

module.exports.get_users = async function() {
    let dbo = await dbconnection.get_dbo_instance();
    dbo.collection('users').find();
}

module.exports.find_users_by_username = async function(username) {
    let dbo = await dbconnection.get_dbo_instance();
    let users = await dbo.collection('users').find({ "username": username }).toArray();
    return users;
}


module.exports.remove_user = async function(username) {
    let dbo = await dbconnection.get_dbo_instance();
    dbo.collection('users').removeOne({
        "username": username
    });
}
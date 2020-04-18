const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
var dbconnection = require('./dbconnection');
var bcrypt = require('bcrypt');

// return false or true
module.exports.authenticate_user = async function (username, password) {
    // check database if someone with username exists
    let dbo = await dbconnection.get_dbo_instance();
    // if exits get passwor
    let users = await dbo.collection('user').find({username:username}).toArray();
    if(users.length < 1) {
        return false;
    }
    let passwordHash = users.password;
    // user bcrypt to check if password matches hash
    let success = await new Promise((resolve,reject) => {
        bcrypt.compare(user.password,passwordHash,function(err,result) {
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
    return success;
};

module.exports.createUser = async function(username,password) {
    let dbo = await dbconnection.get_dbo_instance();
    bcrypt.hash(password,10,function(err,hash) {
        
        dbo.User.create({
            username: req.body.username,
            password:hash
        }).then((data) => {
            if(data) {
                return true;
            }
        }).catch((err) => {
            return err;
        })
        
    })
}

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    age:Number,

    places_been_to:[ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Map'
        }
        
    ],
    score:[ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        }
        
    ]

})
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
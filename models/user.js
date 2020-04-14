const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");


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
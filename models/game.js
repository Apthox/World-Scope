const mongoose = require('mongoose');


var gameSchema = new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    age:Number,

   

})

module.exports = mongoose.model("Game", gameSchema);
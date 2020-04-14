const mongoose = require('mongoose')

var mapSchema = new mongoose.Schema({
    name:String,
    hint:String,
    answer:String,
    latitude:Number,
    longitude:Number
})

module.exports = mongoose.model("Map", mapSchema);
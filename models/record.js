var mongoose = require('mongoose');

//define schema
var recordSchema = new mongoose.Schema({
    date: String,
    time: Number,
    distance: Number,
    speed: Number,
    calories: Number
});

var recordModel = module.exports = mongoose.model('Records', recordSchema);

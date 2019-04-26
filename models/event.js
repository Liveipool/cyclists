var mongoose = require('mongoose');


var participantsSchema = new mongoose.Schema({
    username: String
});


var eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    // route: Array,
    routestr:String,
    description: String,
    participants: [participantsSchema],
    publisher: String
});

var eventModel = module.exports = mongoose.model('eventEvents', eventSchema);

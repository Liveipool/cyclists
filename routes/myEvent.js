var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

var User = require('../models/user');
var Event = require('../models/event');

//route - http://localhost:3000/myEvent
//
// router.get('/', function(req,res) {
// 	var allMyEvents = [];
// 	User.find({username: req.user.username}, function(err, data) {
// 		if (err) throw err;
// 		var myevents = data.myevent;
// 		for (i=0; i<myevents.length; i++) {
// 			Event.find({_id: myevents[i]}, function(err, data) {
// 				if (err) throw err;
// 				allMyEvents.push(data);
// 			})
// 		}
// 	})
// 	res.render('myEvent', {evnets: allMyEvents});
// });

module.exports = router;

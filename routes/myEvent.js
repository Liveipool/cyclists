var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

var User = require('../models/user');
var Event = require('../models/event');

//route - http://localhost:3000/myEvent
// router.get('/', function(req,res) {
// 	res.render('myEvent');
// });
//
router.get('/', function(req,res) {
	var allMyEvents = [];
	User.find({username: req.user.username}, function(err, data) {
		if (err) throw err;
		var myevents = data[0].myevent;
		for (let i=0; i<myevents.length; i++) {
			Event.find({_id: myevents[i]}, function(err, data) {
				if (err) throw err;
				allMyEvents.push(data[0]);
				if (allMyEvents.length === myevents.length) {
					// // 此时allMyEvents才是拿到了所有的myEvent
					// res.json(allMyEvents);
					res.render('myEvent', {events: allMyEvents});
				}
			});
		}
    })
});

module.exports = router;

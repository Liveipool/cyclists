var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

var User = require('../models/user');
var Event = require('../models/event');

//route - http://localhost:3000/evnet
//print all event on the event page
router.get('/', function(req, res) {
    //take out all data
    Event.find({}, function(err, data) {
        if (err) throw err;
        res.render('event', {events: data})
    })
});

//route - http://localhost:3000/event/detail/{evnet._id}
//print event details
router.get('/detail/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
    Event.find({_id: id}, function(err, data) {
        if (err) throw err;
        console.log(data);
        res.render('eventdetail', {events: data})
    })
})

//route - http://localhost:3000/event/create/{evnet._id}
//render create page
router.get('/create', function(req, res) {
    res.render('createevent', {username: req.user.username});
})

//route - http://localhost:3000/event/create/
//add a event
router.post('/create', urlencodeParser, function(req, res) {
    Event(req.body).save(function(err, data) {
        if (err) throw err;
        console.log('data: ', data);
        // res.json(data);

        // 要先拿到event_id 再存进user中
        const event_id = data._id;
        console.log('event_id: ', event_id);
        User.find({username: req.user.username}, function(err, user) {
            if (err) throw err
            console.log('user 1: ', user[0].myevent);
            user[0].myevent.push(event_id);
            user[0].save(function(err) {
                if (err) throw err;
            })
            console.log('user 2: ', user[0].myevent);
            res.json(user);
        })
    })

    req.flash('success_msg', 'You have published an event');
});


//join a new event
// router.put('/join/:id', function(req, res) {
//     //current event's id
//     var eventid = req.params.id;
//     console.log(eventid);
//     //current user's username
//     var username = req.user.username;
//     console.log(username);
    //find the user
    // User.find({username: username}, function(err, user) {
    //     if (err) throw err;
    //     console.log(user);
        //find the event
        // Event.find({_id: eventid}, function(err, data) {
        //     if (err) throw err;
        //     console.log(data);
        //     event = data[0];
        //     //check if user is joining a event he created
        //     if (event.publisher === username) {
        //         alert("Cannot join your own event");
        //     }
        //     //check if user has already joined this event
        //     forEach(user.myevent, function(obj) {
        //         if (obj.toString() === eventid.toString()) {
        //             alert("You have already joined this event");
        //         }
        //     })
        //     event.participants.push(username);
        //     event.save(function(err) {
        //         if (err) throw err;
        //         user.myevent.push(eventid);
        //         user.save(function(err) {
        //             if (err) throw err;
        //             alert("You have joined this event");
        //         })
        //     })

        // })
        
    // })
// })





module.exports = router;

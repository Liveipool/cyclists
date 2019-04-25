var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

var Event = require('../models/event');

//print all event on the event page
router.get('/', function(req, res) {
    //take out all data
    Event.find({}, function(err, data) {
        if (err) throw err;
        res.render('event', {events: data})
    })
});

router.get('/detail/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
    Event.find({_id: id}, function(err, data) {
        if (err) throw err;
        console.log(data);
        res.render('eventdetail', {events: data})
    })
})

router.get('/create', function(req, res) {
    res.render('createevent');
})

//add a record
router.post('/create', urlencodeParser, function(req, res) {
    Event(req.body).save(function(err, data) {
        if (err) throw err;
        res.json(data);
    })
});

module.exports = router;

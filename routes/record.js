var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

var Record = require('../models/record');

// route- https:localhost/3000/record
// find data in the database and print them on the record page
router.get('/', function(req, res) {
    //take out all data
    // add username selection
    Record.find({username: req.user.username}, function(err, data) {
        if (err) throw err;
        var totalDistance = 0;
        var totalCyclingTime = 0;
        var totalSpeed = 0;
        for (let i = 0; i < data.length; i++) {
            totalDistance += data[i].distance;
            totalCyclingTime += data[i].time;
            totalSpeed += data[i].speed;
        }
        var _totalDistance = parseFloat(totalDistance).toFixed(3);
        var _totalCyclingTime = parseFloat(totalCyclingTime).toFixed(3);
        var averageSpeed = 0;
        if (data.length > 0) averageSpeed = totalSpeed / data.length
        _averageSpeed = parseFloat(averageSpeed).toFixed(3);

        res.render('record', {records: data, username: req.user.username, _totalDistance, _averageSpeed, _totalCyclingTime})
    })
    //rend record.ejs
    //put the data in the 'records', take the records out in the views
    //res.render('record', {records: data});
});

//add record
router.post('/', urlencodeParser, function(req, res) {
    Record(req.body).save(function(err, data) {
        if (err) throw err;
        res.json(data);
    })
    //req.flash('success_msg', 'You have added a record');
    //input data
    //data.push(req.body);
    //res.json(data);
});

module.exports = router;

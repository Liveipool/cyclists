var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

var Record = require('../models/record');

router.get('/record', function(req, res) {
    //take out all data
    Record.find({}, function(err, data) {
        if (err) throw err;
        res.render('record', {records: data})
    })
    //rend record.ejs
    //put the data in the 'records', take the records out in the views
    //res.render('record', {records: data});
});

//add record
router.post('/record', urlencodeParser, function(req, res) {
    Record(req.body).save(function(err, data) {
        if (err) throw err;
        res.json(data);
    })
    //input data
    //data.push(req.body);
    //res.json(data);
});

module.exports = router;
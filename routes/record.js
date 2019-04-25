var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

var Record = require('../models/record');

// 下面的路径写为'/'时，意思就是浏览器上的'/record'，因为在app.js中写的是app.use('/record', record)，所以'/record'相当于是作为了一个基础
// 如果下面写为'/record'，对应的就是浏览器上的'/record/record'
router.get('/', function(req, res) {
    //take out all data
    Record.find({}, function(err, data) {
        if (err) throw err;
        res.render('record', {records: data, username: req.user.username})
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
    //input data
    //data.push(req.body);
    //res.json(data);
});

module.exports = router;
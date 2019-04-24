var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cyclists');
// mongoose.connect('mongodb+srv://cs5003public:javascript@p3-kz4ij.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use(expressValidator({
	errorFormater: function(param,msg,value) {
		var namespace = param.split('.')
		, root = namespace.shift()
		formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		}
	}
}));

// 这个falsh是用来给全局变量里面添加值的，比如登录注册有问题时就在全局变量里面增加值，然后就可以对应显示在页面上
//connect-falsh
app.use(flash());

//Global Variables
app.use(function (req,res,next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
	next();
});

// 路由跳转，app.js每次修改后要重启应用才能生效
var index = require('./routes/index');
var users = require('./routes/users');
var record = require('./routes/record');
var event = require('./routes/event');
var myEvent = require('./routes/myEvent');
var friend = require('./routes/friend');

app.use('/', index);
app.use('/users', users);
app.use('/record', record);
app.use('/event', event);
app.use('/myEvent', myEvent);
app.use('/friend', friend);

// 之前的写法
// app.get('/', function (req, res) {
//   res.render('login');
// });
// app.get('/register', function (req, res) {
//   res.render('register');
// });
// app.get('/record', function (req, res) {
//   res.render('record');
// });
// app.get('/event', function (req, res) {
//   res.render('event');
// });
// app.get('/myEvent', function (req, res) {
//   res.render('myEvent');
// });
// app.get('/friend', function (req, res) {
//   res.render('friend');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

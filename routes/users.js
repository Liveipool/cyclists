var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//Get Register
router.get('/register', function(req,res) {
	res.render('register');
});

//Get login
router.get('/login', function(req,res) {
	res.render('login');
});

//Register User
router.post('/register', function(req,res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	//Validation
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is invalid').isEmail();

	var errors = req.validationErrors();
	
	// 如果没错，就提示成功并跳转到登录页
	// 如果有错，就把错误信息驾到全局的 errors 变量里
	if (errors) {
		res.render('register', {
			errors : errors
		});
	} else {
		var newUser = new User({
			username : username,
			password : password,
			email : email
		});
		User.createUser(newUser, function(err, user) {
			if(err) throw(err);
		});
		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/users/login')
	}
});

// 设置passport.js的strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
  	User.getUserByUsername(username, function(err, user) {
			if(err) throw err;
			// 如果有错，添加对应的错误信息到locals.error里面，可以对应地在页面上进行提示
  		if(!user) {
  			return done(null, false, {message : 'Unknown User'});
  		}
  		User.comparePassword(password, user.password, function (err, isMatch) {
  			if (err) throw err;
  			if (isMatch) {
  				return done(null, user);
  			} else {
  				return done(null, false, {message : 'Invalid Password'});
  			}
  		});
  	});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
});

router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success_msg', 'You are Logged out');
	res.redirect('/users/login');
})

module.exports = router;
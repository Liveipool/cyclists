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
	console.log(errors);
	
	// if it is right, then jump to the log in page
	// if it is wrong, then add the wrong message to the global errors
	if (errors) {
		res.render('register', {
			errors : errors
		});
	} else {
		User.getUserByUsername(username, function(err, user) {
			if(err) throw err;
			// put the error messsage in the locals.error
			if (user) {
				res.render('register', {
					errors : [{msg: 'This username has benn registered!'}]
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
	}
});

// set passport.js strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
  	User.getUserByUsername(username, function(err, user) {
			if(err) throw err;
			// put the error messsage in the locals.error
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

//route - http://localhost:3000/login
//log in
router.post('/login',
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
});

//route - http://localhost:3000/logout
//log out
router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success_msg', 'You are Logged out');
	res.redirect('/users/login');
})

module.exports = router;
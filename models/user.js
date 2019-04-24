// 这个文件是从login_demo里的user.js里copy的
var mongoose = require('mongoose');
//encrypt
var bcrypt = require('bcryptjs');

//User schema
var UserSchema = mongoose.Schema({
	username: {
		type : String,
		index :true,
		// required: true
	},
	password: {
		type: String,
		// required: true
	},
	email: {
		type: String,
		// required: true
	},
});

var User = module.exports = mongoose.model('User', UserSchema);

//create a user
module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);  
    });
});
}

//get find user by username
module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
}

//find user by id
module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

//check if the password is right
module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	});
}
var mongoose = require('mongoose');
//encrypt
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var MyEventSchema = mongoose.Schema({
	myevent: {type: ObjectId}
})

//User schema
var UserSchema = mongoose.Schema({
	username: {
		type : String,
		index :true,
	},
	password: String,
	email: String,
	myevent: [MyEventSchema]
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

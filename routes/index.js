var express = require('express');
var router = express.Router();

// init route - http://localhost:3000
router.get('/', ensureAuthenticated, function(req,res) {
	// has passed ensureAuthenticated
	//route - http://localhost:3000/record
	res.redirect('record');
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		// if passed authentication then next() -> res.redirect('record');
		return next();
	} else {
		// if didn't pass the authentication then jump back to the login page
		res.redirect('users/login');
	}
}

module.exports = router;
var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', ensureAuthenticated, function(req,res) {
	res.redirect('record');
		// res.render('record');
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('users/login');
	}
}

module.exports = router;
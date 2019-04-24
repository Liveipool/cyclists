var express = require('express');
var router = express.Router();

// 这个文件是初始路由文件，访问http://localhost:3000先进入的就是这个页面
router.get('/', ensureAuthenticated, function(req,res) {
	// 如果走到这里，说明是已经通过了ensureAuthenticated验证了，即已登录了，所以跳到http://localhost:3000/record去
	res.redirect('record');
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		// 如果通过验证就执行next()，也就是回到上面那个函数中去之中res.redirect('record');
		return next();
	} else {
		// 如果没有通过验证就去登录页
		res.redirect('users/login');
	}
}

module.exports = router;
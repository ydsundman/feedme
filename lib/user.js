(function() {
	"use strict";

	var User = require('./models').User;

	module.exports = function(req, res, next) {
		var uid = req.session.uid;
		if (uid) {
			User.findOne(uid, function(err, user) {
				if (err) {return next(err);}
				if (user) {
					req.user = res.locals.user = user;
					next();
				} else {
					res.redirect('/login');
				}
			});
		} else {
			res.redirect('/login');
		}
	};
})();

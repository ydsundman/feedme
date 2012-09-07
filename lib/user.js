(function() {
	"use strict";

	var User = require('./models').User;
	var findUserFn = function(notFoundFn) {
		return function(req, res, next) {
			var uid = req.session.uid;
			if (uid) {
				User.findById(uid, function(err, user) {
					if (err) {
						return next(err);
					}
					if (user) {
						req.user = res.locals.user = user;
						next();
					} else {
						notFoundFn(res);
					}
				});
			} else {
				notFoundFn(res);
			}
		};
	};

	module.exports = {
		redirect: findUserFn(function(res) {
			res.redirect('/login');
		}),
		unauthorized: findUserFn(function(res) {
			res.json(401, {access:'unauthorized'});
		})
	};
}());

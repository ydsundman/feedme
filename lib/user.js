var mongoose = require('./db-setup').mongoose,
	models = require('./models'),
	util = require('util'),
	User;

models.setUp(mongoose, function() {
	User = mongoose.model('User');
});

module.exports = function(req, res, next) {
	var uid = req.session.uid;
	if (uid) {
		User.findOne(uid, function(err, user) {
			if (err) return next(err);
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

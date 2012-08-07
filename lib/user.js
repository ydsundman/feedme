var mongoose = require('./db-setup').mongoose,
	models = require('./models'),
	util = require('util'),
	User;

models.setUp(mongoose, function() {
	User = mongoose.model('User');
});

module.exports = function(req, res, next) {
	var uid = req.session.uid;
	if (!uid) return next();
	if (req.user && req.user.id === uid) return next();
	User.findOne(uid, function(err, user) {
		if (err) return next(err);
		req.user = res.locals.user = user;
		next();
	});
};

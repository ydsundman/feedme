(function() {
	"use strict";
	var User = require('../lib/models').User,
		util = require('util');

	function form(req, res) {
		console.log('signup.form');
		res.render('auth/signup', { title:'Sign Up' });
	}

	function submit(req, res) {
		console.log('signup.submit');
		var data = req.body.user;
		console.log('req.body: ' + util.inspect(req.body));
		console.log('data: ' + data);
		User.findOne({username:data.username}, function(err, user) {
			if (err) return next(err);
			if (user) {
				res.locals.error = 'Username already taken!';
				form(req, res);
			} else {
				user = new User({username:data.username, email:data.email, password:data.pwd});
				user.save(function(err) {
					if (err) return next(err);
					req.session.uid = user.id;
					res.redirect('/bb.html');
				});
			}
		});
	}

	module.exports = {
		form:form,
		submit:submit
	};
})();

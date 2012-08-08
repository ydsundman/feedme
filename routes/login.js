var User = require('../lib/models').User

function form(req, res) {
	console.log('login.form');
	res.render('auth/login', { title: 'Login' });
}

function submit(req, res) {
	console.log('login.submit');
	var data = req.body.user;
	User.findOne({username:data.username}, function(err, user) {
		console.log('user: ' + user);
		if (err) return next(err);
		if (user) {
			user.authenticate(data.pwd, function(err, auth) {
				console.log('authenticated!');
				req.session.uid = user.id;
				res.redirect('/');
				return;
			});
		}
		res.locals.error = 'Sorry! invalid credentials.';
		form(req, res);
	});
}

module.exports = {
	form:form,
	submit:submit
};
var User = require('../lib/models').User

function form(req, res) {
	console.log('login.form');
	res.render('auth/login', { title: 'Login' });
}

function invalidLogin(req, res) {
	res.locals.error = 'Sorry! invalid credentials.';
	form(req, res);
}

function submit(req, res, next) {
	console.log('login.submit');
	var data = req.body.user;
	User.findOne({username:data.username}, function(err, user) {
		if (err) return next(err);
		if (user) {
			user.authenticate(data.pwd, function(err, auth) {
				if (auth) {
					req.session.uid = user.id;
					res.redirect('/');
				} else {
					invalidLogin(req, res);
				}
			});
		} else {
			invalidLogin(req, res);
		}
	});
}

module.exports = {
	form:form,
	submit:submit
};
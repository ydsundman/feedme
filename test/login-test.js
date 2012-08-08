process.env.NODE_ENV = 'test';

var login = require('../routes/login'),
	User = require('../lib/models').User,
	username, email, pwd;

function testInvalidRequest(username, pwd, test) {
	var invalidPwdReq = {
			body:{
				user:{
					username:username,
					pwd:pwd
				}
			},
			session:{}
		},
		res = {
			render: function(view, locals) {
				test.equal(arguments.length, 2);
				test.equal(view, 'auth/login');
				test.equal(locals.title, 'Login');
				test.done();
			},
			redirect: function() {
				test.done('should not end up here');
			},
			locals:{}
		};

	login.submit(invalidPwdReq, res, function(err) {
		test.ok(!err);
		test.ok(res.locals.error, 'an error message should be set for invalid credentials');
	});
}

module.exports = {

	setUp: function(done) {
		User.remove({}, function(err) {
			var user = new User({username:'login-user', email: 'login-user@yds.se', password:'xxx'});
			user.save(function(err, u) {
				done(err);
			});
		});
	},

	'login should have form and submit function properties': function(test) {
		test.equal(typeof login.form, 'function');
		test.equal(typeof login.submit, 'function');
		test.done();
	},

	'login.form should render auth/login': function(test) {
		var req = {},
			res = {
				render: function(view, locals) {
					test.equal(arguments.length, 2);
					test.equal(view, 'auth/login');
					test.equal(locals.title, 'Login');
					test.done();
				}
			};
		login.form(req, res);
	},

	'login.submit should redirect to / when logging in with proper credentials': function(test) {
		var validReq = {
				body:{
					user:{
						username:'login-user',
						pwd:'xxx'
					}
				},
				session:{}
			},
			res = {
				render: function() {
					test.done('should not end up here');
				},
				redirect: function(view) {
					test.equal(arguments.length, 1);
					test.equal(view, '/');
					test.done();
				},
				locals:{}
			};

		login.submit(validReq, res, function(err) {
			test.ok(!err);
			test.done();
		});
	},

	'login.submit should not redirect to / when logging in with incorrect password':function(test) {
		testInvalidRequest(username, 'xxx' + pwd + 'yyy', test);
	},

	'login.submit should not redirect to / when logging in with username that does not exist':function(test) {
		testInvalidRequest('xxx' + username + 'yyy', pwd, test);
	}

};

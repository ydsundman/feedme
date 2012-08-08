process.env.NODE_ENV = 'test';
process.env.PORT = 9999;

var request = require('supertest'),
	http = require('http'),
	User = require('../lib/models').User,
	app = require('../app');

function testLoggingInWithInvalidCredentials(username, pwd, test) {
	request(app).
		post('/login').
		send({user:{username: username, pwd: pwd}}).
		expect(200).
		expect(/<title>Login<\/title>/).
		expect(/<form action="\/login" method="post">/).
		expect(/<div class="label label-important"/).
		end(function(err, res) {
			test.ok(!err);
			test.done();
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
	'without existing session you should be redirected to the login screen': function(test) {
		test.expect(1);
		request(app).
			get('/').
			expect(302).
			expect('Location', /\/login$/).
			end(function(err, res) {
				test.ok(!err);
				test.done();
			});
	},
	'logging in with proper credentials should redirect to /': function(test) {
		request(app).
			post('/login').
			send({user:{username: 'login-user', pwd: 'xxx'}}).
			expect(302).
			expect('Location', /\/$/).
			end(function(err, res) {
				test.ok(!err);
				test.done();
			});
	},
	'logging in with incorrect password should redisplay login form': function(test) {
		testLoggingInWithInvalidCredentials('login-user', 'XXX', test);
	},
	'logging in with unknown username should redisplay login form': function(test) {
		testLoggingInWithInvalidCredentials('????', 'xxx', test);
	}

}


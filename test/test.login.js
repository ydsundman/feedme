/*global test, setup, suite */

var assert = require('assert');
suite('test login module', function() {

	"use strict";

	var login = require('../routes/login'),
		User = require('../lib/models').User,
		username = 'login-user',
		pwd = 'xxx';

	function testInvalidRequest(u, p, done) {
		var invalidReq = {
				body:{
					user:{
						username:u,
						pwd:p
					}
				},
				session:{}
			},
			res = {
				render: function(view, locals) {
					assert.equal(2, arguments.length);
					assert.equal('auth/login', view);
					assert.equal('Login', locals.title);
					done();
				},
				redirect: function() {
					done('should not end up here');
				},
				locals:{}
			};

		login.submit(invalidReq, res, function(err) {
			assert.ok(!err);
			assert.ok(res.locals.error, 'an error message should be set for invalid credentials');
		});
	}

	setup(function(done) {
		User.remove({}, function(err) {
			var user = new User({username:'login-user', email: 'login-user@yds.se', password:'xxx'});
			user.save(function(err) {
				done(err);
			});
		});
	});

	test('login should have form and submit function properties', function() {
		assert.equal('function', typeof login.form);
		assert.equal('function', typeof login.submit);
	});

	test('login.form should render auth/login', function(done) {
		var req = {},
			res = {
				render: function(view, locals) {
					assert.equal(2, arguments.length);
					assert.equal('auth/login', view);
					assert.equal('Login', locals.title);
					done();
				}
			};
		login.form(req, res);
	});

	test('login.submit should redirect to / when logging in with proper credentials', function(done) {
		var validReq = {
				body:{
					user:{
						username:username,
						pwd:pwd
					}
				},
				session:{}
			},
			res = {
				render: function() {
					done('should not end up here');
				},
				redirect: function(view) {
					assert.equal(1, arguments.length);
					assert.equal('/', view);
					done();
				},
				locals:{}
			};

		login.submit(validReq, res, function(err) {
			done(err);
		});
	});

	test('login.submit should not redirect to / when logging in with incorrect password', function(done) {
		testInvalidRequest(username, 'xxx' + pwd + 'yyy', done);
	});

	test('login.submit should not redirect to / when logging in with username that does not exist', function(done) {
		testInvalidRequest('xxx' + username + 'yyy', pwd, done);
	});

});

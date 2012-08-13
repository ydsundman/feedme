/*global test, setup, suite */

var assert = require('assert');
suite('test login module using the actual app', function() {

	"use strict";

	process.env.PORT = 9999;

	var request = require('supertest'),
		User = require('../lib/models').User,
		app = require('../app');

	function testLoggingInWithInvalidCredentials(username, pwd, done) {
		request(app).
			post('/login').
			send({user:{username: username, pwd: pwd}}).
			expect(200).
			expect(/<title>Login<\/title>/).
			expect(/<form action="\/login" method="post">/).
			expect(/<div class="label label-important"/).
			end(function(err) {
				done(err);
			});
	}

	setup(function(done) {
		User.remove({}, function() {
			var user = new User({username:'login-user', email: 'login-user@yds.se', password:'xxx'});
			user.save(function(err) {
				done(err);
			});
		});
	});

	test('without existing session you should be redirected to the login screen', function(done) {
		request(app).
			get('/').
			expect(302).
			expect('Location', /\/login$/).
			end(function(err) {
				done(err);
			});
	});

	test('logging in with proper credentials should redirect to /', function(done) {
		request(app).
			post('/login').
			send({user:{username: 'login-user', pwd: 'xxx'}}).
			expect(302).
			expect('Location', /\/$/).
			end(function(err) {
				done(err);
			});
	});

	test('logging in with incorrect password should redisplay login form', function(done) {
		testLoggingInWithInvalidCredentials('login-user', 'XXX', done);
	});

	test('logging in with unknown username should redisplay login form', function(done) {
		testLoggingInWithInvalidCredentials('????', 'xxx', done);
	});

});


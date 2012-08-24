/*global test, setup, suite */

var should = require('should');
suite('test load user middleware', function() {

	"use strict";

	var redirectUserMiddleWare = require('../../lib/user').redirect,
		unauthorizedUserMiddleWare = require('../../lib/user').unauthorized,
		User = require('../../lib/models').User,
		uid1, uid2;

	function testLoadingCorrectUser(mw, uid, done) {
		var req = {
				session:{
					uid:uid
				}
			},
			res = {
				render: function() {
					done(new Error('should not end up here'));
				},
				locals:{}
			};

		mw(req, res, function(err) {
			req.user.id.should.equal(uid);
			res.locals.user.id.should.equal(uid);
			done(err);
		});
	}

	function testRedirectingToLogin(uid, done) {
		var req = {
				session:{
					uid:uid
				}
			},
			res = {
				redirect: function(view) {
					view.should.equal('/login');
					done();
				},
				locals:{}
			};

		redirectUserMiddleWare(req, res, function(err) {
			if (err) {done(err);}
		});

	}

	function testReturningUnauthorized(uid, done) {
		var req = {
				session:{
					uid:uid
				}
			},
			res = {
				json: function(code, body) {
					code.should.equal(401);
					body.should.eql({access:'unauthorized'});
					done();
				}
			};

		unauthorizedUserMiddleWare(req, res, function(err) {
			if (err) {done(err);}
		});

	}

	setup(function(done) {
		User.remove({}, function() {
			var user = new User({username:'login-user', email: 'login-user@yds.se', password:'xxx'});
			user.save(function() {
				uid1 = user.id;
				var user2 = new User({username:'login-user2', email: 'login-user2@yds.se', password:'yyy'});
				user2.save(function(err) {
					uid2 = user2.id;
					done(err);
				});
			});
		});
	});

	test('should load the correct user for uid1 with redirect mw', function(done) {
		testLoadingCorrectUser(redirectUserMiddleWare, uid1, done);
	});

	test('should load the correct user for uid2 with redirect mw', function(done) {
		testLoadingCorrectUser(redirectUserMiddleWare, uid2, done);
	});

	test('should load the correct user for uid1 with unauthorized mw', function(done) {
		testLoadingCorrectUser(unauthorizedUserMiddleWare, uid1, done);
	});

	test('should load the correct user for uid2 with unauthorized mw', function(done) {
		testLoadingCorrectUser(unauthorizedUserMiddleWare, uid2, done);
	});

	test('if no uid in the session, redirect to /login', function(done) {
		testRedirectingToLogin(undefined, done);
	});

	test('if uid for non existing user specified, redirect to /login', function(done) {
		testRedirectingToLogin('50242ce894ee71d501000022', done);
	});

	test('if no uid in the session, 401 (unauthorized)', function(done) {
		testReturningUnauthorized(undefined, done);
	});

});

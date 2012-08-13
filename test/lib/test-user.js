/*global test, setup, suite */

var assert = require('assert');
suite('test load user middleware', function() {

	"use strict";

	var userMiddleWare = require('../../lib/user'),
		User = require('../../lib/models').User,
		uid1, uid2;

	function testLoadingCorrectUser(uid, done) {
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

		userMiddleWare(req, res, function(err) {
			assert.equal(uid, req.user.id);
			assert.equal(uid, res.locals.user.id);
			done(err);
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

	test('should load the correct user for uid1', function(done) {
		testLoadingCorrectUser(uid1, done);
	});

	test('should load the correct user for uid2', function(done) {
		testLoadingCorrectUser(uid2, done);
	});

	test('if no uid in the session, redirect to /login', function(done) {
		var req = {
				session:{
					uid:undefined
				}
			},
			res = {
				redirect: function(view) {
					assert.equal('/login', view);
					done();
				},
				locals:{}
			};

		userMiddleWare(req, res, function(err) {
			if (err) {done(err);}
		});

	});

	test('if uid for non existing user specified, redirect to /login', function(done) {
		var req = {
				session:{
					uid:'50242ce894ee71d501000022'
				}
			},
			res = {
				redirect: function(view) {
					assert.equal('/login', view);
					done();
				},
				locals:{}
			};

		userMiddleWare(req, res, function(err) {
			if (err) {done(err);}
		});

	});

});

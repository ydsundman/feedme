/*global test, setup, suite */

var assert = require('assert');
suite('test user model', function() {

	"use strict";

	var User = require('../../lib/models').User;

	setup(function(done) {
		User.remove({}, function(err) {
			done(err);
		});
	});

	test('User should be a function', function(done) {
		assert.equal('function', typeof User);
		done();
	});

	test('It should be possible to create a User instance with email and username', function() {
		var user = new User({email:'email@somwehere.com', username:'user'});
		assert.ok(user);
		assert.equal('email@somwehere.com', user.get('email'));
		assert.equal('user', user.get('username'));
	});

	test('It should be possible to save a user and find it again by id', function(done) {

		var ts = new Date().getTime(), username = 'un' + ts, email = username + '@yds.se';

		var user = new User({username:username, email:email, password:'xxx'});
		user.save(function(err) {
			assert.ok(!err);
			var id = user._id;
			User.findById(id, function(err, user2) {
				assert.ok(!err);
				assert.equal(username, user2.username);
				assert.equal(email, user2.email);
				done();
			});
		});
	});

	test('A user instance should have a virtual property id that is identical to _id', function(done) {
		var user = new User({email:'email@somwehere.com', username:'user'}), _id = user._id, id = user.id;
		assert.equal(id, _id);
		assert.equal(user.get('id'), user.get('_id'));
		done();
	});

	test('it should be possible to authenticate a user against a password', function(done) {
		var user = new User({email:'email@somwehere.com', username:'user', password: 'xxx'});
		user.authenticate('xxx', function(err, auth) {
			assert.ok(auth, 'should pass');
		});
		user.authenticate('ZZZ', function(err, auth) {
			assert.ok(!auth, 'should not pass');
		});
		done();
	});

	test('It should be possible to find a user by name', function(done) {

		var ts = new Date().getTime(), username = 'un' + ts, email = username + '@yds.se';

		var user = new User({username:username, email:email, password:'xxx'});
		user.save(function(err) {
			assert.ok(!err);
			var id = user._id;
			User.findOne({username:username}, function(err, user2) {
				assert.ok(!err);
				assert.equal(username, user2.username);
				assert.equal(email, user2.email);
				done();
			});
		});
	});

});

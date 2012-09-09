/*global test, setup, suite */

var assert = require('assert'),
	async = require('async');
suite('test ShoppingList model', function() {

	"use strict";

	var ShoppingList = require('../../lib/models').ShoppingList,
		User = require('../../lib/models').User,
		list, uid;

	var addTestList = function(cb) {
		var ts = new Date().getTime(), name = 'name' + ts,
			sl = new ShoppingList({name:name, userId:uid});
		sl.save(function(err) {
			cb(err, sl);
		});
	};

	setup(function(done) {
		async.waterfall([
			function(cb) {
				console.log('Removing all users');
				User.remove({}, function(err) {
					console.log('done, err: ' + err);
					cb(err);
				});
			},
			function(cb) {
				console.log('Removing all shopping lists');
				ShoppingList.remove({}, function(err) {
					console.log('done, err: ' + err);
					cb(err);
				});
			},
			function(cb) {
				console.log('creating test user');
				var ts = new Date().getTime(), username = 'shopping-list-owner' + ts, email = username + '@yds.se';
				var user = new User({username:username, email:email, password:'xxx'});
				user.save(function(err) {
					console.log('done, err: ' + err);
					uid = user._id;
					cb(err);
				});
			},
			function(cb) {
				console.log('creating test list');
				addTestList(function(err, sl) {
					console.log('done, err: ' + err);
					list = sl;
					cb(err);
				});
			}],
			done);
	});

	test('ShoppingList should be a function', function() {
		assert.equal('function', typeof ShoppingList);
	});

	test('It should be possible to create a ShoppingList instance with a name and it should get an empty array of items', function() {
		var sl = new ShoppingList({name:'XXX'});
		assert.ok(sl);
		assert.equal('XXX', sl.get('name'));
		assert.ok(sl.get('items') instanceof Array, 'items should be Array');
		assert.equal(0, sl.items.length, 'items should be empty');
	});

	test('It should be possible to save a shopping list and find it again by id', function(done) {

		var ts = new Date().getTime(), name = 'name' + ts;

		var sl = new ShoppingList({name:name, userId:uid, items:[
			{name:'xxx'},
			{name:'yyy'}
		]});
		sl.save(function(err) {
			assert.ok(!err);
			ShoppingList.findById(sl.id, function(err, sl2) {
				assert.ok(!err);
				assert.equal(name, sl2.name, 'name should be \'' + name + '\'');
				assert.equal(2, sl2.items.length);
				assert.equal('xxx', sl2.items[0].name);
				assert.equal('yyy', sl2.items[1].name);
				done();
			});
		});
	});

	test('It should be possible to update an existing list including items', function(done) {

		ShoppingList.findById(list.id, function(err, sl) {
			assert.ok(!err);
			sl.items = [
				{name:'xxx'},
				{name:'yyy'}
			];
			sl.save(function(err2) {
				ShoppingList.findById(list.id, function(err, sl2) {
					assert.ok(!err);
					assert.equal(2, sl2.items.length);
					assert.equal('xxx', sl2.items[0].name);
					assert.equal('yyy', sl2.items[1].name);
					done();
				});
			});
		});
	});

	test('It should be possible to save a shopping list and find it again by user id', function(done) {

		var ts = new Date().getTime(), name = 'name' + ts,
			sl = new ShoppingList({name:name, userId: uid});
		sl.save(function(err) {
			assert.ok(!err);
			// There should now be two lists for this user id (from setup and this test method)
			ShoppingList.find({userId: uid}).sort('_id').exec(function(err, lists) {
				assert.ok(!err);
				assert.equal(2, lists.length);
				assert.equal(uid, String(lists[0].userId));
				assert.equal(uid, String(lists[1].userId));
				done();
			});
		});
	});

	test('uid is required', function() {
		var ts = new Date().getTime(), name = 'name' + ts,
			sl = new ShoppingList({name:name});
		sl.save(function(err) {
			assert.ok(err);
		});
	});

});

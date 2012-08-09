/*global test, setup, suite */

var assert = require('assert');
suite('test ShoppingList model', function() {

	"use strict";

	var ShoppingList = require('../lib/models').ShoppingList;

	setup(function(done) {
		ShoppingList.remove({}, function(err) {
			done(err);
		});
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

		var sl = new ShoppingList({name:name, items:['xxx', 'yyy']});
		sl.save(function(err) {
			assert.ok(!err);
			ShoppingList.findById(sl.id, function(err, sl2) {
				assert.ok(!err);
				assert.equal(name, sl2.name, 'name should be \'' + name + '\'');
				assert.equal(2, sl2.items.length);
				assert.equal('xxx', sl2.items[0]);
				assert.equal('yyy', sl2.items[1]);
				done();
			});
		});
	});

});

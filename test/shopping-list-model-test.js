process.env.NODE_ENV = 'test';

var mongoose = require('../lib/db-setup').mongoose,
	models = require('../lib/models'),
	ShoppingList;

models.setUp(mongoose, function() {
	ShoppingList = mongoose.model('ShoppingList');
});

module.exports = {

	setUp:function(cb) {
		ShoppingList.remove({}, function(err) {
			cb(err);
		});
	},

	'ShoppingList should be a function': function(test) {
		test.ok('function' === typeof ShoppingList);
		test.done();
	},

	'It should be possible to create a ShoppingList instance with a name and it should get an empty array of items': function(test) {
		var sl = new ShoppingList({name:'XXX'});
		test.ok(sl);
		test.equal(sl.get('name'), 'XXX');
		test.ok(sl.get('items') instanceof Array, 'items should be Array');
		test.equal(sl.items.length, 0, 'items should be empty');
		test.done();
	},

	'It should be possible to save a shopping list and find it again by id': function(test) {

		var ts = new Date().getTime(), name = 'name' + ts;

		test.expect(6);
		var sl = new ShoppingList({name:name, items:['xxx', 'yyy']});
		sl.save(function(err) {
			test.ok(!err);
			ShoppingList.findById(sl.id, function(err, sl2) {
				test.ok(!err);
				test.equal(sl2.name, name, 'name should be \'' + name + '\'');
				test.equal(sl2.items.length, 2);
				test.equal(sl2.items[0], 'xxx');
				test.equal(sl2.items[1], 'yyy');
				test.done();
			});
		});
	}

};

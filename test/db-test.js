var SlDb = require('../lib/db.js').SlDb,
	db = new SlDb();

exports['async'] = function(test) {
	test.expect(1);
	setTimeout(function() {
		test.ok(6 === 'foobar'.length);
		test.done();
	}, 2000);
};

exports.deleteTest = function(test) {
	test.expect(1);
	db.delete(function() {
		db.find({}, function(err, lists) {
			if (err) throw err;
			test.equal(lists.length, 0, 'Failure: there should be no lists after deleting all of them');
			test.done();
		});
	});
};

exports.addTest = function(test) {
	test.expect(1);
	db.add({name: 'xxx', items: []}, function(err, sl) {
		if (err) throw err;
		db.findById(sl._id, function(err, list) {
			if (err) throw err;
			test.equal(list.name, 'xxx', 'Failure: the list should have the proper name');
			test.done();
		});
	});
};

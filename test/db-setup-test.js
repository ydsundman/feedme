process.env.NODE_ENV = 'test';

var db_setup = require('../lib/db-setup');

module.exports['db-setup should have mongoose, Schema and ObjectId properties'] = function(test) {
	test.ok(db_setup.mongoose);
	test.ok(db_setup.Schema);
	test.ok(db_setup.ObjectId);
	test.done();
};
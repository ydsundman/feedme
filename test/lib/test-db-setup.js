/*global test, suite */

var assert = require('assert');
suite('db setup', function() {

	"use strict";

	var db_setup = require('../../lib/db-setup');

	test('db-setup should have mongoose, Schema and ObjectId properties', function() {
		assert.ok(db_setup.mongoose);
		assert.ok(db_setup.Schema);
		assert.ok(db_setup.ObjectId);
	});
});

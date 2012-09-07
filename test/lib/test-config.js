/*global test, suite */

var assert = require('assert');
suite('configuration settings', function() {

	"use strict";

	test('default settings should be test for tests', function() {
		var config = require('../../lib/config')();
		assert.equal('test', config.env);
	});

	test('settings should be set to process.env.NODE_ENV if provided', function() {
		process.env.NODE_ENV = 'production';
		var config = require('../../lib/config')();
		assert.equal('production', config.env);
	});

	test('mongoDbUrls should be correct depending on env', function() {
		process.env.NODE_ENV = 'production';
		assert.equal(process.env.FEEDME_MONGO_PROD, require('../../lib/config')().db_url);
		process.env.NODE_ENV = 'development';
		assert.equal(process.env.FEEDME_MONGO_DEV, require('../../lib/config')().db_url);
		process.env.NODE_ENV = 'test';
		assert.equal(process.env.FEEDME_MONGO_TEST, require('../../lib/config')().db_url);
	});

});

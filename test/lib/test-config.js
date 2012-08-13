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
		assert.equal('mongodb://sl:sl@ds033267.mongolab.com:33267/sl', require('../../lib/config')().db_url);
		process.env.NODE_ENV = 'development';
		assert.equal('mongodb://test:test@ds035997.mongolab.com:35997/sl-dev', require('../../lib/config')().db_url);
		process.env.NODE_ENV = 'test';
		assert.equal('mongodb://test:test@ds033267.mongolab.com:33267/yds-test', require('../../lib/config')().db_url);
	});

});

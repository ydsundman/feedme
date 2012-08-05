module.exports['default settings should be development'] = function(test) {
	test.expect(1);
	var config = require('../lib/config')();
	test.equal(config.env, 'development');
	test.done();
};

module.exports['settings should be set to process.env.NODE_ENV if provided'] = function(test) {
	test.expect(1);
	process.env.NODE_ENV = 'production';
	var config = require('../lib/config')();
	test.equal(config.env, 'production');
	test.done();
};

module.exports['mongoDbUrls should be correct depending on env'] = function(test) {
	test.expect(3);
	process.env.NODE_ENV = 'production';
	test.equal(require('../lib/config')().db_url, 'mongodb://sl:sl@ds033267.mongolab.com:33267/sl');
	process.env.NODE_ENV = 'development';
	test.equal(require('../lib/config')().db_url, 'mongodb://test:test@ds035997.mongolab.com:35997/sl-dev');
	process.env.NODE_ENV = 'test';
	test.equal(require('../lib/config')().db_url, 'mongodb://test:test@ds033267.mongolab.com:33267/yds-test');
	test.done();
};


var DB_URLS = {
	development: 'mongodb://test:test@ds035997.mongolab.com:35997/sl-dev',
	test: 'mongodb://test:test@ds033267.mongolab.com:33267/yds-test',
	production: 'mongodb://sl:sl@ds033267.mongolab.com:33267/sl'
};

module.exports = function() {
	var env = process.env.NODE_ENV || 'development';
	return {
		env: env,
		db_url: DB_URLS[env]
	};
};

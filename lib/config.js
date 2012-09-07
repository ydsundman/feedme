(function() {
	"use strict";

	var DB_URLS = {
		development:process.env.FEEDME_MONGO_DEV,
		test:process.env.FEEDME_MONGO_TEST,
		production:process.env.FEEDME_MONGO_PROD
	};

	module.exports = function() {
		var env = process.env.NODE_ENV || 'development';
		return {
			env:env,
			db_url:DB_URLS[env]
		};
	};
}());

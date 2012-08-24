(function() {
	"use strict";

	var user = require('../lib/user');

	module.exports = function(app, path, map, mw) {
		app.get('/' + path, mw || user.unauthorized, map.index);
		app.post('/' + path, mw || user.unauthorized, map.create);
		app.get('/' + path + '/:id', mw || user.unauthorized, map.show);
		app.put('/' + path + '/:id', mw || user.unauthorized, map.update);
		app.del('/' + path + '/:id', mw || user.unauthorized, map.destroy);
	};

})();

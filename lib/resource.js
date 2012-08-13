(function() {
	"use strict";

	module.exports = function(app, path, map) {
		app.get('/' + path, map.index);
		app.post('/' + path, map.create);
		app.get('/' + path + '/:id', map.show);
		app.put('/' + path + '/:id', map.update);
		app.del('/' + path + '/:id', map.destroy);
	};

})();

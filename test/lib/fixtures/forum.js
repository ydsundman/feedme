(function() {
	"use strict";

	exports.index = function(req, res) {
		res.send('forum index');
	};

	exports.create = function(req, res) {
		res.send('create forum');
	};

	exports.show = function(req, res) {
		res.send('show forum ' + req.params.id);
	};

	exports.update = function(req, res) {
		res.send('update forum ' + req.params.id);
	};

	exports.destroy = function(req, res) {
		res.send('destroy forum ' + req.params.id);
	};
}());

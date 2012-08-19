(function() {

	"use strict";

	var ShoppingList = require('../lib/models').ShoppingList;

	exports.index = function(req, res) {
		// TODO: Fix limit
		ShoppingList.find({}).limit(25).exec(function(err, lists) {
			if (err) {throw new Error(err);}
			res.json(lists);
		});
	};

	exports.show = function(req, res) {
		ShoppingList.findById(req.params.id, function(err, list) {
			if (err) {throw new Error(err);}
			res.json(list);
		});
	};

	exports.create = function(req, res) {
		var list = new ShoppingList({name: req.body.name, items: req.body.items || []});
		list.save(function(err) {
			if (err) {throw new Error(err);}
			res.json(201, list);
		});
	};

	exports.update = function(req, res) {
		ShoppingList.findById(req.params.id, function(err, list) {
			if (err) {throw new Error(err);}
			list.name = req.body.name;
			list.items = req.body.items || [];
			list.save(function(err) {
				if (err) {throw new Error(err);}
				res.json(list);
			});
		});
	};

	exports.destroy = function(req, res) {
		ShoppingList.findById(req.params.id, function(err, sl) {
			if (err) {throw new Error(err);}
			sl.remove(function(err) {
				if (err) {throw new Error(err);}
				res.json(sl);
			});
		});
	};

})();
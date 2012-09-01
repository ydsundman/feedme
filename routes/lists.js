(function() {

	"use strict";

	var ShoppingList = require('../lib/models').ShoppingList;

	exports.index = function(req, res, next) {
		// TODO: Fix limit
		ShoppingList.find({userId:req.user.id}).sort('name').limit(25).exec(function(err, lists) {
			if (err) {return next(err);}
			res.json(lists);
		});
	};

	exports.show = function(req, res, next) {
		ShoppingList.findById(req.params.id, function(err, list) {
			if (err) {return next(err);}
			res.json(list);
		});
	};

	exports.create = function(req, res, next) {
		var list = new ShoppingList({name: req.body.name, userId: req.user.id, items: req.body.items || []});
		list.save(function(err) {
			if (err) {console.log('err: ' + require('util').inspect(err));}
			if (err) {return next(err);}
			res.json(201, list);
		});
	};

	exports.update = function(req, res, next) {
		ShoppingList.findById(req.params.id, function(err, list) {
			if (err) {return next(err);}
			list.name = req.body.name;
			list.items = req.body.items || [];
			list.save(function(err) {
				if (err) {return next(err);}
				res.json(list);
			});
		});
	};

	exports.destroy = function(req, res, next) {
		ShoppingList.findById(req.params.id, function(err, sl) {
			if (err) {return next(err);}
			sl.remove(function(err) {
				if (err) {return next(err);}
				res.json(sl);
			});
		});
	};

})();
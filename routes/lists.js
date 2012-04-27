var util = require('util'),
	SlDb = require('../lib/db').SlDb,
	db = new SlDb();

exports.routes = [
	{
		verb: 'get',
		url: '/lists',
		handler: function(req, res) {
			db.find({}, function(err, sls) {
				if (err) {
					res.json(err, 500);
					return;
				}
				res.json(sls);
			});
		}
	},
	{
		verb: 'get',
		url: '/lists/:id',
		handler: function(req, res) {
			db.findById(req.params.id, function(err, sl) {
				if (err) {
					res.json(err, 404);
					return;
				}
				res.json(sl);
			});
		}
	},
	{
		verb: 'put',
		url: '/lists/:id',
		handler: function(req, res) {
			db.update(req.params.id, req.body, function(err, sl) {
				if (err) {
					res.json(err, 'not_found' === err ? 404 : 500);
					return;
				}
				res.json(sl);
			});
		}
	},
	{
		verb: 'post',
		url: '/lists',
		handler: function(req, res) {
			db.add(req.body, function(err, sl) {
				if (err) {
					res.json(err, 500);
					return;
				}
				res.json(sl);
			});
		}
	},
	{
		verb: 'delete',
		url: '/lists/:id',
		handler: function(req, res) {
			db.deleteById(req.params.id, function(err, sl) {
				if (err) {
					res.json(err, 'not_found' === err ? 404 : 500);
					return;
				}
				res.json(sl, 200);
			});
		}
	}

];

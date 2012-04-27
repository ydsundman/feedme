var mongoose = require('mongoose'),
	db = mongoose.connect(process.env.DB_URL),
	Schema = mongoose.Schema,
	Item = new Schema({
		name: String
	}),
	ShoppingList = new Schema({
		name	: String,
		items	: [Item]
	}),
	SlModel = mongoose.model('SlModel', ShoppingList),
	populateModel = function(model, o) {
		model = model || new SlModel();
		model.name = o.name;
		model.items = o.items || [];
		return model;
	};

console.log('DB_URL: ' + process.env.DB_URL);

exports.SlDb = function() {};

exports.SlDb.prototype = {

	add: function(slData, cb) { 
		var sl = populateModel(sl, slData);
		sl.save(function(err) {
			cb(err, sl);
		});
	},

	update: function(id, slData, cb) {
		this.findById(id, function(err, sl) {
			if (!sl) {
				cb('not_found');
				return;
			}
			populateModel(sl, slData);
			sl.save(function(err) {
				cb(err, sl);
			});
		});
	},

	findById: function(id, cb) {
		SlModel.findById(id, function(err, sl) {
			cb(err, sl);
		});
	},

	find: function(options, cb) {
		options = options || {};
		options.skip  = options.skip || 0;
		options.limit = options.limit || 25;
		SlModel.find({}).skip(options.skip).limit(options.limit).exec(function(err, sls) {
			cb(err, sls);
		});
	},

	deleteById: function(id, cb) {
		this.findById(id, function(err, sl) {
			if (err || !sl) {
				cb('not_found');
				return;
			}
			sl.remove();
			cb(null, sl);
		});
	},

	delete: function(cb) {
		this.find({}, function(err, sls) {
			if (err) throw err;
			sls.forEach(function(sl) {
				sl.remove();
			});
			cb();
		});
	},

	close: function() {
		db.disconnect();
	}
};

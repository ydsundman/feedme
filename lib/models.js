var	crypto = require('crypto'),
	User;

function setUp(mongoose, cb) {
	var Schema = mongoose.Schema,
		cb = cb || function() {};

	function required(value) {
		return value && value.length;
	}

	// User
	User = new Schema({
		'username': { type: String, validate: [required, 'username is required'], index: { unique: true } },
		'email': { type: String, validate: [required, 'email is required'], index: { unique: true } },
		'salt': String,
		'hashed_password': String
	});

	function makeSalt(cb) {
		var salt = Math.round((new Date().valueOf() * Math.random())) + '';
		cb(false, salt);
	}

	function encryptPassword(salt, plainTextPass, cb) {
		var hash = crypto.createHmac('sha1', salt).update(plainTextPass).digest('hex');
		cb(false, hash);
	}

	User.virtual('password')
		.set(function(password) {
			var that = this;
			this._password = password;
			makeSalt(function(err, salt) {
				if (err) throw err;
				that.salt = salt;
				encryptPassword(salt, password, function(err, hash) {
					if (err) throw err;
					that.hashed_password = hash;
				});
			});
		})
		.get(function() { return this._password; });

	User.methods.authenticate = function(plainTextPass, cb) {
		var that = this;
		encryptPassword(this.salt, plainTextPass, function(err, hash) {
			cb(err, hash === that.hashed_password);
		});
	};

	mongoose.model('User', User);

	// ShoppingList
	ShoppingList = new Schema({
		'name': { type: String, validate: [required, 'a name is required'], index: { unique: true } },
		'items': { type: [String], default: [] }
	});

	mongoose.model('ShoppingList', ShoppingList);

	cb();
}

exports.setUp = setUp;

var mongoose = require('mongoose'),
	url = require('./config')().db_url,
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

mongoose.set('debug', function (name, method) {
	switch (method) {
		case 'find':
		case 'findOne':
		case 'insert':
		case 'update':
		case 'remove':
			console.log('debug: ' + name + '.' + method + '(%j, %j)', arguments[2], arguments[3]);
			break;
	}
});

mongoose.connect(url);

module.exports = {
	mongoose: mongoose,
	Schema: Schema,
	ObjectId: ObjectId
};
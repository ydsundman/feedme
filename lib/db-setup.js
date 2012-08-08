var mongoose = require('mongoose'),
	url = require('./config')().db_url,
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

mongoose.set('debug', function (name, method) {
	console.log('MONGOOSE - debug: ' + name + '.' + method + '(%j, %j)', arguments[2], arguments[3]);
});

mongoose.connect(url);

module.exports = {
	mongoose: mongoose,
	Schema: Schema,
	ObjectId: ObjectId
};

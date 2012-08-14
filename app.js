(function() {
	"use strict";
	var express = require('express'),
		signup = require('./routes/signup'),
		login = require('./routes/login'),
		user = require('./lib/user'),
		http = require('http'),
		util = require('util'),
		path = require('path'),
		resource = require('./lib/resource');

	var app = module.exports = express();

	var port = process.env.PORT || 3000;

// Configuration

	app.configure(function() {
		app.set('port', port);
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'jade');
		app.use(express.favicon());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({ secret:'your secret here' }));
		app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
	});

	app.configure('development', function() {
		app.use(express.errorHandler());
		app.use(express.logger('dev'));
	});

	app.configure('production', function() {
		app.use(express.errorHandler());
	});

	resource(app, 'lists', require('./routes/lists'));

	app.locals.username = 'Guest';

	app.get('/', user, function(req, res) {
		console.log('index, session: ' + util.inspect(req.session));
		res.render('index', { title:'FeedMe', username:req.user ? req.user.username : 'Guest' });
	});

// Login
	app.get('/login', login.form);
	app.post('/login', login.submit);
	app.get('/logout', login.logout);

// Signup
	app.get('/signup', signup.form);
	app.post('/signup', signup.submit);

	http.createServer(app).listen(app.get('port'), function() {
		console.log("Express server listening on port " + app.get('port'));
	});

	module.exports.app = app;

})();

// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST http://localhost:3000/lists/12 -d '{"x":3}'
// curl -H "Accept: application/json" -H "Content-type: application/json" -X PUT http://localhost:3000/lists/12 -d '{"x":3}'
// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST http://localhost:3000/lists -d '{"name":"XXX"}'
// curl -H "Accept: application/json" -H "Content-type: application/json" -X PUT http://localhost:3000/lists/4f51c9ab1630261569000002 -d '{"name":"xxx new", "items":[{"name":"oj"},{"name":"candy"}]}'
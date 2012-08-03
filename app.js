
var express = require('express'),
	listRoutes = require('./routes/lists').routes,
	http = require('http'),
	path = require('path');

var app = module.exports = express();

var port = process.env.PORT || 3000;

// Configuration

app.configure(function() {
	app.set('port', port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret:'your secret here' }));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

listRoutes.forEach(function(r) {
	app[r.verb](r.url, r.handler);
})

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});

// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST http://localhost:3000/lists/12 -d '{"x":3}'
// curl -H "Accept: application/json" -H "Content-type: application/json" -X PUT http://localhost:3000/lists/12 -d '{"x":3}'
// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST http://localhost:3000/lists -d '{"name":"XXX"}'
// curl -H "Accept: application/json" -H "Content-type: application/json" -X PUT http://localhost:3000/lists/4f51c9ab1630261569000002 -d '{"name":"xxx new", "items":[{"name":"oj"},{"name":"candy"}]}'
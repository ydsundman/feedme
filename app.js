
var express = require('express'),
	listRoutes = require('./routes/lists').routes;

var app = module.exports = express.createServer();

var port = process.env.PORT || 3000;

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'your secret here' }));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

listRoutes.forEach(function(r) {
	app[r.verb](r.url, r.handler);
})

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST http://localhost:3000/lists/12 -d '{"x":3}'
// curl -H "Accept: application/json" -H "Content-type: application/json" -X PUT http://localhost:3000/lists/12 -d '{"x":3}'
// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST http://localhost:3000/lists -d '{"name":"XXX"}'
// curl -H "Accept: application/json" -H "Content-type: application/json" -X PUT http://localhost:3000/lists/4f51c9ab1630261569000002 -d '{"name":"xxx new", "items":[{"name":"oj"},{"name":"candy"}]}'
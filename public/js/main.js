require.config({
	paths: {
		underscore: 'libs/underscore/underscore', // https://github.com/amdjs
		backbone: 'libs/backbone/backbone', // https://github.com/amdjs
//		sinon: 'libs/sinon/sinon.js',

		// Require.js plugins
		text: 'libs/require/text',
//		order: 'libs/require/order',

		// Just a short cut so we can put our html outside the js dir
		// When you have HTML/CSS designers this aids in keeping them out of the js directory
		templates: '../templates'
	},
	urlArgs: "bust=" +  (new Date()).getTime()

});


require(['views/lists', 'router'], function(ListsView, Router) {

	var listsView = new ListsView();
	Router.initialize({appView: listsView});
	listsView.render();

	Backbone.history.start();
});

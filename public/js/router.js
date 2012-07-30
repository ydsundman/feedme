// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'*actions': 'defaultAction' // All urls will trigger this route
		}
	});

	var initialize = function(options){
		var appView = options.appView;
		var router = new AppRouter(options);

		router.on('route:defaultAction', function (actions) {
//			require(['views/dashboard/page'], function (DashboardPage) {
//				var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage);
//				dashboardPage.render();
//			});
			alert('actions: ' + actions);
		});

	};
	return {
		initialize: initialize
	};
});

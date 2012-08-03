define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'list/:id':'showList',
			'*actions':'defaultAction' // All urls will trigger this route
		},
		showList: function(id) {
			console.log('showList:' + id);
		}
	});

	var initialize = function(options) {
		var appView = options.appView;
		var router = new AppRouter(options);

		router.on('route:defaultAction', function(actions) {
			console.log('actions: ' + actions);
//			require(['views/dashboard/page'], function (DashboardPage) {
//				var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage);
//				dashboardPage.render();
//			});
		});

	};
	return {
		initialize:initialize
	};
});

/*global define */
(function() {
	"use strict";
	define(['jquery','underscore','backbone','views/lists','views/list'],
		function($, _, Backbone, ListsView, ListView) {
		var AppRouter = Backbone.Router.extend({

			routes:{
				'list/:id':'showList'
			},

			showList:function(id) {
				console.log('showList:' + id);
				this.listView.selectItem(id);
			},

			initialize: function() {
				console.log('AppRouter.initialize()');
				this.listsView = new ListsView({router:this});
				this.listView = new ListView();
				this.listsView.render();
			}
		});

		var initialize = function(options) {
			var router = new AppRouter(options);
		};
		return {
			initialize:initialize
		};
	});
})();

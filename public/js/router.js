/*global define */
(function() {
	"use strict";
	define([
		'jquery',
		'underscore',
		'backbone',
		'views/lists-navigation',
		'views/add-list',
		'views/list',
		'collections/lists'
],
		function($, _, Backbone, ListsNavigationView, ListCreationView, ListView, Lists) {
		var AppRouter = Backbone.Router.extend({

			routes:{
				'list/:id':'showList'
			},

			showList:function(id) {
				console.log('showList:' + id);
				this.listView.selectItem(id);
			},

			initialize: function() {
				var that = this;
				console.log('AppRouter.initialize()');
				this.lists = new Lists();
				this.listsNavigationView = new ListsNavigationView({router:this});
				this.listCreationView = new ListCreationView({router:this});
				this.listView = new ListView();
				this.listCreationView.render();
				this.lists.fetch({
					success:function() {
						that.listsNavigationView.render();
					}
				});
			}
		});

		var initialize = function(options) {
			var router = new AppRouter(options);
		};
		return {
			initialize:initialize
		};
	});
}());

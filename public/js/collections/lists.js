/*global define */
(function() {
	"use strict";
	define([
		'backbone',
		'models/shopping-list'
	], function(Backbone, ShoppingList) {
		var Lists = Backbone.Collection.extend({
			model:ShoppingList,
			url:'/lists'
		});
		return Lists;
	});
})();

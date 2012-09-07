/*global define */
(function() {
	"use strict";
	define([
		'backbone'
	], function(Backbone) {
		var ShoppingList = Backbone.Model.extend({
			idAttribute: '_id',
			urlRoot:'/lists'
		});
		return ShoppingList;
	});
}());

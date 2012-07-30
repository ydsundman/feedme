define([
	'backbone'
], function(Backbone) {
	var ShoppingList = Backbone.Model.extend({
		url:'/lists'
	});
	return ShoppingList;
});

define([
	'jquery',
	'underscore',
	'backbone',
	'models/shopping-list'
], function($, _, Backbone, ShoppingList){
	var Lists = Backbone.Collection.extend({
		model: ShoppingList,
		url: 'http://localhost:3000/lists'
	});
	return Lists;
});

console.log('in shopping-list!');

define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	var ShoppingList = Backbone.Model.extend({
		url: 'http://localhost:3000/lists'
	});
	console.log('_: ' + _);
	console.log('Backbone: ' + Backbone);
	console.log('ShoppingList: ' + ShoppingList);
	return ShoppingList;
});

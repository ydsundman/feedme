/*global define */
(function() {
	"use strict";
	define([
		'jquery',
		'underscore',
		'backbone',
		'text!templates/list-create-new.html'
	], function($, _, Backbone, listCreationTemplate) {

		var ListsView = Backbone.View.extend({
			el:'#addList',

			render:function() {
				var that = this;
				$(that.el).html(that.template());
			},

			initialize:function() {
				console.log('ListsView.initialize()');
				this.template = _.template(listCreationTemplate);
				this.router = this.options.router;
				this.lists = this.router.lists;
			},

			events:{
				'click #addNewShoppingList':'addNew'
			},

			addNew:function(event) {
				event.preventDefault();
				var target = this.$('input'), val = target.val();
				this.lists.create({name:val}, {wait:true});
				target.val('');
			}
		});
		return ListsView;
	});
}());
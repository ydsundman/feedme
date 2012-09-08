/*global define */
(function() {
	"use strict";
	define([
		'jquery',
		'underscore',
		'backbone',
		'collections/lists',
		'text!templates/list-navigation.html',
		'text!templates/list-navigation-item.html'
	], function($, _, Backbone, Lists, navigationTemplate, navigationItemTemplate) {

		var ListsView = Backbone.View.extend({
			el:'#navigation',

			render:function() {
				var that = this;
				$(this.el).append(this.template({lists:this.lists.models, _:_}));
			},

			initialize:function() {
				console.log('ListsView.initialize()');
				this.template = _.template(navigationTemplate);
				this.itemTemplate = _.template(navigationItemTemplate);
				this.router = this.options.router;
				this.lists = this.router.lists;
				this.lists.bind('add', this.addNewShoppingList, this);
			},

			events:{
				'click a.shoppingListName':'selectList'
			},

			addNewShoppingList:function(list) {
				var markup = this.itemTemplate({list:list.toJSON()});
				this.$('#shoppingLists').prepend(markup);
				this.$('li[data-id=' + list.get('_id') +'] a').click();
			},

			selectList:function(event) {
				var a = $(event.target), list = a.parent(), id = list.attr('data-id');
				if(this.currentListIsSelected(list)) {
					this.clearListSelection(list.parent());
					this.router.navigate('', true);
				} else {
					this.clearListSelection(list.parent());
					this.markListAsSelected(list);
					this.router.navigate('list/' + id, true);
				}
			},

			currentListIsSelected:function(list) {
				return list.hasClass('active');
			},

			markListAsSelected:function(list) {
				list.addClass('active');
			},

			clearListSelection:function(lists) {
				lists.children().removeClass('active');
				lists.children().find('.shoppingList').remove();
			}
		});
		return ListsView;
	});
}());
/*global define */
(function() {
	"use strict";
	define([
		'jquery',
		'underscore',
		'backbone',
		'collections/lists',
		'text!templates/lists.html',
		'text!templates/list-row-template.html'
	], function($, _, Backbone, Lists, listsTemplate, rowTemplate) {

		var ListsView = Backbone.View.extend({
			el:'#main',

			render:function() {
				var that = this;
				this.lists.fetch({
					success:function(lists) {
						$(that.el).html(that.template({lists:lists.models, _:_}));
					}
				});
			},

			initialize:function() {
				console.log('ListsView.initialize()');
				this.template = _.template(listsTemplate);
				this.rowTemplate = _.template(rowTemplate);
				this.router = this.options.router;
				this.lists = new Lists();
				this.lists.bind('add', this.addNewShoppingList, this);
			},

			events:{
				'click a.shoppingListName':'selectList',
				'click #addNewShoppingList':'addNew'
			},

			addNewShoppingList:function(list) {
				var markup = this.rowTemplate({list:list.toJSON()});
				this.$('#shoppingLists').prepend(markup);
				this.$('li[data-id=' + list.get('_id') +'] a').click();
			},

			renderItem:function(list) {
				var markup = this.rowTemplate({list:list.toJSON()});
				this.$('#shoppingLists').append(markup);
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
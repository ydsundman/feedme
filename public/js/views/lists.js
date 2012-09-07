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
				this.lists.bind('add', this.renderItem, this);
			},

			events:{
				'click a':'selectList',
				'click button':'addNew'
			},

			renderItem:function(list) {
				var markup = this.rowTemplate({list:list.toJSON()});
				this.$('table tbody').append(markup);
			},

			selectList:function(event) {
				var a = $(event.target), id = a.parent().attr('data-id');
				this.markListAsSelected(a.parent());
				this.router.navigate('list/' + id, true);
			},

			markListAsSelected:function(listItem) {
				this.clearListSelection(listItem.parent());
				listItem.addClass('active');
			},

			clearListSelection:function(list) {
				list.children().removeClass('active');
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
})();
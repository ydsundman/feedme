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
				'click td':'selectList',
				'click button':'addNew'
			},

			renderItem:function(list) {
				var markup = this.rowTemplate({list:list.toJSON()});
				this.$('table tbody').append(markup);
			},

			selectList:function(event) {
				var id = $(event.target).attr('data-id');
				this.router.navigate('list/' + id, true);
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
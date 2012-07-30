define([
	'jquery',
	'underscore',
	'backbone',
	'collections/lists',
	'text!templates/lists.html'
], function($, _, Backbone, Lists, listsTemplate) {
	var ListsView = Backbone.View.extend({
		el:'#main',
		render:function() {
			var that = this;
			var lists = new Lists();
			lists.fetch({
				success:function(lists) {
					$(that.el).html(_.template(listsTemplate, {lists:lists.models, _:_}));
				}
			});
		}
	});
	return ListsView;
});

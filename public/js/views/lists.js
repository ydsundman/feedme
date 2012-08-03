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
		,
		events: {
			'click': 'click'
		},
		click: function(event) {
			var target = $(event.target);
			console.log('id: ' + target.attr('id'));
			console.log('Backbone.Router.navigate: ' + Backbone.Router.navigate);
//			var message = new MessageModel();
//			message.save({ message: $('.message').val()}, {
//				success: function () {
//					that.trigger('postMessage');
//				}
//			});
		}
	});
	return ListsView;
});



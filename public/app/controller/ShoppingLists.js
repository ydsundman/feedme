Ext.define('FeedMe.controller.ShoppingLists', {
	extend: 'Ext.app.Controller',

	models: ['List'],
	stores: ['Lists'],

	init: function() {
		this.control({
			'lists': {
				render: this.onEditorRender
			}
		});
	},

	onEditorRender: function() {
		console.log("Lists panel was rendered");
	}
});
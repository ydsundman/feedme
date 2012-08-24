(function() {

	"use strict";

	require.config({
		paths:{
			underscore:'libs/underscore/underscore',
			backbone:'libs/backbone/backbone',

			// Require.js plugins
			text:'libs/require/text',

			// Just a short cut so we can put our html outside the js dir
			// When you have HTML/CSS designers this aids in keeping them out of the js directory
			templates:'../templates'
		},
		urlArgs:"bust=" + (new Date()).getTime()

	});

	require(['jquery', 'router', 'backbone'], function($, Router, Backbone) {
		$(document).ajaxError( function(e, xhr, options){
			if (xhr.status === 401) {
				location.replace('/login');
			}
		});

		Router.initialize();
		Backbone.history.start();
	});
})();
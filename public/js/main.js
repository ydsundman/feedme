(function() {

	"use strict";

	require.config({
		paths:{
			underscore:'libs/underscore/underscore',
			backbone:'libs/backbone/backbone',
			text:'libs/require/text',
			templates:'../templates'
		},
		urlArgs:"bust=" + (new Date()).getTime()
	});

	require(['jquery', 'router', 'backbone', 'utils/setup'], function($, Router, Backbone, setup) {
//		$(document).ajaxError( function(e, xhr, options){
//			if (xhr.status === 401) {
//				location.replace('/login');
//			}
//		});
		setup();
		Router.initialize();
		Backbone.history.start();
	});
})();
(function() {

	"use strict";

	require.config({
		paths:{
			underscore:'libs/underscore/underscore',
			backbone:'libs/backbone/backbone',
			text:'libs/require/text',
			templates:'../templates',
			jqueryui:'libs/jquery-ui-1.8.23.custom.min'
		},
		urlArgs:"bust=" + (new Date()).getTime()
	});

	require(['jquery', 'router', 'backbone', 'utils/setup'], function($, Router, Backbone, setup) {
		setup();
		Router.initialize();
		Backbone.history.start();
	});
}());
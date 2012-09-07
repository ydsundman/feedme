/*global define */
(function() {
	"use strict";
	define([
		'jquery'
	], function($) {
		return function() {
			console.log('Handle ajax unauthorized.');
			$(document).ajaxError( function(e, xhr){
				if (xhr.status === 401) {
					location.replace('/login');
				}
			});
		};
	});
})();

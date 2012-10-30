/*global module */
module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg:'<json:package.json>',
		test:{
			files:['test/**/*.js']
		},
		lint:{
			files:[
				'grunt.js',
				'lib/**/*.js', 'routes/**/*.js', 'views/**/*.js', 'test/**/*.js',
				'public/js/collections/**/*.js', 'public/js/models/**/*.js', 'public/js/utils/**/*.js', 'public/js/views/**/*.js', 'public/js/main.js', 'public/js/router.js'
			]
		},
		watch:{
			files:'<config:lint.files>',
			tasks:'default'
		},
		jshint:{
			options:{
				curly:true,
				eqeqeq:true,
				immed:true,
				latedef:true,
				newcap:true,
				noarg:true,
				sub:true,
				undef:true,
				boss:true,
				eqnull:true,
				node:true
			},
			globals:{
				exports:true
			}
		},
		sass: {
			compile: {
				files: {
					'public/css/style.css': 'scss/css/style.scss'
				}
			}
		}
	});

	var npm = require('npm');
	grunt.registerTask('npm-test', 'Runs npm test', function() {
		var done = this.async();
		npm.load({}, function(err, npm) {
			npm.commands.test([], function(err, s) {
				if (err) {
					process.exit(99);
				}
				done();
			});
		});
	});

	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', 'lint npm-test');
	grunt.registerTask('travis', 'lint npm-test');

};
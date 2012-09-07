/*global module */
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg:'<json:package.json>',
		test:{
			files:['test/**/*.js']
		},
		lint:{
			files:['grunt.js', 'lib/**/*.js', 'routes/**/*.js', 'views/**/*.js', 'test/**/*.js']
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
		}
	});

	// Default task.
	grunt.registerTask('default', 'lint');

//	var npm = require('npm');
//	console.log('npm.test:\n', npm.test);
//	grunt.registerTask('npm-test', 'Runs npm test', function() {
//		npm.load({}, function(err) {
//			console.log('err:', err);
//			npm.test();
//		});
//		grunt.utils.spawn({cmd:'npm', args: ['test']}, function(err, res, code) {
//			grunt.log.writeln("err: " + err);
//			grunt.log.writeln("res: " + res);
//			grunt.log.writeln("code: " + code);
//		});
//		if (arguments.length === 0) {
//			grunt.log.writeln(this.name + ", no args");
//		} else {
//			grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
//		}
//	});

};
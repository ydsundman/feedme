/*global test, setup, suite */

var assert = require('assert'),
	should = require('should'),
	request = require('supertest');

suite('Test setup of a resource. Will be used until express-resource is express 3.x worthy.', function() {

	"use strict";

	process.env.PORT = 9998;

	var app = require('../../app'),
		resource = require('../../lib/resource'),
		forum = resource(app, 'forums', require('./fixtures/forum'), function(req, res, next){next();});

	test('resource should be a function', function() {
		resource.should.be.a('function');
	});

	test('GET path', function(done) {

		request(app).
			get('/forums').
			expect(200).
			expect("forum index").
			end(done);

	});

	test('POST path', function(done) {

		request(app).
			post('/forums').
			expect(200).
			expect("create forum").
			end(done);

	});

	test('GET path/:id', function(done) {

		request(app).
			get('/forums/123').
			expect(200).
			expect("show forum 123").
			end(done);

	});

	test('PUT path/:id', function(done) {

		request(app).
			put('/forums/123').
			expect(200).
			expect("update forum 123").
			end(done);

	});

	test('DELETE path/:id', function(done) {

		request(app).
			del('/forums/123').
			expect(200).
			expect("destroy forum 123").
			end(done);

	});
});

//GET     /                 ->  index
//GET     /new              ->  new
//	POST    /                 ->  create
//GET     /:id              ->  show
//GET     /:id/edit         ->  edit
//PUT     /:id              ->  update
//DELETE  /:id              ->  destroy
/*global test, setup, suite */

var assert = require('assert'),
	should = require('should'),
	request = require('supertest');

suite('test ShoppingList model', function() {

	"use strict";

	var path = 'lists2',
		ShoppingList = require('../../lib/models').ShoppingList,
		resource = require('../../lib/resource'),
		app = require('../../app'),
		lists = resource(app, path, require('../../routes/lists')),
		list0, list1;

	var addTestList = function(cb) {
		var ts = new Date().getTime(), name = 'name' + ts,
			sl = new ShoppingList({name:name});
		sl.save(function(err) {
			cb(err, sl);
		});
	};

	setup(function(done) {
		ShoppingList.remove({}, function(err) {
			addTestList(function(e0, sl0) {
				list0 = sl0;
				addTestList(function(e1, sl1) {
					list1 = sl1;
					done();
				});
			});
		});
	});

	test('GET should return a list with two ShoppingList items', function(done) {
		request(app).
			get('/' + path).
			expect(200).
			expect('Content-Type', /json/).
			end(function(err, res) {
				var sls = res.body;
				sls.should.have.length(2);
				sls[0]._id.should.eql(list0.id);
				sls[1]._id.should.eql(list1.id);
				done(err);
			});
	});

	test('GET with id should return the proper ShoppingList item', function(done) {
		request(app).
			get('/' + path + '/' + list1.id).
			expect(200).
			expect('Content-Type', /json/).
			end(function(err, res) {
				var sl = res.body;
				sl._id.should.eql(list1.id);
				done(err);
			});
	});

	test('POST should create new instance with id and all', function(done) {
		request(app).
			post('/' + path).
			send({name: 'xxx', items:[{name:'xyz'}, {name:'XYZ'}]}).
			expect(200).
			expect('Content-Type', /json/).
			end(function(err, res) {
				var sl = res.body;
				sl.name.should.eql('xxx');
				sl.should.have.property('_id');
				verifyThatReadingListWithIdWorks(sl._id, done);
			});
	});

	var verifyThatReadingListWithIdWorks = function(id, done) {
		ShoppingList.findById(id, function(err, sl) {
			if (err) {return done(err);}
			String(sl._id).should.eql(id);
			sl.name.should.eql('xxx');
			sl.items.should.have.length(2);
			sl.items[0].name.should.eql('xyz');
			sl.items[1].name.should.eql('XYZ');
			done();
		});
	};

	test('PUT should update the shopping list with the given id with the data posted', function(done) {
		request(app).
			put('/' + path + '/' + list1.id).
			send({name: 'xxx', items:[{name:'xyz'}, {name:'XYZ'}]}).
			expect(200).
			expect('Content-Type', /json/).
			end(function(err, res) {
				verifyThatReadingListWithIdWorks(list1.id, done);
			});
	});

	test('DELETE should delete the list with the given id', function(done) {
		request(app).
			del('/' + path + '/' + list1.id).
			expect(200).
			expect('Content-Type', /json/).
			end(function(err, res) {
				ShoppingList.findById(list1.id, function(err, sl) {
					should.not.exist(sl);
					done();
				});
			});
	});

});
/*global test, setup, suite */

var assert = require('assert'),
	should = require('should'),
	request = require('supertest'),
	async = require('async');

suite('test ShoppingList model', function() {

	"use strict";

	var path = 'lists2',
		ShoppingList = require('../../lib/models').ShoppingList,
		User = require('../../lib/models').User,
		resource = require('../../lib/resource'),
		app = require('../../app'),
		lists = resource(app, path, require('../../routes/lists'), function(req, res, next){next();}),
		list0, list1,
		uid;

	var addTestList = function(cb) {
		var ts = new Date().getTime(), name = 'name' + ts,
			sl = new ShoppingList({name:name, userId:uid});
		sl.save(function(err) {
			cb(err, sl);
		});
	};

	setup(function(done) {
		async.waterfall([
			function(cb) {
				User.remove({}, function(err) {
					cb(err);
				});
			},
			function(cb) {
				ShoppingList.remove({}, function(err) {
					cb(err);
				});
			},
			function(cb) {
				var ts = new Date().getTime(), username = 'shopping-list-owner' + ts, email = username + '@yds.se';
				var user = new User({username:username, email:email, password:'xxx'});
				user.save(function(err) {
					uid = user._id;
					cb(err);
				});
			},
			function(cb) {
				addTestList(function(err, sl) {
					list0 = sl;
					cb(err);
				});
			},
			function(cb) {
				addTestList(function(err, sl) {
					list1 = sl;
					cb(err);
				});
			}
		], done);
	});

//	test('GET should return a list with two ShoppingList items', function(done) {
//		request(app).
//			get('/' + path).
//			expect(200).
//			expect('Content-Type', /json/).
//			end(function(err, res) {
//				var sls = res.body;
//				sls.should.have.length(2);
//				sls[0]._id.should.eql(list0.id);
//				sls[1]._id.should.eql(list1.id);
//				done(err);
//			});
//	});

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

//
//  Need to figure out how to login with supertest here.
//
//	test('POST should create new instance with id and all', function(done) {
//		request(app).
//			post('/' + path).
//			send({name: 'xxx', items:[{name:'xyz'}, {name:'XYZ'}]}).
//			expect(200).
//			expect('Content-Type', /json/).
//			end(function(err, res) {
//				var sl = res.body;
//				sl.name.should.eql('xxx');
//				sl.should.have.property('_id');
//				verifyThatReadingListWithIdWorks(sl._id, done);
//			});
//	});

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
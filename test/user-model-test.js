process.env.NODE_ENV = 'test';

var User = require('../lib/models').User;

module.exports = {

	setUp:function(cb) {
		User.remove({}, function(err) {
			cb(err);
		});
	},

	'User should be a function': function(test) {
		test.ok('function' === typeof User);
		test.done();
	},

	'It should be possible to create a User instance with email and username': function(test) {
		var user = new User({email:'email@somwehere.com', username:'user'});
		test.ok(user);
		test.equal(user.get('email'), 'email@somwehere.com');
		test.equal(user.get('username'), 'user');
		test.done();
	},

	'It should be possible to save a user and find it again by id': function(test) {

		var ts = new Date().getTime(), username = 'un' + ts, email = username + '@yds.se';

		test.expect(4);
		var user = new User({username:username, email:email, password:'xxx'});
		user.save(function(err) {
			test.ok(!err);
			var id = user._id;
			User.findById(id, function(err, user2) {
				test.ok(!err);
				test.equal(user2.username, username);
				test.equal(user2.email, email);
				test.done();
			});
		});
	},

	'A user instance should have a virtual property id that is identical to _id': function(test) {
		var user = new User({email:'email@somwehere.com', username:'user'}), _id = user._id, id = user.id;
		test.equal(_id, id);
		test.equal(user.get('_id'), user.get('id'));
		test.done();
	},

	'it should be possible to authenticate a user against a password': function(test) {
		test.expect(2);
		var user = new User({email:'email@somwehere.com', username:'user', password: 'xxx'});
		user.authenticate('xxx', function(err, auth) {
			test.ok(auth, 'should pass');
		});
		user.authenticate('ZZZ', function(err, auth) {
			test.ok(!auth, 'should not pass');
		});
		test.done();
	},

	'It should be possible to find a user by name': function(test) {

		var ts = new Date().getTime(), username = 'un' + ts, email = username + '@yds.se';

		test.expect(4);
		var user = new User({username:username, email:email, password:'xxx'});
		user.save(function(err) {
			test.ok(!err);
			var id = user._id;
			User.findOne({username:username}, function(err, user2) {
				test.ok(!err);
				test.equal(user2.username, username);
				test.equal(user2.email, email);
				test.done();
			});
		});
	}

};

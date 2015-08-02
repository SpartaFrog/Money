'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local',
			birthDate: new Date(),
			county: 'Madrid',
			population: 'Alpedrete'
		});
		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local',
			birthDate: new Date(),
			county: 'Madrid',
			population: 'Alpedrete'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save();
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without last name', function(done) {
			user.lastName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without email', function(done) {
			user.email = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without user name', function(done) {
			user.username = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without birthDate', function(done) {
			user.birthDate = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without county', function(done) {
			user.county = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without population', function(done) {
			user.population = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save with no valid currency', function(done) {
			user.currency = ['error'];
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});
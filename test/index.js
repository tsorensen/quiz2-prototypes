'use strict';

var chai = require('chai');
var assert = require('assert');
var User = require('../user');
var expect = chai.expect;

describe('01 authenticate', function() {

  it('should have the username property', function() {
    var user = new User('user', 'pass');
    expect(user.username).to.be.equal('user');
  });

  it('should have the password property', function() {
    var user = new User('user2', 'pass');
    expect(user.password).to.be.a('string');
  });

  it('should have an authenticate method', function() {
    var user = new User('user3', 'pass');
    expect(user.authenticate).to.be.a('function');
    expect(user.authenticate('pass')).to.be.equal(true);
    expect(user.authenticate('pass2')).to.be.equal(false);
  });

});

describe('02 hashing', function() {

  it('should hash the password', function() {
    var user = new User('user4', 'pass');
    expect(user.password).to.not.be.equal('pass');
  });

});

describe('03 unique', function() {

  it('should break if the username is not unique', function() {
    expect(function() {
      var user = new User('user4', 'pass');
    }).to.throw(assert.AssertionError);
  });

});

describe('04 lookup', function() {

  it('should be able to look users up by username', function() {
    let user = new User('user5', 'pass');

    expect(User.find).to.be.a('function');
    expect(User.find('user5')).to.be.equal(user);
    expect(User.find('user6')).to.be.equal(null);
  });

});

describe('05 static authenticate', function() {

  it('should be able to authenticate', function() {
    let user = new User('user6', 'pass');

    expect(User.authenticate).to.be.a('function');
    expect(User.authenticate('user6', 'pass')).to.be.equal(user);
    expect(User.authenticate('user6', 'pass2')).to.be.equal(false);
    expect(User.authenticate('user7', 'pass')).to.be.equal(false);
  });

});

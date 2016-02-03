'use strict';

var assert = require('assert');
var bcrypt = require('bcrypt');

var users = [];
var usernameIndex = {};

function User(username, password) {
  var usernameExists = User.find(username);

  assert(!usernameExists, 'Username is already in use');

  //set username, hashed password
  this.username = username;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  this.password = hash;

  users.push(this);
  usernameIndex[this.username] = this;
}

User.prototype.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

User.find = function(username) {
  return usernameIndex[username] || null;
};

User.authenticate = function(username, password) {
  var user = User.find(username);

  if(!user) { return false; }

  var validPassword = user.authenticate(password);

  if(validPassword) { return user; }

  return false;
};

module.exports = User;

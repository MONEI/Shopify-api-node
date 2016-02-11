'use strict';
let object;
let assert = require('assert');
let should = require('should');
let nock = require('nock');
let config = require('../config.js');
let loadFixture = function(name) {
	return require('./fixtures/' +  object + '/' + name + '.json');
};
let shop = exports.test_shop = config.test_shop;
exports.load = loadFixture;
exports.nock = nock;
exports.should = should;
exports.endpoint = shop + '/admin';
exports.setObject = function(name) {
  object = name;
};
exports.resource = function() {
  return require('../lib/resources/' + object + '.js')
};

var assert = require('assert')
  , should = require('should')
  , nock   = require('nock')
  , object;
  
var config = require('../config.js');

var loadFixture = function(name) {
	return require("./fixtures/"+ object +"/"+ name +".json");
}

exports.load = loadFixture;
var shop = exports.test_shop = config.test_shop; 
exports.nock = nock;
exports.should = should;
exports.endpoint = shop + '/admin'

exports.setObject = function(name){  object = name; }
exports.resource = function(){ return require('../lib/resources/'+ object +'.js')}

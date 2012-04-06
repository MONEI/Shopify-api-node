var assert = require('assert')
  , should = require('should')
  , nock   = require('nock')
  , object;
  

var loadFixture = function(name) {
	return require("./fixtures/"+ object +"/"+ name +".json");
}

exports.load = loadFixture;
exports.test_shop = "https://test.myshopify.com";
exports.nock = nock;
exports.should = should;

exports.setObject = function(name){  object = name; }
exports.resource = function(){ return require('../lib/resources/'+ object +'.js')}
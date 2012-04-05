var assert = require('assert')
  , should = require('should')
  , Session = require('../lib/session.js');

describe('Session', function() {
  it('should not be valid with a url', function(done) {
    var session = new Session("", "any-token", "any-api-key", "any-secret");
    session.valid().should.equal(false);
	done();
  });

  it('should always use https for connections', function(done){
  	var session = new Session("", "any-token", "any-api-key", "any-secret");
  	session.protocol.should.equal("https");
  	done();
  });
 
});
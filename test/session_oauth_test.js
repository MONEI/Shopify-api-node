var assert = require('assert')
  , should = require('should')
  , Session = require('../lib/session-oauth.js');

var config = require('../config.js');
describe('SessionOAuth', function() {
/*
  it('should exchange the temporary token for a permanent access token on redirectURL', function(done) {
    var session = new Session(config.shop, config.client_id, config.secret);
    session.onRedirectUrl("/myredirect?code=" + config.code + "&store=test_store", function(token){
      assert(session.persistent_token != null, true);
      done();
    });
  });
*/
  it('should use the pesistent_token on creation if applicable', function(done){
    var session = new Session(config.shop, '','', config.persistent_token);
    assert(session.persistent_token != null, true);
    done();
  });

  it('should not be valid with a url', function(done) {
    var session = new Session("", "any-token", "any-api-key", config.persistent_token);
    session.valid().should.equal(false);
	done();
  });

  it('should always use https for connections', function(done){
  	var session = new Session("", "any-token", "any-api-key", config.persistent_token);
  	session.protocol.should.equal("https");
  	done();
  });
 
});

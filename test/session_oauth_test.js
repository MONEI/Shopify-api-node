var assert = require('assert')
  , should = require('should')
  , nock   = require('nock')
  , config = require('../config.js')
  , Session = require('../lib/session-oauth.js')
  ;


describe('SessionOAuth', function() {
  it('should ask shopify for a temporary token ', function(done) {
    var temporaryTokenToPermanentReq = nock(config.test_shop)
      //.log(console.log)
      .post('/admin/oauth/access_token', 'client_id='+config.client_id+'&client_secret='+config.secret+'&code='+config.code)
      .reply(200, {access_token: config.persistent_token})

    var session = new Session(config.shop, config.client_id, config.secret, {
      scope: {orders: "read"},
      uriForTemporaryToken: config.test_shop+"/login/finalize/token",
      onAskToken: onToken
    });

    function onToken (err, url) {
      should.not.exist(err);
      url.should.be.a.String('scope=read_orders');

      this.onRedirectUrl("/myredirect?code=" + config.code + "&store="+config.shop, function(store, token){

        temporaryTokenToPermanentReq.done();
        should.exist(store);
        should.exist(token);
        should.exist(session.persistent_token);
        session.persistent_token.should.equal(token);

        done();

      });
    }
  });

  it('should use the persistent_token on creation if applicable', function(done){
    var session = new Session(config.shop, config.client_id, config.secret, config.persistent_token);
    should.exist(session.persistent_token);
    session.persistent_token.should.equal(config.persistent_token);
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

'use strict';
let assert = require('assert');
let should = require('should');
let nock   = require('nock');
let config = require('../config.js');
let Session = require('../lib/sessions/session-oauth.js');


describe('SessionOAuth', function() {
  it('should ask shopify for a temporary token ', function(done) {
    let client = config.client_id + '&client_secret=' + config.secret;
    let temporaryTokenToPermanentReq = nock(config.test_shop)
    .post(
      '/admin/oauth/access_token',
      'client_id=' + client + '&code=' + config.code
    )
    .reply(200, {access_token: config.persistent_token});
    let session = new Session(config.shop, config.client_id, config.secret, {
      scope: {orders: 'read'},
      uriForTemporaryToken: config.test_shop + '/login/finalize/token',
      onAskToken: onToken
    });
    function onToken(err, url) {
      let redirect = '/myredirect?code=' + config.code + '&store=' + config.shop;
      should.not.exist(err);
      url.should.be.a.String('scope=read_orders');
      this.onRedirectUrl(redirect, (store, token) => {
        temporaryTokenToPermanentReq.done();
        should.exist(store);
        should.exist(token);
        should.exist(session.persistentToken);
        session.persistentToken.should.equal(token);
        done();
      });
    }
  });

  it('should use the persistent_token on creation if applicable', done => {
    let token = config.persistent_token;
    let session = new Session(config.shop, config.client_id, config.secret, token);
    should.exist(session.persistentToken);
    session.persistentToken.should.equal(config.persistent_token);
    done();
  });

  it('should not be valid with a url', done => {
    let token = config.persistent_token;
    let session = new Session('', 'any-token', 'any-api-key', token);
    session.valid().should.equal(false);
    done();
  });

  it('should always use https for connections', done => {
    let token = config.persistent_token;
    let session = new Session('', 'any-token', 'any-api-key', token);
    session.protocol.should.equal('https');
    done();
  });

});

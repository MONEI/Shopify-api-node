'use strict';
const Session = require('./session');
const Adapter = require('../components/adapter');

class SessionOAuth extends Session {

  constructor(storeName, apiKey, secret, params) {
    super(storeName, apiKey, secret, params, true);
    this.storeName = storeName;
    this.apiKey = apiKey;
    this.secret = secret;
    params = params || {};
    this.getTemporaryAccessToken = this.getTemporaryAccessToken.bind(this);
    if (typeof params === 'string') {
      this.persistentToken = params;
      params = {
        persistentToken: this.persistentToken
      };
    } else {
      params = params || {};
      this.persistentToken = params.persistentToken || null;
    }
    this.params = params;
    this.registerOAuthToken(params);
    this.setResources();
  }

  onRedirectUrl(url, cb) {
    return url.replace(/\?code=[\w\d]+/, code => {
      let tempToken = code.split('=')[1];
      return this.requestPermanentAccessToken(tempToken)
      .then((res) => {
        this.persistentToken = JSON.parse(res.body).access_token;
        this.registerOAuthToken();
        cb(this.storeName, this.persistentToken);
      });
    });
  }

  requestPermanentAccessToken(tempToken) {
    let params = 'client_id=' + this.apiKey + '&client_secret='
    + this.secret + '&code=' + tempToken;
    return Adapter.post(this.site() + '/oauth/access_token', 'oauth', params);
  }

  getTemporaryAccessToken() {
    let scope = this.getScope();
    if (!scope.length) {
      let e = Error('No Shopify scope defined, cannot ask for no right');
      this.params.onAskToken(e);
    }
    let baseURI = this.site() + '/oauth/authorize?client_id='
    + this.apiKey + '&scope=' + scope;
    if (this.params.uriForTemporaryToken) {
      return this.params.onAskToken.call(
        this,
        null,
        baseURI + '&redirect_uri=' + this.params.uriForTemporaryToken
      );
    } else {
      return this.params.onAskToken.call(this, null, baseURI);
    }
  }

  site() {
    return this.protocol + '://' + this.storeName + '.myshopify.com/admin';
  }

  registerOAuthToken() {
    if (this.persistentToken !== null) {
      return Adapter.setOAuthToken(this.persistentToken);
    } else if (typeof this.params.onAskToken === 'function') {
      return this.getTemporaryAccessToken();
    } else {
      throw Error(`No onAskToken callback defined for getting temporary oauth2
      token from Shopify, and no persistent token defined either in session`);
    }
  }

  getScope(currentScope) {
    let types = [
      'content',
      'themes',
      'products',
      'customers',
      'orders',
      'script_tags',
      'shipping'
    ];
    let scope = [];
    this.scope = currentScope;
    this.scope = this.scope || this.params.scope || {};
    types.map(type => {
      if (this.scope[type]) {
        if (typeof this.scope[type] === 'string') {
          this.scope[type] = this.scope[type].split(/[\/,]/);
        }
        if (Array.isArray(this.scope[type])) {
          let rights = this.scope[type].map(right => {
            return right + '_' + type;
          });
          scope.push(rights.join(','));
        }
      }
    });
    return scope.join(',');
  }

}

module.exports = SessionOAuth;

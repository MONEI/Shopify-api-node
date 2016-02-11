/**
 * @private
 * @class SessionOAuth
 * @extends Session
 * @description Creates oauth session
 * @requires session
 * @requires adapter
 */
'use strict';
const Session = require('./session');
const Adapter = require('../components/adapter');

module.exports = class SessionOAuth extends Session {

  /**
  * @private
  * @description Sets the class properties, register oauth token, and
  * sets resources as properties to this class
  * @param {string} storeName
  * @param {string} apiKey
  * @param {string} secret
  * @param {object} params
  */
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
    this.registerOAuthToken();
    this.setResources();
  }

  /**
  * @private
  * @description Calls requestPermanentAccessToken when the temporary token
  * is received and after that, calls the callback function by passing
  * the store name and the persistent token as arguments
  * @param {string} url - the url from which will be extracted the temp. token
  * @param {function} cb - callback function
  */
  onRedirectUrl(url, cb) {
    url.replace(/\?code=[\w\d]+/, code => {
      let tempToken = code.split('=')[1];
      this.requestPermanentAccessToken(tempToken)
      .then((res) => {
        this.persistentToken = JSON.parse(res.body).access_token;
        this.registerOAuthToken();
        cb(this.storeName, this.persistentToken);
      });
    });
  }

  /**
  * @private
  * @description Gets persistent token using the temporary one
  * @param {string} tempToken - temporary token
  * @returns {object} promise - request promise
  */
  requestPermanentAccessToken(tempToken) {
    let params = 'client_id=' + this.apiKey + '&client_secret='
    + this.secret + '&code=' + tempToken;
    return Adapter.post(this.site() + '/oauth/access_token', 'oauth', params);
  }

  /**
  * @private
  * @description Gets temporary access token
  */
  getTemporaryAccessToken() {
    let scope = this.getScope();
    if (!scope.length) {
      let e = Error('No Shopify scope defined, cannot ask for no right');
      this.params.onAskToken(e);
    }
    let baseURI = this.site() + '/oauth/authorize?client_id='
    + this.apiKey + '&scope=' + scope;
    if (this.params.uriForTemporaryToken) {
      this.params.onAskToken.call(
        this,
        null,
        baseURI + '&redirect_uri=' + this.params.uriForTemporaryToken
      );
    } else {
      this.params.onAskToken.call(this, null, baseURI);
    }
  }

  /**
  * @private
  * @description Generates the store url by contatinating the protocol,
  * the store name, and the admin ext.
  * @returns {string} site - store url
  */
  site() {
    return this.protocol + '://' + this.storeName + '.myshopify.com/admin';
  }

  /**
  * @private
  * @description Register persistent token if exists, if no - get a new one
  * @param {object} params - get parameters
  * @throws {error}
  */
  registerOAuthToken() {
    if (this.persistentToken !== null) {
      Adapter.setOAuthToken(this.persistentToken);
    } else if (typeof this.params.onAskToken === 'function') {
      this.getTemporaryAccessToken();
    } else {
      throw Error(`No onAskToken callback defined for getting temporary oauth2
      token from Shopify, and no persistent token defined either in session`);
    }
  }

  /**
  * @private
  * @description Get the scope for the session
  * @param {object} currentScope
  * @returns {string} scope
  */
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

};

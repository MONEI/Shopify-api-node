/**
 * @private
 * @class Session
 * @description Creates session
 * @requires crypto
 * @requires utilities
 * @requires resources
 */
'use strict';
const crypto = require('crypto');
const Utilities = require('../components/utilities');
const Resources = require('../components/resources');

class Session {

  /**
  * @private
  * @description Sets the class properties, validate signature,
  * and if it's not a super class - set resources as properties
  * @param {string} url1
  * @param {string} apiKey
  * @param {string} secret
  * @param {object} params
  * @param {boolean} isSuper
  * @throws {error} Invalid signature
  */
  constructor(url1, apiKey, secret, params, isSuper) {
    let expireTime;
    let timestamp;
    this.url = url1;
    this.apiKey = apiKey;
    this.secret = secret;
    this.params = params || {};
    if (this.params.signature) {
      timestamp = new Date(this.params.timestamp).getTime();
      expireTime = new Date().getTime() - 24 * 84600;
      if (!this.validateSignature(this.params) && expireTime > timestamp) {
        throw new Error('Invalid signature: Possible malicious login.');
      }
    }
    if (!isSuper) {
      this.setResources();
    }
  }

  /**
  * @private
  * @description Returns the protocol that will be used for this session
  * @returns {string} protocol
  */
  get protocol() {
    return 'https';
  }

  /**
  * @private
  * @description Creates permission url which will be used to obtain access
  * @returns {string} url
  */
  createPermissionUrl() {
    if (!Utilities.isEmptyString(this.url)
     && !Utilities.isEmptyString(this.apiKey)) {
      return 'http://' + this.url + '/admin/api/auth?api_key=' + this.apiKey;
    }
  }

  /**
  * @private
  * @description Generates the store url by contatinating the protocol,
  * the store name, and the admin ext.
  * @returns {string} protocol
  */
  site() {
    let site = this.protocol + '://' + this.apiKey + ':' + this.secret;
    return site + '@' + this.url + '/admin';
  }

  /**
  * @private
  * @description ?????
  * @returns {string} protocol
  */
  valid() {
    return !Utilities.isEmptyString(this.url);
  }

  /**
  * @private
  * @description Prepare the url for the store which will be used with
  * current session
  * @param {string} url
  * @returns {string} url
  */
  prepareUrl(url) {
    if (Utilities.isEmptyString(url)) {
      return '';
    }
    url.replace(/https?:\/\//, '');
    if (url.indexOf('.') === -1) {
      url += '.myshopify.com';
    }
    return url;
  }

  /**
  * @private
  * @description Check if the current signature is valid
  * @param {object} params
  * @returns {boolean}
  */
  validateSignature(params) {
    let generatedSignature;
    let k;
    let v;
    this.signature = params.signature;
    generatedSignature = this.secret;
    params = Utilities.sortObj(params);
    for (k in params) {
      v = params[k];
      if (k !== 'signature'
       && k !== 'action'
       && k !== 'controller'
       && !Utilities.isNumeric(k)
       && k) {
        generatedSignature += k + '=' + v;
      }
    }
    generatedSignature = crypto.createHash('md5')
    .update('' + generatedSignature).digest('hex');
    return generatedSignature === this.signature;
  }

  /**
  * @private
  * @description Sets all available resources as properties to this class
  */
  setResources() {
    let resources = Resources.getResources(this.site());
    Object.keys(resources).map(key => {
      this[key] = resources[key];
    });
  }

}

module.exports = Session;

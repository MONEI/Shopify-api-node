'use strict';
const crypto = require('crypto');
const Utilities = require('../components/utilities');
const Resources = require('../components/resources');

class Session {

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
      this.getResources();
    }
  }

  get protocol() {
    return 'https';
  }

  createPermissionUrl() {
    if (!Utilities.isEmptyString(this.url)
     && !Utilities.isEmptyString(this.apiKey)) {
      return 'http://' + this.url + '/admin/api/auth?api_key=' + this.apiKey;
    }
  }

  site() {
    let site = this.protocol + '://' + this.apiKey + ':' + this.secret;
    return site + '@' + this.url + '/admin';
  }

  valid() {
    return !Utilities.isEmptyString(this.url);
  }

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

  setResources() {
    let resources = Resources.getResources(this.site());
    Object.keys(resources).map(key => {
      this[key] = resources[key];
    });
  }

}

module.exports = Session;

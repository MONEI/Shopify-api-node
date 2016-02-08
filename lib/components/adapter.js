/**
 * @private
 * @class Adapter
 * @description Making requests to Shopify API.
 * @requires request
 * @requires bluebird
 */
'use strict';
const request = require('request');
const bluebird = require('bluebird');
const promisifiedRequest = {
  get: bluebird.promisify(request.get),
  put: bluebird.promisify(request.put),
  del: bluebird.promisify(request.del),
  post: bluebird.promisify(request.post)
};
let oauthToken;

module.exports = class Adapter {

  /**
  * @private
  * @static
  * @method request
  * @description Make a request to the api endpoint.
  * @param {string} url - url
  * @param {string|object} entity - the current resource
  * @param {string} method - can be get / post / put / delete
  * @param {object} fields - in the body of the request
  * @returns {object} promise - request promise
  */
  static request(url, entity, method, fields) {
    let options = {
      uri: url,
      json: entity !== 'oauth',
      headers: oauthToken ? {'X-Shopify-Access-Token': oauthToken } : {}
    };
    method = method === 'delete' ? 'del' : method;
    if (method === 'postAsync') {
      options.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    if (fields) {
      let params = {};
      // TODO - to understand the following ?
      if (entity && entity !== 'oauth') {
        params[typeof entity === 'object' ? entity.short : entity] = fields;
        options.body = JSON.stringify(params);
      } else {
        options.body = fields;
      }
    }
    return promisifiedRequest[method](options);
  }

  /**
  * @private
  * @static
  * @method get
  * @description Get request method.
  * @param {string} url - url
  * @param {string|object} entity - the current resource
  * @param {object} fields - passed in the body of the request
  * @returns {object} promise - request promise
  */
  static get(url, entity, fields) {
    return Adapter.request(url, entity, 'get', fields);
  }

  /**
  * @private
  * @static
  * @method post
  * @description Post request method.
  * @param {string} url - url
  * @param {string|object} entity - the current resource
  * @param {object} fields - passed in the body of the request
  * @returns {object} promise - request promise
  */
  static post(url, entity, fields) {
    return Adapter.request(url, entity, 'post', fields);
  }

  /**
  * @private
  * @static
  * @method put
  * @description Put request method.
  * @param {string} url - url
  * @param {string|object} entity - the current resource
  * @param {object} fields - passed in the body of the request
  * @returns {object} promise - request promise
  */
  static put(url, entity, fields) {
    return Adapter.request(url, entity, 'put', fields);
  }

  /**
  * @private
  * @static
  * @method delete
  * @description Delete request method.
  * @param {string} url - url
  * @param {string|object} entity - the current resource
  * @param {object} fields - passed in the body of the request
  * @returns {object} promise - request promise
  */
  static delete(url, entity, fields) {
    return Adapter.request(url, entity, 'delete', fields);
  }

  /**
  * @private
  * @static
  * @method setOAuthToken
  * @description Set the authentication token.
  * @param {string} token - authentication token
  */
  static setOAuthToken(token) {
    oauthToken = token;
  }

};

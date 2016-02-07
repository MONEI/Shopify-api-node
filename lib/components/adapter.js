'use strict';
let request = require('request');
let bluebird = require('bluebird');
let promisifiedRequest = {
  get: bluebird.promisify(request.get),
  put: bluebird.promisify(request.put),
  del: bluebird.promisify(request.del),
  post: bluebird.promisify(request.post)
};
let oauthToken;

module.exports = class Adapter {

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

  static get(url, entity, fields) {
    return Adapter.request(url, entity, 'get', fields);
  }

  static post(url, entity, fields) {
    return Adapter.request(url, entity, 'post', fields);
  }

  static post(url, entity, fields) {
    return Adapter.request(url, entity, 'post', fields);
  }

  static put(url, entity, fields) {
    return Adapter.request(url, entity, 'put', fields);
  }

  static delete(url, entity, fields) {
    return Adapter.request(url, entity, 'delete', fields);
  }

  static setOAuthToken(token) {
    oauthToken = token;
  }

};

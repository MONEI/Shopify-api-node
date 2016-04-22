'use strict';

const camelCase = require('lodash/camelCase');
const assign = require('lodash/assign');
const path = require('path');
const got = require('got');
const fs = require('fs');

const pkg = require('./package');

/**
 * Creates a Shopify instance.
 *
 * @param {String} shop The name of the shop
 * @param {String} key The API Key
 * @param {String} password The password
 * @constructor
 * @public
 */
function Shopify(shop, key, password) {
  if (!(this instanceof Shopify)) return new Shopify(shop, key, password);
  if (!shop || !key) throw new Error('Missing required arguments');

  let auth;

  //
  // If we have only 2 arguments, `key` is a persistent OAuth2 token.
  //
  if (password) {
    auth = `${key}:${password}`;
  } else {
    this.token = key;
  }

  //
  // API call limits, updated with each request.
  //
  this.callLimits = {
    max: undefined,
    current: undefined,
    remaining: undefined
  };

  this.baseUrl = {
    hostname: `${shop}.myshopify.com`,
    protocol: 'https:',
    auth
  };
}

/**
 * Sends a request to a Shopify API endpoint.
 *
 * @param {Object} url URL object
 * @param {String} method HTTP method
 * @param {String} [key] Key name to use for req/res body
 * @param {Object} [params] Request body
 * @return {Promise}
 * @private
 */
Shopify.prototype.request = function request(url, method, key, params) {
  const options = assign({
    headers: { 'User-Agent': `${pkg.name}/${pkg.version}` },
    json: true,
    retries: 0,
    method
  }, url);

  if (this.token) options.headers['X-Shopify-Access-Token'] = this.token;

  if (params) {
    const body = key ? { [key]: params } : params;

    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return got(options).then(res => {
    const body = res.body;

    const callLimitHeader = res.headers['x-shopify-shop-api-call-limit'];

    if (callLimitHeader) {
      const callLimits = this.callLimits;
      const splitLimit = callLimitHeader.split('/');
      callLimits.max = +splitLimit[1];
      callLimits.current = +splitLimit[0];
      callLimits.remaining = callLimits.max - callLimits.current;
    }

    if (key) return body[key];
    return body || {};
  });
};

//
// Require and instantiate the resources lazily.
//
fs.readdirSync(path.join(__dirname, 'resources')).forEach(name => {
  const prop = camelCase(name.slice(0, -3));

  Object.defineProperty(Shopify.prototype, prop, {
    get: function get() {
      const resource = require(`./resources/${name}`);

      return Object.defineProperty(this, prop, {
        value: new resource(this)
      })[prop];
    },
    set: function set(value) {
      return Object.defineProperty(this, prop, { value })[prop];
    }
  });
});

module.exports = Shopify;

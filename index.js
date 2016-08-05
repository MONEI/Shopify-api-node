'use strict';

const camelCase = require('lodash/camelCase');
const assign = require('lodash/assign');
const defaults = require('lodash/defaults');
const path = require('path');
const got = require('got');
const fs = require('fs');

const pkg = require('./package');

/**
 * Creates a Shopify instance.
 *
 * @param {Object} options Options object.
 * @param {String} options.shopName The name of the shop
 * @param {String} options.apiKey The API Key
 * @param {String} options.password The private app password
 * @param {String} options.accessToken The persistent OAuth public app token
 * @param {Number} options.timeout=60000 How long to wait in milliseconds
 *                                       before timing out a request
 * @constructor
 * @public
 */
function Shopify(options) {
  if (!(this instanceof Shopify)) return new Shopify(options);

  options = this.options = defaults(options, {
    timeout: 60000
  });

  if (!options.shopName) {
    throw new Error('Missing required shopName option');
  }

  let auth;

  //
  // If we have apiKey, we also need password
  // otherwise, we just need token
  //
  if (options.apiKey && options.password) {
    auth = `${options.apiKey}:${options.password}`;
  } else if (!options.accessToken) {
    throw new Error('Missing required options');
  }

  //
  // API call limits, updated with each request.
  //
  this.callLimits = {
    remaining: undefined,
    current: undefined,
    max: undefined
  };

  this.baseUrl = {
    hostname: `${options.shopName}.myshopify.com`,
    protocol: 'https:',
    auth
  };
}

/**
 * Updates API call limits.
 *
 * @param {String} header X-Shopify-Shop-Api-Call-Limit header
 * @private
 */
Shopify.prototype.updateLimits = function updateLimits(header) {
  if (!header) return;

  const limits = header.split('/').map(Number);
  const callLimits = this.callLimits;

  callLimits.remaining = limits[1] - limits[0];
  callLimits.current = limits[0];
  callLimits.max = limits[1];
};

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
    timeout: this.options.timeout,
    method
  }, url);

  if (this.options.accessToken) {
    options.headers['X-Shopify-Access-Token'] = this.options.accessToken;
  }

  if (params) {
    const body = key ? { [key]: params } : params;

    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return got(options).then(res => {
    const body = res.body;

    this.updateLimits(res.headers['x-shopify-shop-api-call-limit']);

    if (key) return body[key];
    return body || {};
  }, err => {
    this.updateLimits(
      err.response && err.response.headers['x-shopify-shop-api-call-limit']
    );

    return Promise.reject(err);
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

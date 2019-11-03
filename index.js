'use strict';

const transform = require('lodash/transform');
const defaults = require('lodash/defaults');
const assign = require('lodash/assign');
const EventEmitter = require('events');
const stopcock = require('stopcock');
const got = require('got');
const url = require('url');

const pkg = require('./package');
const resources = require('./resources');

/**
 * Creates a Shopify instance.
 *
 * @param {Object} options Configuration options
 * @param {String} options.shopName The name of the shop
 * @param {String} options.apiKey The API Key
 * @param {String} options.password The private app password
 * @param {String} options.accessToken The persistent OAuth public app token
 * @param {String} [options.apiVersion] The Shopify API version to use
 * @param {Boolean} [options.presentmentPrices] Whether to include the header to
 *     pull presentment prices for products
 * @param {Boolean|Object} [options.autoLimit] Limits the request rate
 * @param {Number} [options.timeout] The request timeout
 * @constructor
 * @public
 */
function Shopify(options) {
  if (!(this instanceof Shopify)) return new Shopify(options);
  if (
    !options ||
    !options.shopName ||
    !options.accessToken && (!options.apiKey || !options.password) ||
    options.accessToken && (options.apiKey || options.password)
  ) {
    throw new Error('Missing or invalid options');
  }

  EventEmitter.call(this);
  this.options = defaults(options, { timeout: 60000 });

  //
  // API call limits, updated with each request.
  //
  this.callLimits = {
    remaining: undefined,
    current: undefined,
    max: undefined
  };
  this.callGraphqlLimits = {
    remaining: undefined,
    current: undefined,
    max: undefined
  };

  this.baseUrl = {
    auth: !options.accessToken && `${options.apiKey}:${options.password}`,
    headers: {},
    hostname: !options.shopName.endsWith('.myshopify.com')
      ? `${options.shopName}.myshopify.com`
      : options.shopName,
    protocol: 'https:'
  };

  if (options.autoLimit) {
    const conf = transform(options.autoLimit, (result, value, key) => {
      if (key === 'calls') key = 'limit';
      result[key] = value;
    }, { bucketSize: 35 });

    this.request = stopcock(this.request, conf);
  }
}

Object.setPrototypeOf(Shopify.prototype, EventEmitter.prototype);

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

  this.emit('callLimits', callLimits);
};

/**
 * Sends a request to a Shopify API endpoint.
 *
 * @param {Object} uri URL object
 * @param {String} method HTTP method
 * @param {String} [key] Key name to use for req/res body
 * @param {Object} [params] Request body
 * @return {Promise}
 * @private
 */
Shopify.prototype.request = function request(uri, method, key, params) {
  const options = assign({
    timeout: this.options.timeout,
    json: true,
    retries: 0,
    method
  }, uri);

  options.headers['User-Agent'] = `${pkg.name}/${pkg.version}`;

  if (this.options.accessToken) {
    options.headers['X-Shopify-Access-Token'] = this.options.accessToken;
  }

  if (params) {
    const body = key ? { [key]: params } : params;

    options.headers['Content-Type'] = 'application/json';
    options.body = body;
  }

  return got(options).then(res => {
    const body = res.body;

    this.updateLimits(res.headers['x-shopify-shop-api-call-limit']);

    if (res.statusCode === 202) {
      const retryAfter = res.headers['retry-after'] * 1000 || 0;
      const path = url.parse(res.headers['location']).path;

      return delay(retryAfter).then(() => {
        return this.request(assign({ path }, this.baseUrl), 'GET', key);
      });
    }

    const data = key ? body[key] : body || {};

    if (res.headers.link) {
      const link = parseLinkHeader(res.headers.link);

      if (link.next) {
        Object.defineProperties(data, {
          nextPageParameters: { value: link.next.query }
        });
      }

      if (link.previous) {
        Object.defineProperties(data, {
          previousPageParameters: { value: link.previous.query }
        });
      }
    }

    return data;
  }, err => {
    this.updateLimits(
      err.response && err.response.headers['x-shopify-shop-api-call-limit']
    );

    return Promise.reject(err);
  });
};

/**
 * Updates GraphQL API call limits.
 *
 * @param {String} throttle The status returned in the GraphQL response
 * @private
 */
Shopify.prototype.updateGraphqlLimits = function updateGraphqlLimits(throttle) {
  const limits = this.callGraphqlLimits;

  limits.remaining = throttle.currentlyAvailable;
  limits.current = throttle.maximumAvailable - throttle.currentlyAvailable;
  limits.max = throttle.maximumAvailable;

  this.emit('callGraphqlLimits', limits);
};

/**
 * Sends a request to the Shopify GraphQL API endpoint.
 *
 * @param {String} [data] Request body
 * @return {Promise}
 * @public
 */
Shopify.prototype.graphql = function graphql(data, variables) {
  let path = '/admin/api';

  if (this.options.apiVersion) {
    path += `/${this.options.apiVersion}`;
  }

  path += '/graphql.json';

  const json = variables !== undefined && variables !== null;
  const options = assign({
    timeout: this.options.timeout,
    retries: 0,
    method: 'POST',
    body: json ? JSON.stringify({ query: data, variables }) : data,
    path
  }, this.baseUrl);

  options.headers['User-Agent'] = `${pkg.name}/${pkg.version}`;
  options.headers['Content-Type'] = json
    ? 'application/json'
    : 'application/graphql';

  if (this.options.accessToken) {
    options.headers['X-Shopify-Access-Token'] = this.options.accessToken;
  }

  return got(options).then(res => {
    try {
      res.body = JSON.parse(res.body);
    } catch (err) {
      const opts = assign({
        host: options.hostname,
        url: url.resolve(url.format(options), options.path)
      }, options);
      throw new got.ParseError(err, res.statusCode, opts, res.body);
    }

    if (res.body.extensions && res.body.extensions.cost) {
      this.updateGraphqlLimits(res.body.extensions.cost.throttleStatus);
    }

    if (res.body.errors) {
      const first = res.body.errors[0];
      const err = new Error(first.message);

      err.locations = first.locations;
      err.path = first.path;
      err.extensions = first.extensions;
      err.response = res;

      throw err;
    }

    return res.body.data || {};
  });
};

resources.registerAll(Shopify);

/**
 * Returns a promise that resolves after a given amount of time.
 *
 * @param {Number} ms Amount of milliseconds to wait
 * @return {Promise} Promise that resolves after `ms` milliseconds
 * @private
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parses the `Link` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed header
 * @private
 */
function parseLinkHeader(header) {
  return header.split(',').reduce(reducer, {});
}

/**
 * The callback function for `Array.prototype.reduce()` used by
 * `parseLinkHeader()`.
 *
 * @param {Array} acc The accumulator
 * @param {Object} cur The current element being processed in the array
 * @return {Object} The accumulator
 * @private
 */
function reducer(acc, cur) {
  const pieces = cur.trim().split(';');
  const link = url.parse(pieces[0].trim().slice(1, -1), true);
  const rel = pieces[1].trim().slice(4);

  if (rel === '"next"') acc.next = link;
  else acc.previous = link;

  return acc;
}

module.exports = Shopify;

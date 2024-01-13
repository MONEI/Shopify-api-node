'use strict';

const transform = require('lodash/transform');
const EventEmitter = require('events');
const stopcock = require('stopcock');
const got = require('got');
const url = require('url');

const pkg = require('./package');
const resources = require('./resources');

const retryableErrorCodes = new Set([
  'ETIMEDOUT',
  'ECONNRESET',
  'EADDRINUSE',
  'ECONNREFUSED',
  'EPIPE',
  'ENOTFOUND',
  'ENETUNREACH',
  'EAI_AGAIN'
]);
const retryableErrorCodesArray = Array.from(retryableErrorCodes);

const retryableStatusCodesArray = [
  408, 413, 429, 500, 502, 503, 504, 521, 522, 524
];

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
 * @param {Function} [options.parseJson] The function used to parse JSON
 * @param {Function} [options.stringifyJson] The function used to serialize to
 *     JSON
 * @param {Number} [options.maxRetries] Maximum number of automatic request
 *     retries
 * @constructor
 * @public
 */
function Shopify(options) {
  if (!(this instanceof Shopify)) return new Shopify(options);
  if (
    !options ||
    !options.shopName ||
    (!options.accessToken && (!options.apiKey || !options.password)) ||
    (options.accessToken && (options.apiKey || options.password)) ||
    (options.autoLimit && options.maxRetries)
  ) {
    throw new Error('Missing or invalid options');
  }

  EventEmitter.call(this);
  this.options = {
    parseJson: JSON.parse,
    stringifyJson: JSON.stringify,
    timeout: 60000,
    maxRetries: 0,
    ...options
  };

  //
  // API call limits, updated with each request.
  //
  this.callLimits = {
    remaining: undefined,
    current: undefined,
    max: undefined
  };
  this.callGraphqlLimits = {
    restoreRate: undefined,
    remaining: undefined,
    current: undefined,
    max: undefined,
    actualQueryCost: undefined,
    requestedQueryCost: undefined
  };

  this.baseUrl = {
    hostname: !options.shopName.endsWith('.myshopify.com')
      ? `${options.shopName}.myshopify.com`
      : options.shopName,
    protocol: 'https:'
  };

  this.baseHeaders = { 'User-Agent': `${pkg.name}/${pkg.version}` };

  if (options.accessToken) {
    this.baseHeaders['X-Shopify-Access-Token'] = options.accessToken;
  } else {
    this.baseHeaders.Authorization =
      'Basic ' +
      Buffer.from(`${options.apiKey}:${options.password}`).toString('base64');
  }

  if (options.autoLimit) {
    const conf = transform(
      options.autoLimit,
      (result, value, key) => {
        if (key === 'calls') key = 'limit';
        result[key] = value;
      },
      { bucketSize: 35 }
    );

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
 * @param {(String|undefined)} key Key name to use for req/res body
 * @param {(Object|undefined)} data Request body
 * @param {(Object|undefined)} headers Extra headers
 * @return {Promise}
 * @private
 */
Shopify.prototype.request = function request(uri, method, key, data, headers) {
  const options = {
    agent: this.options.agent,
    headers: { ...headers, ...this.baseHeaders },
    method,
    parseJson: this.options.parseJson,
    responseType: 'json',
    stringifyJson: this.options.stringifyJson,
    timeout: this.options.timeout
  };

  const afterResponse = (res) => {
    this.updateLimits(res.headers['x-shopify-shop-api-call-limit']);
    return res;
  };

  if (this.options.hooks) {
    options.hooks = { ...this.options.hooks };
    options.hooks.afterResponse = [afterResponse];

    if (this.options.hooks.afterResponse) {
      options.hooks.afterResponse.push(...this.options.hooks.afterResponse);
    }
  } else {
    options.hooks = { afterResponse: [afterResponse] };
  }

  if (data) {
    options.json = key ? { [key]: data } : data;
  }

  if (this.options.maxRetries > 0) {
    options.retry = {
      calculateDelay,
      errorCodes: retryableErrorCodesArray,
      limit: this.options.maxRetries,
      // Don't clamp Shopify `Retry-After` header values too low.
      maxRetryAfter: Infinity,
      methods: [method],
      statusCodes: retryableStatusCodesArray
    };
  } else {
    options.retry = 0;
  }

  return got(uri, options).then((res) => {
    const body = res.body;

    if (res.statusCode === 202 && res.headers['location']) {
      const retryAfter = res.headers['retry-after'] * 1000 || 0;
      const { pathname, search } = url.parse(res.headers['location']);

      return delay(retryAfter).then(() => {
        const uri = { pathname, ...this.baseUrl };

        if (search) uri.search = search;

        return this.request(uri, 'GET', key);
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
  });
};

/**
 * Updates GraphQL API call limits.
 *
 * @param {Object} cost The `extensions.cost` object returned in the GraphQL
 *     response
 * @private
 */
Shopify.prototype.updateGraphqlLimits = function updateGraphqlLimits({
  throttleStatus,
  actualQueryCost,
  requestedQueryCost
}) {
  if (!throttleStatus) return;

  const limits = this.callGraphqlLimits;
  limits.current =
    throttleStatus.maximumAvailable - throttleStatus.currentlyAvailable;
  limits.remaining = throttleStatus.currentlyAvailable;
  limits.restoreRate = throttleStatus.restoreRate;
  limits.max = throttleStatus.maximumAvailable;
  limits.requestedQueryCost = requestedQueryCost;
  limits.actualQueryCost = actualQueryCost;

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
  let pathname = '/admin/api';

  if (this.options.apiVersion) {
    pathname += `/${this.options.apiVersion}`;
  }

  pathname += '/graphql.json';

  const uri = { pathname, ...this.baseUrl };
  const json = variables !== undefined && variables !== null;
  const options = {
    agent: this.options.agent,
    body: json ? this.options.stringifyJson({ query: data, variables }) : data,
    headers: {
      ...this.baseHeaders,
      'Content-Type': json ? 'application/json' : 'application/graphql'
    },
    method: 'POST',
    parseJson: this.options.parseJson,
    responseType: 'json',
    timeout: this.options.timeout
  };

  const afterResponse = (res) => {
    if (res.body) {
      if (res.body.extensions && res.body.extensions.cost) {
        this.updateGraphqlLimits(res.body.extensions.cost);
      }

      if (Array.isArray(res.body.errors)) {
        // Make Got consider this response errored and retry if needed.
        throw new Error(res.body.errors[0].message);
      }
    }

    return res;
  };

  if (this.options.hooks) {
    options.hooks = { ...this.options.hooks };
    options.hooks.afterResponse = [afterResponse];
    options.hooks.beforeError = [decorateError];

    if (this.options.hooks.afterResponse) {
      options.hooks.afterResponse.push(...this.options.hooks.afterResponse);
    }

    if (this.options.hooks.beforeError) {
      options.hooks.beforeError.push(...this.options.hooks.beforeError);
    }
  } else {
    options.hooks = {
      afterResponse: [afterResponse],
      beforeError: [decorateError]
    };
  }

  if (this.options.maxRetries > 0) {
    options.retry = {
      calculateDelay,
      errorCodes: retryableErrorCodesArray,
      limit: this.options.maxRetries,
      // Don't clamp Shopify `Retry-After` header values too low.
      maxRetryAfter: Infinity,
      methods: ['POST'],
      statusCodes: retryableStatusCodesArray
    };
  } else {
    options.retry = 0;
  }

  return got(uri, options).then(responseData);
};

resources.registerAll(Shopify);

/**
 * Decorates an `Error` object with details from GraphQL errors in the response
 * body.
 *
 * @param {Error} error The error to decorate
 * @return {Error} The decorated error
 * @private
 */
function decorateError(error) {
  if (
    error.response &&
    error.response.body &&
    Array.isArray(error.response.body.errors)
  ) {
    const first = error.response.body.errors[0];

    error.locations = first.locations;
    error.path = first.path;
    error.extensions = first.extensions;
  }

  return error;
}

/**
 * Returns a promise that resolves after a given amount of time.
 *
 * @param {Number} ms Amount of milliseconds to wait
 * @return {Promise} Promise that resolves after `ms` milliseconds
 * @private
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Given an error from Got, see if Shopify told us how long to wait before
 * retrying.
 *
 * @param {Object} retryObject Got's input for the retry logic
 * @return {Number} The duration in ms
 * @private
 **/
function calculateDelay(retryObject) {
  const { error, computedValue } = retryObject;
  const response = error.response;

  // Detect GraphQL request throttling.
  if (
    response &&
    response.statusCode === 200 &&
    response.body &&
    typeof response.body === 'object' &&
    Array.isArray(response.body.errors) &&
    response.body.errors[0].extensions &&
    response.body.errors[0].extensions.code == 'THROTTLED'
  ) {
    const costData = response.body.extensions.cost;

    return (
      ((costData.requestedQueryCost -
        costData.throttleStatus.currentlyAvailable) /
        costData.throttleStatus.restoreRate) *
      1000
    );
  }

  // Stop retrying if the attempt limit has been reached or the request is not
  // retryable.
  if (computedValue === 0) {
    return 0;
  }

  // For simplicity, retry network connectivity issues after a hardcoded 1s.
  if (retryableErrorCodes.has(error.code)) {
    return 1000;
  }

  if (response.headers && response.headers['retry-after']) {
    return response.headers['retry-after'] * 1000 || computedValue;
  }

  // Arbitrary 2 seconds, in case we get a 429 without a `Retry-After`
  // response header, or 4xx/5xx series error that matches the Got retry
  // defaults.
  return 2 * 1000;
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

/**
 * Returns the data of a GraphQL response object.
 *
 * @param {Response} res Got response object
 * @return {Object} The data
 * @private
 */
function responseData(res) {
  return res.body.data;
}

module.exports = Shopify;

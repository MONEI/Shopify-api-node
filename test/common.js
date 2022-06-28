'use strict';

const nock = require('nock');

const pkg = require('../package');
const Shopify = require('..');

const accessToken = 'f85632530bf277ec9ac6f649fc327f17';
const password = '72297d971271bc62ca899bba7432acb1';
const apiKey = 'bc731e500840231da5b43bb3f388d2f0';
const apiVersion = '2019-04';
const shopName = 'johns-apparel';

const shopify = new Shopify({ shopName, accessToken });
const shopifyWithPresentmentOption = new Shopify({
  accessToken,
  presentmentPrices: true,
  shopName
});
const shopifyWithRetries = new Shopify({
  accessToken,
  shopName,
  maxRetries: 3
});

const scope = nock(`https://${shopName}.myshopify.com`, {
  reqheaders: {
    'User-Agent': `${pkg.name}/${pkg.version}`,
    'X-Shopify-Access-Token': accessToken,
    Accept: 'application/json'
  },
  badheaders: ['Authorization', 'X-Shopify-Api-Features']
});

const presentmentApiScope = nock(`https://${shopName}.myshopify.com`, {
  reqheaders: {
    'User-Agent': `${pkg.name}/${pkg.version}`,
    'X-Shopify-Access-Token': accessToken,
    'X-Shopify-Api-Features': 'include-presentment-prices',
    Accept: 'application/json'
  },
  badheaders: ['Authorization']
});

/**
 * Add a working (200 status code) mock for the REST Admin API.
 *
 * @param {Scope} scope An instance of the `Scope` class of the nock module.
 * @public
 */
function addWorkingRESTRequestMock(scope) {
  scope.get('/admin/shop.json').reply(200, {
    shop: {
      id: 1,
      name: 'My Cool Test Shop'
    }
  });
}

/**
 * Add a working (200 status code) mock for the GraphQL Admin API.
 *
 * @param {Scope} scope An instance of the `Scope` class of the nock module.
 * @public
 */
function addWorkingGraphQLRequestMock(scope) {
  scope.post('/admin/api/graphql.json').reply(200, {
    data: {
      shop: {
        id: 1,
        name: 'My Cool Test Shop'
      }
    }
  });
}

module.exports = {
  accessToken,
  addWorkingGraphQLRequestMock,
  addWorkingRESTRequestMock,
  apiKey,
  apiVersion,
  password,
  presentmentApiScope,
  scope,
  shopify,
  shopifyWithPresentmentOption,
  shopifyWithRetries,
  shopName
};

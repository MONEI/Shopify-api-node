'use strict';

const nock = require('nock');

const accessToken = 'f85632530bf277ec9ac6f649fc327f17';
const password = '72297d971271bc62ca899bba7432acb1';
const apiKey = 'bc731e500840231da5b43bb3f388d2f0';
const shopName ='johns-apparel';

const scope = nock(`https://${shopName}.myshopify.com`, {
  reqheaders: {
    'User-Agent': `Node.js/${process.version.replace('v', '')}`,
    'X-Shopify-Access-Token': accessToken,
    'Accept': 'application/json'
  }
});

module.exports = {
  accessToken,
  password,
  shopName,
  apiKey,
  scope
};

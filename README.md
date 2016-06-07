# shopify-api-node

[![Version npm](https://img.shields.io/npm/v/shopify-api-node.svg)](https://www.npmjs.com/package/shopify-api-node)
[![Build Status](https://img.shields.io/travis/microapps/Shopify-api-node/master.svg)](https://travis-ci.org/microapps/Shopify-api-node)
[![Dependencies](https://img.shields.io/david/microapps/Shopify-api-node.svg)](https://david-dm.org/microapps/Shopify-api-node)
[![Coverage Status](https://img.shields.io/coveralls/microapps/Shopify-api-node/master.svg)](https://coveralls.io/github/microapps/Shopify-api-node)

Shopify API bindings for Node.js.

## Installation:

```shell
$ npm install --save shopify-api-node
```

## Usage:

This module exports a constructor function which takes three or two arguments
depending if you want to use it for private or public apps.

### Private apps

For [private](https://docs.shopify.com/api/guides/introduction/creating-a-private-app)
apps use three arguments:

```js
const Shopify = require('shopify-api-node');

const shopify = new Shopify(shopName, apiKey, password);
```

### Public apps

For public apps use two arguments:

```js
const Shopify = require('shopify-api-node');

const shopify = new Shopify(shopName, token);
```

where `token` is a persistent [OAuth 2.0](https://docs.shopify.com/api/guides/authentication/oauth)
token.

### Resources

Every resource is accessed via your `shopify` instance:

```js
const shopify = new Shopify(shopName, token);

// shopify.<resouce_name>.<method_name>
```

Each method returns a `Promise` that resolves with the result:

```js
shopify.order.list({ limit: 5 })
  .then(orders => console.log(orders))
  .catch(err => console.error(err));
```

You can access your current call limits with `shopify.callLimits`.
This is updated with each request to Shopify's API. Values start at undefined.

```js
console.log(shopify.callLimits)
/*
{
  max: 40,
  current: 10,
  remaining: 30
}
*/
```

### Available resources and methods

- applicationCharge
  - `activate(id, params)`
  - `create(params)`
  - `get(id[, params])`
  - `list([params])`
- article
  - `authors()`
  - `count(blogId[, params])`
  - `create(blogId, params)`
  - `delete(blogId, id)`
  - `get(blogId, id[, params])`
  - `list(blogId[, params])`
  - `tags([blogId][, params])`
  - `update(blogId, id, params)`
- asset
  - `create(themeId, params)`
  - `delete(themeId, params)`
  - `get(themeId, params)`
  - `list(themeId[, params])`
  - `update(themeId, params)`
- blog
  - `count()`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- carrierService
  - `create(params)`
  - `delete(id)`
  - `get(id)`
  - `list()`
  - `update(id, params)`
- checkout
  - `count([params])`
  - `list([params])`
- collect
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
- comment
  - `approve(id)`
  - `count([params])`
  - `create(params)`
  - `get(id[, params])`
  - `list([params])`
  - `notSpam(id)`
  - `remove(id)`
  - `restore(id)`
  - `spam(id)`
  - `update(id, params)`
- country
  - `count()`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- customCollection
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- customer
  - `accountActivationUrl(id)`
  - `count()`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `search(params)`
  - `update(id, params)`
- customerAddress
  - `create(customerId, params)`
  - `default(customerId, id)`
  - `delete(customerId, id)`
  - `get(customerId, id)`
  - `list(customerId[, params])`
  - `set(customerId, params)`
  - `update(customerId, id, params)`
- customerSavedSearch
  - `count([params])`
  - `create(params)`
  - `customers(id[, params])`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- discount
  - `create(params)`
  - `delete(id)`
  - `disable(id)`
  - `enable(id)`
  - `get(id)`
  - `list([params])`
- event
  - `count([params])`
  - `get(id[, params])`
  - `list([params])`
- fulfillment
  - `cancel(orderId, id)`
  - `complete(orderId, id)`
  - `count(orderId[, params)`
  - `create(orderId, params)`
  - `get(orderId, id[, params])`
  - `list(orderId[, params])`
  - `update(orderId, id, params)`
- fulfillmentEvent
  - `create(orderId, fulfillmentId, params)`
  - `delete(orderId, fulfillmentId, id)`
  - `get(orderId, fulfillmentId, id)`
  - `list(orderId, fulfillmentId[, params])`
  - `update(orderId, fulfillmentId, id, params)`
- fulfillmentService
  - `create(params)`
  - `delete(id)`
  - `get(id)`
  - `list([params])`
  - `update(id, params)`
- giftCard
  - `count([params])`
  - `create(params)`
  - `disable(id)`
  - `get(id)`
  - `list([params])`
  - `search(params)`
  - `update(id, params)`
- location
  - `get(id)`
  - `list()`
- metafield
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- order
  - `cancel(id[, params])`
  - `close(id)`
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `open(id)`
  - `update(id, params)`
- orderRisk
  - `create(orderId, params)`
  - `delete(orderId, id)`
  - `get(orderId, id)`
  - `list(orderId)`
  - `update(orderId, id, params)`
- page
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- policy
  - `list([params])`
- product
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- productImage
  - `count(productId[, params])`
  - `create(productId, params)`
  - `delete(productId, id)`
  - `get(productId, id[, params])`
  - `list(productId[, params])`
  - `update(productId, id, params)`
- productVariant
  - `count(productId)`
  - `create(productId, params)`
  - `delete(productId, id)`
  - `get(id[, params])`
  - `list(productId[, params])`
  - `update(id, params)`
- province
  - `count(countryId[, params])`
  - `get(countryId, id[, params])`
  - `list(countryId[, params])`
  - `update(countryId, id, params)`
- recurringApplicationCharge
  - `activate(id, params)`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
- redirect
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- refund
  - `get(orderId, id[, params])`
- scriptTag
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- shippingZone
  - `list([params])`
- shop
  - `get([params])`
- smartCollection
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `order(id, params)`
  - `update(id, params)`
- theme
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- transaction
  - `count(orderId)`
  - `create(orderId, params)`
  - `get(orderId, id[, params])`
  - `list(orderId[, params])`
- usageCharge
  - `create(recurringApplicationChargeId, params)`
  - `get(recurringApplicationChargeId, id[, params])`
  - `list(recurringApplicationChargeId[, params])`
- user
  - `get(id)`
  - `list()`
- webhook
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`

where `params` is a plain JavaScript object. See https://docs.shopify.com/api/reference
for parameters details.

## Become a master of the Shopify ecosystem by:

* [Becoming a Shopify App Developer](https://app.shopify.com/services/partners/signup?ref=microapps)
* [Checking out the roots](https://docs.shopify.com/api/guides/introduction/getting-started?ref=microapps)
* [Talking To Other Masters](https://ecommerce.shopify.com/c/shopify-apps?ref=microapps)
* [Reading API Docs](https://docs.shopify.com/api?ref=microapps)
* [Learning from others](http://stackoverflow.com/questions/tagged/shopify)

## Use a frontend framework which mimics the Shopify merchant admin:

[Shopify Embedded App Frontend Framework](http://seaff.microapps.com?utm_source=shopify-api-node-module-repo-readme&utm_medium=click&utm_campaign=github)

## Supported by:

[microapps](http://www.microapps.com/?utm_source=shopify-api-node-module-repo-readme&utm_medium=click&utm_campaign=github)

## License

[MIT](LICENSE)

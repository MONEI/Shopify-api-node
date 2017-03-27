# shopify-api-node

[![Version npm][npm-shopify-api-node-badge]][npm-shopify-api-node]
[![Build Status][travis-shopify-api-node-badge]][travis-shopify-api-node]
[![Dependencies][david-shopify-api-node-badge]][david-shopify-api-node]
[![Coverage Status][coverage-shopify-api-node-badge]][coverage-shopify-api-node]

Shopify API bindings for Node.js.

## Installation:

```shell
$ npm install --save shopify-api-node
```

## API

This module exports a constructor function which takes an options object.

### `Shopify(options)`

Creates a new `Shopify` instance.

#### Arguments

- `options` - Required - A plain JavaScript object that contains the
configuration options.

#### Options

- `shopName` - Required - A string that specifies the shop name.
- `apiKey` - Required for [private][generate-private-app-credentials] apps - A
  string that specifies the API key of the app. This option must be used in
  conjunction with the `password` option and is mutually exclusive with the
  `accessToken` option.
- `password` - Required for [private][generate-private-app-credentials] apps -
  A string that specifies the private app password. This option must be used in
  conjunction with the `apiKey` option and is mutually exclusive with the
  `accessToken` option.
- `accessToken` - Required for public apps - A string representing the
  permanent [OAuth 2.0][oauth] access token. This option is mutually exclusive
  with the `apiKey` and `password` options. If you are looking for a premade
  solution to obtain an access token, take a look at the [shopify-token][]
  module.
- `apiCallLimit` - Optional - Default: 38, 2 less than Shopify Max. to account for some timing irregularites
- `apiRefresh` - Optional - Defaut: 2
- `apiRefreshTime` - Optional - Default: 1000
- `timeout` - Optional - A number that specifies the milliseconds to wait for
  the server to send response headers before aborting the request. Defaults to
  `60000`, or 1 minute.

#### Return value

A `Shopify` instance.

#### Exceptions

Throws an `Error` exception if the required options are missing.

#### Example

```js
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: 'your-shop-name',
  apiKey: 'your-api-key',
  password: 'your-app-password'
});
```

#### Shopify API Limits

Shopify employs a Leaky Bucket alogrithm to [rate limit][api-call-limit] it's API. This stands at a Max call limit of 40 API requests, replenishing at two API requests a second. This means you can peak load at 40 API requests and then back off running two API requests a second thereafter as rate limit becomes available.

The three values (which are passed to [tokenbucket][tokenbucket]) that control this can be indepedantly set in the options as needed. In testing, setting the call limit to 40 would occasionally trip the rate limiter, so 38 is set as the default to give a little head room.

### `shopify.callLimits`

The `callLimits` property allows you to monitor the API call limit. The value
is an object like this:

```js
{
  remaining: 30,
  current: 10,
  max: 40,
  remainingTokens: 38
}
```

Values start at `undefined` and are updated every time a request is made.

### Resources

Every resource is accessed via your `shopify` instance:

```js
const shopify = new Shopify({
  shopName: 'your-shop-name',
  accessToken: 'your-oauth-token'
});

// shopify.<resouce_name>.<method_name>
```

Each method returns a `Promise` that resolves with the result:

```js
shopify.order.list({ limit: 5 })
  .then(orders => console.log(orders))
  .catch(err => console.error(err));
```

### Available resources and methods

- apiPermission
  - `delete()`
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
- draftOrder
  - `complete(id[, params])`
  - `count()`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `sendInvoice(id[, params])`
  - `update(id, params)`
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
  - `open(orderId, id)`
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
  - `current()`
  - `get(id)`
  - `list()`
- webhook
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`

where `params` is a plain JavaScript object. See https://help.shopify.com/api/reference?ref=microapps
for parameters details.

## Become a master of the Shopify ecosystem by:

* [Becoming a Shopify App Developer][becoming-a-shopify-app-developer]
* [Checking out the roots][checking-out-the-roots]
* [Talking To Other Masters][talking-to-other-masters]
* [Reading API Docs][reading-api-docs]
* [Learning from others][learning-from-others]

## Use a frontend framework which mimics the Shopify merchant admin:

[Shopify Embedded App Frontend Framework][shopify-embedded-app-frontend-framework]

## Supported by:

[microapps][microapps]

Used in our live products: [MoonMail][moonmail] & [MONEI][monei]

## License

[MIT](LICENSE)

[npm-shopify-api-node-badge]: https://img.shields.io/npm/v/shopify-api-node.svg
[npm-shopify-api-node]: https://www.npmjs.com/package/shopify-api-node
[travis-shopify-api-node-badge]: https://img.shields.io/travis/MONEI/Shopify-api-node/master.svg
[travis-shopify-api-node]: https://travis-ci.org/MONEI/Shopify-api-node
[david-shopify-api-node-badge]: https://img.shields.io/david/MONEI/Shopify-api-node.svg
[david-shopify-api-node]: https://david-dm.org/MONEI/Shopify-api-node
[coverage-shopify-api-node-badge]: https://img.shields.io/coveralls/MONEI/Shopify-api-node/master.svg
[coverage-shopify-api-node]: https://coveralls.io/github/MONEI/Shopify-api-node
[generate-private-app-credentials]: https://help.shopify.com/api/guides/api-credentials#generate-private-app-credentials?ref=microapps
[oauth]: https://help.shopify.com/api/guides/authentication/oauth?ref=microapps
[shopify-token]: https://github.com/lpinca/shopify-token
[api-call-limit]: https://help.shopify.com/api/guides/api-call-limit
[becoming-a-shopify-app-developer]: https://app.shopify.com/services/partners/signup?ref=microapps
[checking-out-the-roots]: https://help.shopify.com/api/guides?ref=microapps
[talking-to-other-masters]: https://ecommerce.shopify.com/c/shopify-apps?ref=microapps
[reading-api-docs]: https://help.shopify.com/api/reference?ref=microapps
[learning-from-others]: https://stackoverflow.com/questions/tagged/shopify
[shopify-embedded-app-frontend-framework]: http://seaff.microapps.com?utm_source=shopify-api-node-module-repo-readme&utm_medium=click&utm_campaign=github
[microapps]: http://microapps.com/?utm_source=shopify-api-node-module-repo-readme&utm_medium=click&utm_campaign=github
[moonmail]: https://moonmail.io/?utm_source=shopify-api-node-module-repo-readme&utm_medium=click&utm_campaign=github
[monei]: https://monei.net/?utm_source=shopify-api-node-module-repo-readme&utm_medium=click&utm_campaign=github
[tokenbucket]: https://github.com/jesucarr/tokenbucket

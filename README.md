# Shopify API Node.js (Official module)

[![Version npm][npm-shopify-api-node-badge]][npm-shopify-api-node]
[![Build Status][travis-shopify-api-node-badge]][travis-shopify-api-node]
[![Dependencies][david-shopify-api-node-badge]][david-shopify-api-node]
[![Coverage Status][coverage-shopify-api-node-badge]][coverage-shopify-api-node]

Official Shopify API bindings for Node.js.

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

- `shopName` - Required - A string that specifies the shop name. The shop's
  "myshopify.com" domain is also accepted.
- `apiKey` - Required for [private][generate-private-app-credentials] apps - A
  string that specifies the API key of the app. This option must be used in
  conjunction with the `password` option and is mutually exclusive with the
  `accessToken` option.
- `password` - Required for [private][generate-private-app-credentials] apps - A
  string that specifies the private app password. This option must be used in
  conjunction with the `apiKey` option and is mutually exclusive with the
  `accessToken` option.
- `accessToken` - Required for public apps - A string representing the permanent
  [OAuth 2.0][oauth] access token. This option is mutually exclusive with the
  `apiKey` and `password` options. If you are looking for a premade solution to
  obtain an access token, take a look at the [shopify-token][] module.
- `apiVersion` - Optional - A string to specify the [Shopify API
  version][api-versioning] to use for requests. Defaults to the oldest supported
  stable version.
- `autoLimit` - Optional - This option allows you to regulate the request rate
  in order to avoid hitting the [rate limit][api-call-limit]. Requests are
  limited using the token bucket algorithm. Accepted values are a boolean or a
  plain JavaScript object. When using an object, the `calls` property and the
  `interval` property specify the refill rate and the `bucketSize` property the
  bucket size. For example `{ calls: 2, interval: 1000, bucketSize: 35 }`
  specifies a limit of 2 requests per second with a burst of 35 requests. When
  set to `true` requests are limited as specified in the above example. Defaults
  to `false`.
- `presentmentPrices` - Optional - Whether to include the header to pull
  presentment prices for products. Defaults to `false`.
- `timeout` - Optional - The number of milliseconds before the request times
  out. If the request takes longer than `timeout`, it will be aborted. Defaults
  to `60000`, or 1 minute.

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

### `shopify.callLimits`

The `callLimits` property allows you to monitor the API call limit. The value is
an object like this:

```js
{
  remaining: 30,
  current: 10,
  max: 40
}
```

Values start at `undefined` and are updated every time a request is made. After
every update the `callLimits` event is emitted with the updated limits as
argument.

```js
shopify.on('callLimits', (limits) => console.log(limits));
```

When using the GraphQL API, a different property is used to track the API call
limit: `callGraphqlLimits`.

Keep in mind that the `autoLimit` option is ignored while using GraphQL API.

```js
shopify.on('callGraphqlLimits', (limits) => console.log(limits));
```

## Resources

Every resource is accessed via your `shopify` instance:

```js
const shopify = new Shopify({
  shopName: 'your-shop-name',
  accessToken: 'your-oauth-token'
});

// shopify.<resource_name>.<method_name>
```

Each method returns a `Promise` that resolves with the result:

```js
shopify.order
  .list({ limit: 5 })
  .then((orders) => console.log(orders))
  .catch((err) => console.error(err));
```

The Shopify API requires that you send a valid JSON string in the request body
including the name of the resource. For example, the request body to create a
country should be:

```json
{
  "country": {
    "code": "FR",
    "tax": 0.25
  }
}
```

When using `shopify-api-node` you don't have to specify the full object but only
the nested one as the module automatically wraps the provided data. Using the
above example this translates to:

```js
shopify.country
  .create({ code: 'FR', tax: 0.25 })
  .then((country) => console.log(country))
  .catch((err) => console.error(err));
```

Similarly, the Shopify API includes the resource name in the JSON string that is
returned in the response body:

```json
{
  "country": {
    "id": 1070231510,
    "name": "France",
    "tax": 0.2,
    "code": "FR",
    "tax_name": "TVA",
    "provinces": []
  }
}
```

`shopify-api-node` automatically unwraps the parsed object and returns:

```js
{
  id: 1070231510,
  name: 'France',
  tax: 0.2,
  code: 'FR',
  tax_name: 'TVA',
  provinces: []
}
```

This behavior is valid for all resources.

## Metafields

Shopify allows for adding metafields to various resources. You can use the
`owner_resource` and `owner_id` properties to work with metafields that belong
to a particular resource as shown in the examples below.

Get metafields that belong to a product:

```js
shopify.metafield
  .list({
    metafield: { owner_resource: 'product', owner_id: 632910392 }
  })
  .then(
    (metafields) => console.log(metafields),
    (err) => console.error(err)
  );
```

Create a new metafield for a product:

```js
shopify.metafield
  .create({
    key: 'warehouse',
    value: 25,
    value_type: 'integer',
    namespace: 'inventory',
    owner_resource: 'product',
    owner_id: 632910392
  })
  .then(
    (metafield) => console.log(metafield),
    (err) => console.error(err)
  );
```

## Pagination

[Pagination][paginated-rest-results] in API version 2019-07 and above can be
done as shown in the following example:

```js
(async () => {
  let params = { limit: 10 };

  do {
    const products = await shopify.product.list(params);

    console.log(products);

    params = products.nextPageParameters;
  } while (params !== undefined);
})().catch(console.error);
```

Each set of results may have the `nextPageParameters` and
`previousPageParameters` properties. These properties specify respectively the
parameters needed to fetch the next and previous page of results.

This feature is only available on version 2.24.0 and above.

## Available resources and methods

- accessScope
  - `list()`
- apiPermission
  - `delete()`
- applicationCharge
  - `activate(id[, params])`
  - `create(params)`
  - `get(id[, params])`
  - `list([params])`
- applicationCredit
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
- balance
  - `list()`
  - `transactions([params])`
- blog
  - `count()`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- cancellationRequest
  - `accept(fulfillmentOrderId[, message])`
  - `create(fulfillmentOrderId[, message])`
  - `reject(fulfillmentOrderId[, message])`
- carrierService
  - `create(params)`
  - `delete(id)`
  - `get(id)`
  - `list()`
  - `update(id, params)`
- checkout
  - `complete(token)`
  - `count([params])`
  - `create(params)`
  - `get(token)`
  - `list([params])`
  - `shippingRates(token)`
  - `update(token, params)`
- collect
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
- collection
  - `get(id[, params])`
  - `products(id[, params])`
- collectionListing
  - `get(id)`
  - `list([params])`
  - `productIds(id[, params])`
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
- currency
  - `list()`
- customCollection
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- customer
  - `accountActivationUrl(id)`
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `orders(id[, params])`
  - `search(params)`
  - `sendInvite(id[, params])`
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
- discountCode
  - `create(priceRuleId, params)`
  - `delete(priceRuleId, id)`
  - `get(priceRuleId, id)`
  - `list(priceRuleId)`
  - `lookup(params)`
  - `update(priceRuleId, id, params)`
- discountCodeCreationJob
  - `create(priceRuleId, params)`
  - `discountCodes(priceRuleId, id)`
  - `get(priceRuleId, id)`
- dispute
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
- fulfillmentOrder
  - `cancel(id, params)`
  - `close(id[, message])`
  - `get(id)`
  - `list([params])`
  - `locationsForMove(id)`
  - `move(id, locationId)`
- fulfillmentRequest
  - `accept(fulfillmentOrderId[, message])`
  - `create(fulfillmentOrderId, params)`
  - `reject(fulfillmentOrderId[, message])`
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
- [giftCardAdjustment](https://help.shopify.com/en/api/reference/plus/gift_card_adjustment)
  - `create(giftCardId, params)`
  - `get(giftCardId, id)`
  - `list(giftCardId)`
- inventoryItem
  - `get(id)`
  - `list(params)`
  - `update(id, params)`
- inventoryLevel
  - `adjust(params)`
  - `connect(params)`
  - `delete(params)`
  - `list(params)`
  - `set(params)`
- location
  - `count`
  - `get(id)`
  - `inventoryLevels(id[, params])`
  - `list()`
- marketingEvent
  - `count()`
  - `create(params)`
  - `delete(id)`
  - `get(id)`
  - `list([params])`
  - `update(id, params)`
  - `engagements(id, params)`
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
  - `fulfillmentOrders(id)`
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
- payment
  - `count(checkoutToken)`
  - `create(checkoutToken, params)`
  - `get(checkoutToken, id)`
  - `list(checkoutToken)`
- payout
  - `get(id)`
  - `list([params])`
- policy
  - `list([params])`
- priceRule
  - `create(params)`
  - `delete(id)`
  - `get(id)`
  - `list([params])`
  - `update(id, params)`
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
- productListing
  - `count()`
  - `create(productId[, params])`
  - `delete(productId)`
  - `get(productId)`
  - `list([params])`
  - `productIds([params])`
- [productResourceFeedback](https://help.shopify.com/en/api/reference/sales-channels/productresourcefeedback)
  - `create(productId[, params])`
  - `list(productId)`
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
  - `customize(id, params)`
- redirect
  - `count([params])`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- refund
  - `calculate(orderId, params)`
  - `create(orderId, params)`
  - `get(orderId, id[, params])`
  - `list(orderId[, params])`
- report
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `list([params])`
  - `update(id, params)`
- resourceFeedback
  - `create(params)`
  - `list()`
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
  - `products(id[, params])`
  - `update(id, params)`
- storefrontAccessToken
  - `create(params)`
  - `delete(id)`
  - `list()`
- tenderTransaction
  - `list([params])`
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

where `params` is a plain JavaScript object. See
https://help.shopify.com/api/reference?ref=microapps for parameters details.

## GraphQL

The `shopify` instance also allows to use the GraphQL API through the `graphql`
method, which returns a promise that resolves with the result data:

```js
const shopify = new Shopify({
  shopName: 'your-shop-name',
  accessToken: 'your-oauth-token'
});

const query = `{
  customers(first: 5) {
    edges {
      node {
        displayName
        totalSpent
      }
    }
  }
}`;

shopify
  .graphql(query)
  .then((customers) => console.log(customers))
  .catch((err) => console.error(err));
```

## Become a master of the Shopify ecosystem by:

- [Becoming a Shopify App Developer][becoming-a-shopify-app-developer]
- [Checking out the roots][checking-out-the-roots]
- [Talking To Other Masters][talking-to-other-masters]
- [Reading API Docs][reading-api-docs]
- [Learning from others][learning-from-others]

## Use Polaris, a React powered Frontend Framework which mimics the Shopify merchant admin:

[Polaris][polaris]

## Shopify Apps already using Shopify API node:

(add yours!)

- [Sample Node Express app by Shopify][sample-node-express-app-by-shopify]
- [Wholesaler][wholesaler]
- [Wholesaler & Customer Pricing][wholesaler-customer-pricing]
- [Wholesaler PRO][wholesaler-pro]
- [Youtube Traffic][youtube-traffic]
- [Shipatron][shipatron]
- [UPC Code Manager][upc-code-manager]

## Supported by:

[microapps][microapps]

Used in our live products: [MoonMail][moonmail] & [MONEI][monei]

## License

[MIT](LICENSE)

[sample-node-express-app-by-shopify]:
  https://github.com/Shopify/shopify-node-app
[npm-shopify-api-node-badge]: https://img.shields.io/npm/v/shopify-api-node.svg
[npm-shopify-api-node]: https://www.npmjs.com/package/shopify-api-node
[travis-shopify-api-node-badge]:
  https://img.shields.io/travis/MONEI/Shopify-api-node/master.svg
[travis-shopify-api-node]: https://travis-ci.org/MONEI/Shopify-api-node
[david-shopify-api-node-badge]:
  https://img.shields.io/david/MONEI/Shopify-api-node.svg
[david-shopify-api-node]: https://david-dm.org/MONEI/Shopify-api-node
[coverage-shopify-api-node-badge]:
  https://img.shields.io/coveralls/MONEI/Shopify-api-node/master.svg
[coverage-shopify-api-node]: https://coveralls.io/github/MONEI/Shopify-api-node
[generate-private-app-credentials]:
  https://help.shopify.com/api/guides/api-credentials#generate-private-app-credentials?ref=microapps
[oauth]: https://help.shopify.com/api/guides/authentication/oauth?ref=microapps
[shopify-token]: https://github.com/lpinca/shopify-token
[api-call-limit]:
  https://help.shopify.com/api/guides/api-call-limit/?ref=microapps
[api-versioning]: https://help.shopify.com/en/api/versioning
[becoming-a-shopify-app-developer]:
  https://app.shopify.com/services/partners/signup?ref=microapps
[checking-out-the-roots]: https://help.shopify.com/api/guides?ref=microapps
[talking-to-other-masters]:
  https://ecommerce.shopify.com/c/shopify-apps?ref=microapps
[reading-api-docs]: https://help.shopify.com/api/reference/?ref=microapps
[learning-from-others]: https://stackoverflow.com/questions/tagged/shopify
[paginated-rest-results]:
  https://help.shopify.com/en/api/guides/paginated-rest-results
[polaris]: https://polaris.shopify.com/?ref=microapps
[microapps]:
  http://microapps.com/?utm_source=shopify-api-node-module-repo-readme&utm_medium=click&utm_campaign=github
[moonmail]:
  https://moonmail.io/?utm_source=shopify-api-node-module-repo-readme&utm_medium=click&utm_campaign=github
[monei]:
  https://monei.net/?utm_source=shopify-api-node-module-repo-readme&utm_medium=click&utm_campaign=github
[wholesaler]: https://apps.shopify.com/wholesaler?ref=microapps
[wholesaler-customer-pricing]:
  https://apps.shopify.com/wholesaler-pro-1?ref=microapps
[wholesaler-pro]: https://apps.shopify.com/wholesaler-pro-2?ref=microapps
[youtube-traffic]: https://apps.shopify.com/youtube-traffic?ref=microapps
[shipatron]: https://shipatron.io
[upc-code-manager]: https://apps.shopify.com/upc-code-manager-1

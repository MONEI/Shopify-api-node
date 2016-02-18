# Nodify-Shopify

[![Version npm](https://img.shields.io/npm/v/nodify-shopify.svg)](https://www.npmjs.com/package/nodify-shopify)
[![Build Status](https://img.shields.io/travis/microapps/Nodify-Shopify/master.svg)](https://travis-ci.org/microapps/Nodify-Shopify)
[![Coverage Status](https://img.shields.io/coveralls/microapps/Nodify-Shopify/master.svg)](https://coveralls.io/github/microapps/Nodify-Shopify)

Shopify API bindings for Node.js.

## Installation:

```shell
$ npm install nodify-shopify
```

## Usage:

This module exports a constructor function which takes three or two arguments
depending if you want to use it for private or public apps.

### Private apps

For [private](https://docs.shopify.com/api/guides/introduction/creating-a-private-app)
apps use three arguments:

```js
const Shopify = require('nodify-shopify');

const shopify = new Shopify(shopName, apiKey, password);
```

### Public apps

For public apps use two arguments:

```js
const Shopify = require('nodify-shopify');

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
shopify.order.all({ limit: 5 })
  .then(orders => console.log(orders))
  .catch(err => console.error(err));
```

### Available resources and methods

- applicationCharge
  - `activate(id, params)`
  - `all([params])`
  - `create(params)`
  - `get(id[, params])`
- article
  - `all(blogId[, params])`
  - `authors()`
  - `count(blogId[, params])`
  - `create(blogId, params)`
  - `get(blogId, id[, params])`
  - `tags([blogId][, params])`
  - `update(blogId, id, params)`
- asset
  - `all(themeId[, params])`
  - `create(themeId, params)`
  - `delete(themeId, params)`
  - `get(themeId, params)`
  - `update(themeId, params)`
- blog
  - `all([params])`
  - `count()`
  - `create(params)`
  - `delete(id)`
  - `get(id[, params])`
  - `update(id, params)`
- carrierService
  - `all()`
  - `create(params)`
  - `delete(id)`
  - `get(id)`
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

[Shopify Embedded App Frontend Framework](http://seaff.microapps.com?utm_source=nodify-module-repo-readme&utm_medium=click&utm_campaign=github)

## Contributors:

* [Aakash Goel](https://github.com/aakashlpin)
* [Alexandre Saiz Verdaguer](https://github.com/alexandresaiz/)
* [Alua Kinzhebayeva](https://github.com/Alua-Kinzhebayeva)
* [Carlos Villuendas Zambrana](https://github.com/carlosvillu/)
* [Florian Traverse](https://github.com/temsa/)
* [Ivaylo Ivanov](https://github.com/ivaylopivanov)
* [Kenrick Beckett](https://github.com/kenrick/)
* [Khang Hoang Trieu](https://github.com/khanghoang)
* [Luigi Pinca](https://github.com/lpinca)
* [Will Laurance](https://github.com/wlaurance)

Supported by [microapps](http://www.microapps.com/?utm_source=nodify-module-repo-readme&utm_medium=click&utm_campaign=github)

## License

[MIT](LICENSE)

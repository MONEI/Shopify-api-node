# Nodify-Shopify

[![Version npm](https://img.shields.io/npm/v/nodify-shopify.svg)](https://www.npmjs.com/package/nodify-shopify)
[![Build Status](https://img.shields.io/travis/microapps/Nodify-Shopify/master.svg)](https://travis-ci.org/microapps/Nodify-Shopify)

Node connector for the Shopify API. Talk to Shopify API speaking node!

Use Nodify-Shopify to grab all Shopify API resources.
It also handles authentication (using [the new OAuth2 API](http://www.shopify.com/technology/5922341-sound-the-trumpets-oauth2-has-arrived?ref=microapps)) and billing.

## Usage:

#### Private app

```js
var nodify = require('nodify-shopify');
var session = nodify.createPrivateAppSession('your-shop-name', 'your-api-key', 'your-password');

session.orders.all({ limit: 5 })
.then(res => {
  console.log(res.body);
});
```

#### Public app

```js
var nodify = require('nodify-shopify');
var session = nodify.createSession(shopName, apiKey, secret, persistentOauth2Token);

session.order.all({ limit: 5 })
.then(res => {
  console.log(res.body);
});
```

You also have a Demo app to get the ball rolling, called [Nodify-App](https://github.com/microapps/Nodify-App).
Check that out to get a better understanding of how this module works, notably in case you want to dynamically
retrieve the OAuth2 token, or check the tests.

## Installation:

```shell
$ npm install nodify-shopify
```

## Dependencies:

[request](https://www.npmjs.org/package/request)

Install dependencies:

```shell
$ npm install -d
```

## Become a master of the Shopify ecosystem by:

* [Becoming a Shopify App Developer](https://app.shopify.com/services/partners/signup?ref=microapps)
* [Checking out the roots](https://docs.shopify.com/api/introduction/getting-started?ref=microapps)
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
* [Kenrick Beckett](https://github.com/kenrick/)
* [Khang Hoang Trieu](https://github.com/khanghoang)
* [Luigi Pinca](https://github.com/lpinca)
* [Will Laurance](https://github.com/wlaurance)

Supported by [microapps](http://www.microapps.com/?utm_source=nodify-module-repo-readme&utm_medium=click&utm_campaign=github)

## License

[MIT](LICENSE)

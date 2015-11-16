# [Nodify-Shopify](https://www.npmjs.org/package/nodify-shopify)

Node connector for the Shopify API. Talk to Shopify API speaking node!

Use Nodify-Shopify to grab all Shopify API resources. 
It also handles authentication (using [the new OAuth2 API](http://www.shopify.com/technology/5922341-sound-the-trumpets-oauth2-has-arrived?ref=microapps)) and billing.	

## Usage:
#### Private app
	var nodify = require('nodify-shopify');
	session = nodify.createPrivateAppSession("your-shop-name", "your-api-key", "your-password");
	session.orders.all({limit: 5}, function(err, orders){
    		if(err) { console.log(orders); throw err;}
    		console.log(orders);
	}); 
#### Public app
	var nodify = require('nodify-shopify');
	session = nodify.createSession(shopName, apiKey, secret, persistentOauth2Token);
	session.order.all({limit: 5}, function(err, orders){
		if(err) { console.log(orders); throw err;}
		console.log(orders);
	});

You also have a Demo app to get the ball rolling, called [Nodify-App](https://github.com/microapps/Nodify-App).
Check that out to get a better understanding of how this module works, notably in case you want to dynamically
retrieve the OAuth2 token, or check the tests.

## Installation:

    $ npm install nodify-shopify

## Dependencies:

[request] (https://www.npmjs.org/package/request)

Install dependencies:

    $ npm install -d

## Become a master of the Shopify ecosystem by: 

* [Becoming a Shopify App Developer] (https://app.shopify.com/services/partners/signup?ref=microapps)
* [Checking out the roots] (https://docs.shopify.com/api/introduction/getting-started?ref=microapps) 
* [Talking To Other Masters] (https://ecommerce.shopify.com/c/shopify-apps?ref=microapps) 
* [Reading API Docs] (https://docs.shopify.com/api?ref=microapps) 
* [Learning from others] (http://stackoverflow.com/questions/tagged/shopify) 

## Use a frontend framework which mimics the Shopify merchant admin: 
[Shopify Embedded App Frontent Framework] (http://seaff.microapps.com?utm_source=nodify-module-repo-readme&utm_medium=click&utm_campaign=github)

## Contributors:
[Carlos Villuendas] (https://github.com/carlosvillu/)

[Kenrick Beckett] (https://github.com/kenrick/)

[Alexandre Saiz] (https://github.com/alexandresaiz/)

[Florian Traverse] (https://github.com/temsa/)

[Alua Kinzhebayeva] (https://github.com/Alua-Kinzhebayeva)

Supported by [microapps](http://www.microapps.com/?utm_source=nodify-module-repo-readme&utm_medium=click&utm_campaign=github)


## License 

(The MIT License)

Copyright (c) 2012-2016 [microapps](http://www.microapps.com/?utm_source=nodify-module-repo-readme&utm_medium=click&utm_campaign=github)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


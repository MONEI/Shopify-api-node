# [Nodify-Shopify] (http://search.npmjs.org/#/nodify-shopify)  [![Build Status](https://secure.travis-ci.org/Shopfrogs/Nodify.png?branch=master)](http://travis-ci.org/Shopfrogs/Nodify)

Node.js connector for the Shopify API. Talk to Shopify API speaking node!

Use Nodify-Shopify to grab all Shopify API resources. 
It also handles authentication* and billing.	

## Usage:

	var nodify = require('nodify-shopify');
	session = nodify.createSession(shop, token, apiKey, secret);
	session.order.all({limit: 5}, function(err, orders){
		if(err) { console.log(orders); throw err;}
		console.log(orders);
	});

You also have a Demo app to get the ball rolling, called [Nodify-App](https://github.com/Shopfrogs/Nodify-App). Check that out to get a better understanding of how this module works.

## Installation:

    $ npm install nodify-shopify

## Dependencies:

[request] (http://search.npmjs.org/#/request)

Install dependencies:

    $ npm install -d

## Become a master of the Shopify ecosystem by: 

* [Becoming a Shopify App Developer] (https://app.shopify.com/services/partners/signup)
* [Checking out the roots] (http://wiki.shopify.com/Shopify_App_Development) 
* [Talking To Other Masters] (http://forums.shopify.com/categories/9) 
* [Reading API Docs] (http://api.shopify.com) 
* [Looking up the Shopify API Group] (https://groups.google.com/forum/#!forum/shopify-api) 


## Contributors:
[Carlos Villuendas] (https://github.com/carlosvillu/)

[Kenrick Beckett] (https://github.com/kenrick/)

[Alexandre Saiz] (https://github.com/alexandresaiz/)

[Supported by Shopfrogs](http://www.shopfrogs.com/shopify/)


## License 

(The MIT License)

Copyright (c) 2012 Shopfrogs &lt;info@shopfrogs.com&gt;

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

## *Heads up! Oauth 2.0 

Shopify just got married with Oauth 2.0. They will eventually deprecate old authentication custom made method. 
If you're planning to start from scratch and code your first Shopify App, we highly encourage you to do all the Authentication with Oauth 2.0.
This connector was started some time ago when no Oauth hunch was around. Feel free to contribute and help us replace the old with new authentication method.

[Shopify announcement - Oauth 2.0] (http://www.shopify.com/technology/5922341-sound-the-trumpets-oauth2-has-arrived)

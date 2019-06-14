describe('Shopify', () => {
  'use strict';

  const expect = require('chai').expect;
  const assign = require('lodash/assign');
  const nock = require('nock');
  const got = require('got');

  const Blog = require('../resources/blog');
  const common = require('./common');
  const pkg = require('../package');
  const Shopify = require('..');

  const accessToken = common.accessToken;
  const shopName = common.shopName;
  const password = common.password;
  const shopify = common.shopify;
  const apiKey = common.apiKey;

  it('exports the constructor', () => {
    expect(Shopify).to.be.a('function');
  });

  it('throws an error when required options missing or invalid', () => {
    const msg = 'Missing or invalid options';

    expect(() => new Shopify()).to.throw(Error, msg);
    expect(() => new Shopify({})).to.throw(Error, msg);
    expect(() => new Shopify({ shopName })).to.throw(Error, msg);
    expect(() => new Shopify({ apiKey })).to.throw(Error, msg);
    expect(() => new Shopify({ password })).to.throw(Error, msg);
    expect(() => new Shopify({ accessToken, apiKey })).to.throw(Error, msg);
    expect(() => new Shopify({ accessToken, password })).to.throw(Error, msg);
  });

  it('makes the new operator optional', () => {
    const shopify = Shopify({ shopName, accessToken });

    expect(shopify).to.be.an.instanceof(Shopify);
  });

  it("allows the shop's 'myshopify.com' domain to be used as shopName", () => {
    const shopName = 'johns-apparel.myshopify.com';
    const shopify = new Shopify({ shopName, apiKey, password });

    expect(shopify.baseUrl).to.deep.equal({
      auth: `${apiKey}:${password}`,
      hostname: shopName,
      protocol: 'https:'
    });
  });

  it('adds basic auth to the URL when using apiKey and password', () => {
    const shopify = new Shopify({ shopName, apiKey, password });

    expect(shopify.baseUrl).to.deep.equal({
      hostname: `${shopName}.myshopify.com`,
      auth: `${apiKey}:${password}`,
      protocol: 'https:'
    });
  });

  it('does not add basic auth to the URL when using an access token', () => {
    const shopify = new Shopify({ shopName, accessToken });

    expect(shopify.baseUrl).to.deep.equal({
      hostname: `${shopName}.myshopify.com`,
      protocol: 'https:',
      auth: false
    });
  });

  it('instantiates the resources lazily', () => {
    const shopify = new Shopify({ shopName, accessToken });

    expect(shopify.hasOwnProperty('blog')).to.be.false;

    const blog = shopify.blog;

    expect(blog).to.be.an.instanceof(Blog);
    expect(shopify.hasOwnProperty('blog')).to.be.true;
    expect(shopify.blog).to.equal(blog);
  });

  it('allows to manually instantiate a resource', () => {
    const shopify = new Shopify({ shopName, accessToken });
    const blog = new Blog(shopify);

    expect(shopify.hasOwnProperty('blog')).to.be.false;

    shopify.blog = blog;

    expect(shopify.hasOwnProperty('blog')).to.be.true;
    expect(shopify.blog).to.equal(blog);
  });

  it('has undefined callLimit and callGraphqlLimits values for the initial instance', () => {
    const shopify = new Shopify({ shopName, accessToken });

    expect(shopify.callLimits).to.deep.equal({
      remaining: undefined,
      current: undefined,
      max: undefined
    });

    expect(shopify.callGraphqlLimits).to.deep.equal({
      remaining: undefined,
      current: undefined,
      max: undefined
    });
  });

  describe('Shopify#request', () => {
    const url = assign({ path: '/test' }, shopify.baseUrl);
    const scope = common.scope;

    afterEach(() => expect(nock.isDone()).to.be.true);

    it('returns a RequestError when the request fails', () => {
      const message = 'Something wrong happened';

      scope
        .get('/test')
        .replyWithError(message);

      return shopify.request(url, 'GET').then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.RequestError);
        expect(err.message).to.equal(message);
      });
    });

    it('returns a RequestError when timeout expires (1/2)', () => {
      const shopify = new Shopify({ shopName, accessToken, timeout: 100 });

      //
      // `scope.delay()` can only delay the `response` event. The connection is
      // still established so it is useless for this test. To work around this
      // issue a non-routable IP address is used here instead of `nock`. See
      // https://tools.ietf.org/html/rfc5737#section-3
      //
      shopify.baseUrl.hostname = '192.0.2.1';

      return shopify.request(shopify.baseUrl, 'GET').then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.RequestError);
        expect(err.message).to.equal('Request timed out');
      });
    });

    it('returns a RequestError when timeout expires (2/2)', () => {
      const shopify = new Shopify({ shopName, accessToken, timeout: 100 });

      scope
        .get('/test')
        .delayBody(200)
        .reply(200, {});

      return shopify.request(url, 'GET').then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.RequestError);
        expect(err.message).to.include('Request timed out');
      });
    });

    it('returns a ParseError when it fails to parse the response body', () => {
      scope
        .get('/test')
        .reply(200, 'invalid JSON');

      return shopify.request(url, 'GET').then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.ParseError);
        expect(err.message).to.be.a('string');
      });
    });

    it('returns an HTTPError when the server response code is not 2xx', () => {
      scope
        .get('/test')
        .reply(400, {});

      return shopify.request(url, 'GET').then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.HTTPError);
        expect(err.message).to.equal('Response code 400 (Bad Request)');
      });
    });

    it('uses basic auth as intended', () => {
      const shopify = new Shopify({ shopName, apiKey, password });
      const url = assign({ path: '/test' }, shopify.baseUrl);

      nock(`https://${shopName}.myshopify.com`, {
        reqheaders: {
          'User-Agent': `${pkg.name}/${pkg.version}`,
          'Accept': 'application/json'
        },
        badheaders: ['X-Shopify-Access-Token']
      }).get('/test')
        .basicAuth({ user: apiKey, pass: password })
        .reply(200, {});

      return shopify.request(url, 'GET');
    });

    it('builds the request body as intended (1/2)', () => {
      nock(`https://${shopName}.myshopify.com`, {
        reqheaders: {
          'User-Agent': `${pkg.name}/${pkg.version}`,
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
          'Content-Length': val => val > 0,
          'Accept': 'application/json'
        }
      }).post('/test', {
        foo: { bar: 'baz' }
      }).reply(201, {});

      return shopify.request(url, 'POST', 'foo', { bar: 'baz' });
    });

    it('builds the request body as intended (2/2)', () => {
      nock(`https://${shopName}.myshopify.com`, {
        reqheaders: {
          'User-Agent': `${pkg.name}/${pkg.version}`,
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
          'Content-Length': val => val > 0,
          'Accept': 'application/json'
        }
      }).post('/test', { bar: 'baz' })
        .reply(201, {});

      return shopify.request(url, 'POST', undefined, { bar: 'baz' });
    });

    it('updates callLimits if the relevant header exists (1/2)', () => {
      scope
        .get('/test')
        .reply(200, {}, {
          'X-Shopify-Shop-Api-Call-Limit': '4/40'
        });

      return shopify.request(url, 'GET')
        .then(() => {
          expect(shopify.callLimits).to.deep.equal({
            remaining: 36,
            current: 4,
            max: 40
          });
        });
    });

    it('updates callLimits if the relevant header exists (2/2)', () => {
      scope
        .get('/test')
        .reply(422, {}, {
          'X-Shopify-Shop-Api-Call-Limit': '5/40'
        });

      return shopify.request(url, 'GET').then(() => {
        throw new Error('Test invalidation');
      }, () => {
        expect(shopify.callLimits).to.deep.equal({
          remaining: 35,
          current: 5,
          max: 40
        });
      });
    });

    it('emits the `callLimits` event', (done) => {
      scope
        .get('/test')
        .reply(200, {}, {
          'X-Shopify-Shop-Api-Call-Limit': '6/40'
        });

      shopify.on('callLimits', limits => {
        expect(limits).to.deep.equal({
          remaining: 34,
          current: 6,
          max: 40
        });
        done();
      });

      shopify.request(url, 'GET');
    });

    it('does not update callLimits if the relevant header is missing', () => {
      scope
        .get('/test')
        .reply(200, {});

      return shopify.request(url, 'GET')
        .then(() => {
          expect(shopify.callLimits).to.deep.equal({
            remaining: 34,
            current: 6,
            max: 40
          });
        });
    });

    it('returns the subtree with root node at key', () => {
      const data = { foo: 'bar' };

      scope
        .get('/test')
        .reply(200, data);

      return shopify.request(url, 'GET', 'foo')
        .then(res => expect(res).to.equal(data.foo));
    });

    it('returns the full response body when key is not provided', () => {
      const data = { foo: 'bar' };

      scope
        .get('/test')
        .reply(200, data);

      return shopify.request(url, 'GET')
        .then(res => expect(res).to.deep.equal(data));
    });

    it('returns an empty object when response body is empty', () => {
      scope
        .get('/test')
        .reply(200);

      return shopify.request(url, 'GET')
        .then(res => expect(res).to.deep.equal({}));
    });

    it('is throttled when the autoLimit option is set', () => {
      const original = Shopify.prototype.request;
      const timestamps = [];

      Shopify.prototype.request = function () {
        timestamps.push(Date.now());
        return original.apply(this, arguments);
      };

      const shopify = new Shopify({
        autoLimit: { calls: 1, interval: 100, bucketSize: 1 },
        accessToken,
        shopName
      });

      Shopify.prototype.request = original;

      scope
        .get('/test')
        .times(3)
        .reply(200, {});

      return Promise.all([
        shopify.request(url, 'GET'),
        shopify.request(url, 'GET'),
        shopify.request(url, 'GET')
      ]).then(() => {
        expect(timestamps.length).to.equal(3);
        expect(timestamps[2] - timestamps[1]).to.be.within(80, 120);
        expect(timestamps[1] - timestamps[0]).to.be.within(80, 120);
      });
    });
  });

  describe('Shopify#graphql', () => {
    const path = '/admin/api/graphql.json';
    const dummyData = 'dummy';
    const dummyExtensions = {
      cost: {
        throttleStatus: {
          maximumAvailable: 1000.0,
          currentlyAvailable: 997,
          restoreRate: 50.0
        }
      }
    };

    const scope = nock(`https://${shopName}.myshopify.com`, {
      reqheaders: {
        'User-Agent': `${pkg.name}/${pkg.version}`,
        'X-Shopify-Access-Token': accessToken
      }
    });

    afterEach(() => expect(nock.isDone()).to.be.true);

    it('returns a RequestError when the request fails', () => {
      const message = 'Something wrong happened';

      scope
        .post(path)
        .replyWithError(message);

      return shopify.graphql(dummyData).then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.RequestError);
        expect(err.message).to.equal(message);
      });
    });

    it('returns a RequestError when timeout expires (1/2)', () => {
      const shopify = new Shopify({ shopName, accessToken, timeout: 100 });

      shopify.baseUrl.hostname = '192.0.2.1';

      return shopify.graphql(dummyData).then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.RequestError);
        expect(err.message).to.equal('Request timed out');
      });
    });

    it('returns a RequestError when timeout expires (2/2)', () => {
      const shopify = new Shopify({ shopName, accessToken, timeout: 100 });

      scope
        .post(path)
        .delayBody(200)
        .reply(200, {});

      return shopify.graphql(dummyData).then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.RequestError);
        expect(err.message).to.include('Request timed out');
      });
    });

    it('returns a ParseError when it fails to parse the response body', () => {
      scope
        .post(path)
        .reply(200, 'invalid JSON');

      return shopify.graphql(dummyData).then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.ParseError);
        expect(err.message).to.be.a('string');
      });
    });

    it('returns an HTTPError when the server response code is not 2xx', () => {
      scope
        .post(path)
        .reply(400, {});

      return shopify.graphql(dummyData).then(() => {
        throw new Error('Test invalidation');
      }, err => {
        expect(err).to.be.an.instanceof(got.HTTPError);
        expect(err.message).to.equal('Response code 400 (Bad Request)');
      });
    });

    it('uses basic auth as intended', () => {
      const shopify = new Shopify({ shopName, apiKey, password });

      nock(`https://${shopName}.myshopify.com`, {
        reqheaders: {
          'User-Agent': `${pkg.name}/${pkg.version}`
        },
        badheaders: ['X-Shopify-Access-Token']
      }).post(path)
        .basicAuth({ user: apiKey, pass: password })
        .reply(200, {});

      return shopify.graphql(dummyData);
    });

    it('updates callGraphqlLimits if the extensions attribute exists', () => {
      scope
        .post(path)
        .reply(200, { extensions: dummyExtensions });

      return shopify.graphql(dummyData)
        .then(() => {
          expect(shopify.callGraphqlLimits).to.deep.equal({
            remaining: 997,
            current: 3,
            max: 1000.0
          });
        });
    });

    it('emits the `callGraphqlLimits` event', (done) => {
      scope
        .post(path)
        .reply(200, { extensions: dummyExtensions });

      shopify.on('callGraphqlLimits', limits => {
        expect(limits).to.deep.equal({
          remaining: 997,
          current: 3,
          max: 1000.0
        });
        done();
      });

      shopify.graphql(dummyData);
    });

    it('does not update callGraphqlLimits if extensions is missing', () => {
      scope
        .post(path)
        .reply(200, {});

      return shopify.graphql(dummyData)
        .then(() => {
          expect(shopify.callLimits).to.deep.equal({
            remaining: 34,
            current: 6,
            max: 40
          });
        });
    });

    it('returns a valid response when using graphql endpoint', () => {
      const response = {
        data: { foo: 'bar' }
      };

      scope
        .post(path)
        .reply(200, response);

      return shopify.graphql(dummyData)
        .then(res => expect(res).to.deep.equal(response.data));
    });
  });
});

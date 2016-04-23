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

  it('throws an error when required constructor arguments are missing', () => {
    expect(() => {
      new Shopify();
    }).to.throw(/Missing required arguments/);

    expect(() => {
      new Shopify(shopName);
    }).to.throw(/Missing required arguments/);

    expect(() => {
      new Shopify('', apiKey);
    }).to.throw(/Missing required arguments/);
  });

  it('makes the new operator optional', () => {
    const shopify = Shopify(shopName, accessToken);

    expect(shopify).to.be.an.instanceof(Shopify);
  });

  it('adds basic auth to the URL when using apiKey and password', () => {
    const shopify = new Shopify(shopName, apiKey, password);

    expect(shopify.baseUrl).to.deep.equal({
      hostname: `${shopName}.myshopify.com`,
      auth: `${apiKey}:${password}`,
      protocol: 'https:'
    });
  });

  it('does not add basic auth to the URL when using an access token', () => {
    const shopify = new Shopify(shopName, accessToken);

    expect(shopify.baseUrl).to.deep.equal({
      hostname: `${shopName}.myshopify.com`,
      protocol: 'https:',
      auth: undefined
    });
  });

  it('instantiates the resources lazily', () => {
    const shopify = new Shopify(shopName, accessToken);

    expect(shopify.hasOwnProperty('blog')).to.be.false;

    const blog = shopify.blog;

    expect(blog).to.be.an.instanceof(Blog);
    expect(shopify.hasOwnProperty('blog')).to.be.true;
    expect(shopify.blog).to.equal(blog);
  });

  it('allows to manually instantiate a resource', () => {
    const shopify = new Shopify(shopName, accessToken);
    const blog = new Blog(shopify);

    expect(shopify.hasOwnProperty('blog')).to.be.false;

    shopify.blog = blog;

    expect(shopify.hasOwnProperty('blog')).to.be.true;
    expect(shopify.blog).to.equal(blog);
  });

  it('has undefined callLimit values for the initial instance', () => {
    const shopify = new Shopify(shopName, accessToken);

    expect(shopify.callLimits).to.deep.equal({
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
      const shopify = new Shopify(shopName, apiKey, password);
      const url = assign({ path: '/test' }, shopify.baseUrl);

      nock(`https://${shopName}.myshopify.com`, {
        reqheaders: {
          'User-Agent': `${pkg.name}/${pkg.version}`,
          'Accept': 'application/json'
        },
        badheaders: ['X-Shopify-Access-Token']
      })
      .get('/test')
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
      })
      .post('/test', {
        foo: { bar: 'baz' }
      })
      .reply(201, {});

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
      })
      .post('/test', { bar: 'baz' })
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

    it('does not update callLimits if the relevant header is missing', () => {
      scope
        .get('/test')
        .reply(200, {});

      return shopify.request(url, 'GET')
        .then(() => {
          expect(shopify.callLimits).to.deep.equal({
            remaining: 35,
            current: 5,
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
  });
});

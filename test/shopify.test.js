describe('Shopify', () => {
  'use strict';

  const expect = require('chai').expect;
  const nock = require('nock');
  const got = require('got');

  const Blog = require('../resources').Blog;
  const common = require('./common');
  const Shopify = require('..');

  const accessToken = common.accessToken;
  const shopName = common.shopName;
  const password = common.password;
  const shopify = common.shopify;
  const apiKey = common.apiKey;
  const scope = common.scope;

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

  describe('Shopify#request', () => {
    const url = Object.assign({ path: '/test' }, shopify.baseUrl);

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
      const url = Object.assign({ path: '/test' }, shopify.baseUrl);

      nock(`https://${shopName}.myshopify.com`, {
        reqheaders: {
          'User-Agent': `Node.js/${process.version.replace('v', '')}`,
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
          'User-Agent': `Node.js/${process.version.replace('v', '')}`,
          'X-Shopify-Access-Token': accessToken,
          'Accept': 'application/json',
          'Content-Length': (val) => val > 0,
          'Content-Type': 'application/json'
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
          'User-Agent': `Node.js/${process.version.replace('v', '')}`,
          'X-Shopify-Access-Token': accessToken,
          'Accept': 'application/json',
          'Content-Length': (val) => val > 0,
          'Content-Type': 'application/json'
        }
      })
      .post('/test', { bar: 'baz' })
      .reply(201, {});

      return shopify.request(url, 'POST', undefined, { bar: 'baz' });
    });

    it('returns the subtree with root node at key', () => {
      const data = { foo: 'bar' };

      scope
        .get('/test')
        .reply(200, data);

      return shopify
        .request(url, 'GET', 'foo')
        .then(res => expect(res).to.equal(data.foo));
    });

    it('returns the full response body when key is not provided', () => {
      const data = { foo: 'bar' };

      scope
        .get('/test')
        .reply(200, data);

      return shopify
        .request(url, 'GET')
        .then(res => expect(res).to.deep.equal(data));
    });
  });
});

describe('Shopify', () => {
  'use strict';

  const jsonBigInt = require('json-bigint');
  const expect = require('chai').expect;
  const format = require('url').format;
  const nock = require('nock');
  const got = require('got');
  const qs = require('qs');

  const Blog = require('../resources/blog');
  const common = require('./common');
  const pkg = require('../package');
  const Shopify = require('..');

  const { parse: parseJson, stringify: stringifyJson } = jsonBigInt({
    useNativeBigInt: true
  });

  const accessToken = common.accessToken;
  const apiKey = common.apiKey;
  const apiVersion = common.apiVersion;
  const password = common.password;
  const shopify = common.shopify;
  const shopName = common.shopName;

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
      protocol: 'https:',
      hostname: shopName
    });
  });

  it('adds the Authorization header when using apiKey and password', () => {
    const shopify = new Shopify({ shopName, apiKey, password });

    expect(shopify.baseHeaders).to.deep.equal({
      'User-Agent': `${pkg.name}/${pkg.version}`,
      Authorization:
        'Basic YmM3MzFlNTAwODQwMjMxZGE1YjQzYmIzZjM4OGQyZjA6NzIyOTdkOTcxMjcxYm' +
        'M2MmNhODk5YmJhNzQzMmFjYjE='
    });
  });

  it('adds the X-Shopify-Access-Token header when using accessToken', () => {
    const shopify = new Shopify({ shopName, accessToken });

    expect(shopify.baseHeaders).to.deep.equal({
      'User-Agent': `${pkg.name}/${pkg.version}`,
      'X-Shopify-Access-Token': 'f85632530bf277ec9ac6f649fc327f17'
    });
  });

  it('instantiates the resources lazily', () => {
    const shopify = new Shopify({ shopName, accessToken });

    expect(Object.prototype.hasOwnProperty.call(shopify, 'blog')).to.be.false;

    const blog = shopify.blog;

    expect(blog).to.be.an.instanceof(Blog);
    expect(Object.prototype.hasOwnProperty.call(shopify, 'blog')).to.be.true;
    expect(shopify.blog).to.equal(blog);
  });

  it('allows to manually instantiate a resource', () => {
    const shopify = new Shopify({ shopName, accessToken });
    const blog = new Blog(shopify);

    expect(Object.prototype.hasOwnProperty.call(shopify, 'blog')).to.be.false;

    shopify.blog = blog;

    expect(Object.prototype.hasOwnProperty.call(shopify, 'blog')).to.be.true;
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
      restoreRate: undefined,
      remaining: undefined,
      current: undefined,
      max: undefined,
      actualQueryCost: undefined,
      requestedQueryCost: undefined
    });
  });

  describe('Shopify#request', () => {
    const url = { pathname: '/test', ...shopify.baseUrl };
    const scope = common.scope;

    afterEach(() => expect(nock.pendingMocks()).to.deep.equal([]));

    it('returns a RequestError when the request fails', () => {
      const message = 'Something wrong happened';

      scope.get('/test').replyWithError(message);

      return shopify.request(url, 'GET').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.RequestError);
          expect(err.message).to.equal(message);
        }
      );
    });

    it('returns a TimeoutError when timeout expires (1/2)', () => {
      const shopify = new Shopify({ shopName, accessToken, timeout: 100 });

      //
      // `scope.delay()` can only delay the `'response'` event. The connection
      // is still established so it is useless for this test. To work around
      // this issue a non-routable IP address is used here instead of `nock`.
      // See https://tools.ietf.org/html/rfc5737#section-3
      //
      shopify.baseUrl.hostname = '192.0.2.1';

      return shopify.request(shopify.baseUrl, 'GET').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.TimeoutError);
          expect(err.message).to.equal("Timeout awaiting 'request' for 100ms");
        }
      );
    });

    it('returns a TimeoutError when timeout expires (2/2)', () => {
      const shopify = new Shopify({ shopName, accessToken, timeout: 100 });

      scope.get('/test').delayBody(200).reply(200, {});

      return shopify.request(url, 'GET').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.TimeoutError);
          expect(err.message).to.include(
            "Timeout awaiting 'request' for 100ms"
          );
        }
      );
    });

    it('returns a ParseError when it fails to parse the response body', () => {
      scope.get('/test').reply(200, 'invalid JSON');

      return shopify.request(url, 'GET').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.ParseError);
          expect(err.message).to.be.a('string');
        }
      );
    });

    it('returns an HTTPError when the server response code is not 2xx', () => {
      scope.get('/test').reply(400, {});

      return shopify.request(url, 'GET').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.HTTPError);
          expect(err.message).to.equal('Response code 400 (Bad Request)');
        }
      );
    });

    it('uses basic auth as intended', () => {
      const shopify = new Shopify({ shopName, apiKey, password });
      const url = { pathname: '/test', ...shopify.baseUrl };

      nock(`https://${shopName}.myshopify.com`, {
        reqheaders: {
          'User-Agent': `${pkg.name}/${pkg.version}`,
          Accept: 'application/json'
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
          'Content-Length': (val) => val > 0,
          Accept: 'application/json'
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
          'Content-Length': (val) => val > 0,
          Accept: 'application/json'
        }
      })
        .post('/test', { bar: 'baz' })
        .reply(201, {});

      return shopify.request(url, 'POST', undefined, { bar: 'baz' });
    });

    it('updates callLimits if the relevant header exists (1/2)', () => {
      scope.get('/test').reply(
        200,
        {},
        {
          'X-Shopify-Shop-Api-Call-Limit': '4/40'
        }
      );

      return shopify.request(url, 'GET').then(() => {
        expect(shopify.callLimits).to.deep.equal({
          remaining: 36,
          current: 4,
          max: 40
        });
      });
    });

    it('updates callLimits if the relevant header exists (2/2)', () => {
      scope.get('/test').reply(
        422,
        {},
        {
          'X-Shopify-Shop-Api-Call-Limit': '5/40'
        }
      );

      return shopify.request(url, 'GET').then(
        () => {
          throw new Error('Test invalidation');
        },
        () => {
          expect(shopify.callLimits).to.deep.equal({
            remaining: 35,
            current: 5,
            max: 40
          });
        }
      );
    });

    it("emits the 'callLimits' event", (done) => {
      scope.get('/test').reply(
        200,
        {},
        {
          'X-Shopify-Shop-Api-Call-Limit': '6/40'
        }
      );

      shopify.on('callLimits', (limits) => {
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
      scope.get('/test').reply(200, {});

      return shopify.request(url, 'GET').then(() => {
        expect(shopify.callLimits).to.deep.equal({
          remaining: 34,
          current: 6,
          max: 40
        });
      });
    });

    it('returns the subtree with root node at key', () => {
      const data = { foo: 'bar' };

      scope.get('/test').reply(200, data);

      return shopify
        .request(url, 'GET', 'foo')
        .then((res) => expect(res).to.equal(data.foo));
    });

    it('returns the full response body when key is not provided', () => {
      const data = { foo: 'bar' };

      scope.get('/test').reply(200, data);

      return shopify
        .request(url, 'GET')
        .then((res) => expect(res).to.deep.equal(data));
    });

    it('returns an empty object when response body is empty', () => {
      scope.get('/test').reply(200);

      return shopify
        .request(url, 'GET')
        .then((res) => expect(res).to.deep.equal({}));
    });

    it('returns pagination parameters when available (1/3)', () => {
      const data = { foo: [{ id: 4326561120291 }] };

      const nextPageParams = {
        limit: '1',
        page_info:
          'eyJsYXN0X2lkIjo0MzI2NTYxMTIwMjkxLCJsYXN0X3ZhbHVlIjoiMSIsImRpcmVjdG' +
          'lvbiI6Im5leHQifQ'
      };
      const nextLink = format({
        pathname: '/test',
        query: nextPageParams,
        ...shopify.baseUrl
      });

      scope
        .get('/test')
        .query({ limit: 1 })
        .reply(200, data, { Link: `<${nextLink}>; rel="next"` });

      const url = { pathname: '/test', search: '?limit=1', ...shopify.baseUrl };

      return shopify.request(url, 'GET', 'foo').then((res) => {
        expect(res).to.deep.equal(data.foo);
        expect(res.nextPageParameters).to.deep.equal(nextPageParams);
        expect(res.previousPageParameters).to.be.undefined;
      });
    });

    it('returns pagination parameters when available (2/3)', () => {
      const data = { foo: [{ id: 4326561218595 }] };
      const query = {
        limit: 1,
        page_info:
          'eyJsYXN0X2lkIjo0MzI2NTYxMTIwMjkxLCJsYXN0X3ZhbHVlIjoiMSIsImRpcmVjdG' +
          'lvbiI6Im5leHQifQ'
      };

      const prevPageParams = {
        limit: '1',
        page_info:
          'eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6NDMyNjU2MTIxODU5NSwibGFzdF' +
          '92YWx1ZSI6IjIifQ'
      };
      const prevLink = format({
        pathname: '/test',
        query: prevPageParams,
        ...shopify.baseUrl
      });
      const nextPageParams = {
        limit: '1',
        page_info:
          'eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6NDMyNjU2MTIxODU5NSwibGFzdF' +
          '92YWx1ZSI6IjIifQ'
      };
      const nextLink = format({
        pathname: '/test',
        query: nextPageParams,
        ...shopify.baseUrl
      });

      scope
        .get('/test')
        .query(query)
        .reply(200, data, {
          Link: `<${prevLink}>; rel="previous", <${nextLink}>; rel="next"`
        });

      const url = {
        pathname: '/test',
        search: `?${qs.stringify(query)}`,
        ...shopify.baseUrl
      };
      return shopify.request(url, 'GET', 'foo').then((res) => {
        expect(res).to.deep.equal(data.foo);
        expect(res.nextPageParameters).to.deep.equal(nextPageParams);
        expect(res.previousPageParameters).to.deep.equal(prevPageParams);
      });
    });

    it('returns pagination parameters when available (3/3)', () => {
      const data = { foo: [{ id: 4326561415203 }] };
      const query = {
        limit: 1,
        page_info:
          'eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6NDMyNjU2MTIxODU5NSwibGFzdF' +
          '92YWx1ZSI6IjIifQ'
      };

      const prevPageParams = {
        limit: '1',
        page_info:
          'eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6NDMyNjU2MTQxNTIwMywibGFzdF' +
          '92YWx1ZSI6IjMifQ'
      };
      const prevLink = format({
        pathname: '/test',
        query: prevPageParams,
        ...shopify.baseUrl
      });

      scope
        .get('/test')
        .query(query)
        .reply(200, data, { Link: `<${prevLink}>; rel="previous"` });

      const url = {
        pathname: '/test',
        search: `?${qs.stringify(query)}`,
        ...shopify.baseUrl
      };

      return shopify.request(url, 'GET', 'foo').then((res) => {
        expect(res).to.deep.equal(data.foo);
        expect(res.nextPageParameters).to.be.undefined;
        expect(res.previousPageParameters).to.deep.equal(prevPageParams);
      });
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

      scope.get('/test').times(3).reply(200, {});

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

    it('honors the parseJson and stringifyJson options', () => {
      const shopify = new Shopify({
        accessToken,
        parseJson,
        shopName,
        stringifyJson
      });

      const data = { x: 9223372036854775807n };
      const serialized = '{"x":9223372036854775807}';

      scope.post('/test', serialized).reply(200, serialized);

      return shopify.request(url, 'POST', undefined, data).then((res) => {
        expect(res).to.deep.equal(data);
      });
    });
  });

  describe('Shopify#graphql', () => {
    const scope = nock(`https://${shopName}.myshopify.com`, {
      reqheaders: {
        'User-Agent': `${pkg.name}/${pkg.version}`,
        'X-Shopify-Access-Token': accessToken
      }
    });

    afterEach(() => expect(nock.pendingMocks()).to.deep.equal([]));

    it('returns a RequestError when the request fails', () => {
      const message = 'Something wrong happened';

      scope.post('/admin/api/graphql.json').replyWithError(message);

      return shopify.graphql('query').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.RequestError);
          expect(err.message).to.equal(message);
        }
      );
    });

    it('returns an Error with GraphQL info if the request fails (1/2)', () => {
      const message = 'Something wrong happened';
      const locations = ['location'];
      const path = 'path';
      const extensions = ['extensions'];

      scope.post('/admin/api/graphql.json').reply(200, {
        data: {},
        errors: [{ message, locations, path, extensions }]
      });

      return shopify.graphql('query').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(Error);
          expect(err.message).to.equal(message);
          expect(err.locations).to.deep.equal(locations);
          expect(err.path).to.equal(path);
          expect(err.extensions).to.deep.equal(extensions);
        }
      );
    });

    it('returns an Error with GraphQL info if the request fails (2/2)', () => {
      const message = 'Something wrong happened';
      const locations = ['location'];
      const path = 'path';
      const extensions = ['extensions'];

      scope.post('/admin/api/graphql.json').reply(200, {
        data: {},
        errors: [{ message, locations, path, extensions }]
      });

      return shopify.graphql('query', { variable: 'value' }).then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(Error);
          expect(err.message).to.equal(message);
          expect(err.locations).to.deep.equal(locations);
          expect(err.path).to.equal(path);
          expect(err.extensions).to.deep.equal(extensions);
        }
      );
    });

    it('returns a TimeoutError when timeout expires (1/2)', () => {
      const shopify = new Shopify({ shopName, accessToken, timeout: 100 });

      shopify.baseUrl.hostname = '192.0.2.1';

      return shopify.graphql('query').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.TimeoutError);
          expect(err.message).to.equal("Timeout awaiting 'request' for 100ms");
        }
      );
    });

    it('returns a TimeoutError when timeout expires (2/2)', () => {
      const shopify = new Shopify({ shopName, accessToken, timeout: 100 });

      scope.post('/admin/api/graphql.json').delayBody(200).reply(200, {});

      return shopify.graphql('query').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.TimeoutError);
          expect(err.message).to.include(
            "Timeout awaiting 'request' for 100ms"
          );
        }
      );
    });

    it('returns a ParseError when it fails to parse the response body', () => {
      scope.post('/admin/api/graphql.json').reply(200, 'invalid JSON');

      return shopify.graphql('query').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.ParseError);
          expect(err.message).to.be.a('string');
        }
      );
    });

    it('returns an HTTPError when the server response code is not 2xx', () => {
      scope.post('/admin/api/graphql.json').reply(400, {});

      return shopify.graphql('query').then(
        () => {
          throw new Error('Test invalidation');
        },
        (err) => {
          expect(err).to.be.an.instanceof(got.HTTPError);
          expect(err.message).to.equal('Response code 400 (Bad Request)');
        }
      );
    });

    it('uses basic auth as intended', () => {
      const shopify = new Shopify({ shopName, apiKey, password });

      nock(`https://${shopName}.myshopify.com`, {
        reqheaders: {
          'User-Agent': `${pkg.name}/${pkg.version}`
        },
        badheaders: ['X-Shopify-Access-Token']
      })
        .post('/admin/api/graphql.json')
        .basicAuth({ user: apiKey, pass: password })
        .reply(200, {});

      return shopify.graphql('query');
    });

    it('updates callGraphqlLimits if the extensions attribute exists', () => {
      scope.post('/admin/api/graphql.json').reply(200, {
        extensions: {
          cost: {
            requestedQueryCost: 3,
            actualQueryCost: 3,
            throttleStatus: {
              maximumAvailable: 1000.0,
              currentlyAvailable: 997,
              restoreRate: 50.0
            }
          }
        }
      });

      return shopify.graphql('query').then(() => {
        expect(shopify.callGraphqlLimits).to.deep.equal({
          restoreRate: 50.0,
          remaining: 997,
          current: 3,
          max: 1000.0,
          actualQueryCost: 3,
          requestedQueryCost: 3
        });
      });
    });

    it("emits the 'callGraphqlLimits' event", (done) => {
      scope.post('/admin/api/graphql.json').reply(200, {
        extensions: {
          cost: {
            requestedQueryCost: 3,
            actualQueryCost: 3,
            throttleStatus: {
              maximumAvailable: 1000.0,
              currentlyAvailable: 997,
              restoreRate: 50.0
            }
          }
        }
      });

      shopify.on('callGraphqlLimits', (limits) => {
        expect(limits).to.deep.equal({
          restoreRate: 50.0,
          remaining: 997,
          current: 3,
          max: 1000.0,
          actualQueryCost: 3,
          requestedQueryCost: 3
        });
        done();
      });

      shopify.graphql('query');
    });

    it('does not update callGraphqlLimits if extensions is missing', () => {
      scope.post('/admin/api/graphql.json').reply(200, {});

      return shopify.graphql('query').then(() => {
        expect(shopify.callGraphqlLimits).to.deep.equal({
          restoreRate: 50.0,
          remaining: 997,
          current: 3,
          max: 1000.0,
          actualQueryCost: 3,
          requestedQueryCost: 3
        });
      });
    });

    it('does not update callGraphqlLimits if throttleStatus is missing', () => {
      scope.post('/admin/api/graphql.json').reply(200, {
        extensions: {
          cost: {}
        }
      });

      return shopify.graphql('query').then(() => {
        expect(shopify.callGraphqlLimits).to.deep.equal({
          restoreRate: 50.0,
          remaining: 997,
          current: 3,
          max: 1000.0,
          actualQueryCost: 3,
          requestedQueryCost: 3
        });
      });
    });

    it('returns a valid response when using graphql endpoint (1/2)', () => {
      const response = {
        data: { foo: 'bar' }
      };

      scope.post('/admin/api/graphql.json').reply(200, response);

      return shopify
        .graphql('query')
        .then((res) => expect(res).to.deep.equal(response.data));
    });

    it('returns a valid response when using graphql endpoint (2/2)', () => {
      const response = {
        data: { foo: 'bar' }
      };

      scope.post('/admin/api/graphql.json').reply(200, response);

      return shopify
        .graphql('query', { name: 'value' })
        .then((res) => expect(res).to.deep.equal(response.data));
    });

    it('injects the api version to the request path if provided', () => {
      const shopify = new Shopify({ shopName, accessToken, apiVersion });

      const response = {
        data: { foo: 'bar' }
      };

      scope.post(`/admin/api/${apiVersion}/graphql.json`).reply(200, response);

      return shopify
        .graphql('query')
        .then((res) => expect(res).to.deep.equal(response.data));
    });

    it('honors the parseJson and stringifyJson options', () => {
      const shopify = new Shopify({
        accessToken,
        parseJson,
        shopName,
        stringifyJson
      });

      const data = { x: 9223372036854775807n };

      scope
        .post(
          '/admin/api/graphql.json',
          '{"query":"query","variables":{"x":9223372036854775807}}'
        )
        .reply(200, '{"data":{"x":9223372036854775807}}');

      return shopify.graphql('query', data).then((res) => {
        expect(res).to.deep.equal(data);
      });
    });
  });
});

describe('Shopify#shop', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/shop');
  const common = require('./common');
  const Shopify = require('..');

  const accessToken = common.accessToken;
  const apiVersion = common.apiVersion;
  const scope = common.scope;
  const shopify = common.shopify;
  const shopName = common.shopName;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets the configuration of the shop (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/shop.json').reply(200, output);

    return shopify.shop
      .get()
      .then((data) => expect(data).to.deep.equal(output.shop));
  });

  it('gets the configuration of the shop (2/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/shop.json?foo=bar').reply(200, output);

    return shopify.shop
      .get({ foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.shop));
  });

  it('injects the api version to the request path if provided', () => {
    const shopify = new Shopify({ shopName, accessToken, apiVersion });

    scope
      .get(`/admin/api/${apiVersion}/shop.json`)
      .reply(200, { status: 'success' });

    return shopify.shop.get();
  });
});

describe('Shopify#shop', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/shop');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets the configuration of the shop (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/shop.json')
      .reply(200, output);

    return shopify.shop.get()
      .then(data => expect(data).to.deep.equal(output.shop));
  });

  it('gets the configuration of the shop (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/shop.json?foo=bar')
      .reply(200, output);

    return shopify.shop.get({ foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.shop));
  });
});

describe('Shopify#shippingZone', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/shipping-zone');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of all shipping zones (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/shipping_zones.json').reply(200, output);

    return shopify.shippingZone
      .list()
      .then((data) => expect(data).to.deep.equal(output.shipping_zones));
  });

  it('gets a list of all shipping zones (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/shipping_zones.json?foo=bar').reply(200, output);

    return shopify.shippingZone
      .list({ foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.shipping_zones));
  });
});

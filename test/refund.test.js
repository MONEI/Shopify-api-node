describe('Shopify#refund', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/refund');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a single refund by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/refunds/509562969.json')
      .reply(200, output);

    return shopify.refund.get(450789469, 509562969)
      .then(data => expect(data).to.deep.equal(output.refund));
  });

  it('gets a single refund by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/refunds/509562969.json?foo=bar')
      .reply(200, output);

    return shopify.refund.get(450789469, 509562969, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.refund));
  });
});

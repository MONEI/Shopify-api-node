describe('Shopify#checkout', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/checkout');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a count of all checkout (1/2)', () => {
    scope
      .get('/admin/checkouts/count.json')
      .reply(200, { count: 5 });

    return shopify.checkout.count()
      .then(data => expect(data).to.equal(5));
  });

  it('gets a count of all checkout (2/2)', () => {
    scope
      .get('/admin/checkouts/count.json?foo=bar')
      .reply(200, { count: 5 });

    return shopify.checkout.count({ foo: 'bar' })
      .then(data => expect(data).to.equal(5));
  });

  it('gets a list of all checkout (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/checkouts.json')
      .reply(200, output);

    return shopify.checkout.list()
      .then(data => expect(data).to.deep.equal(output.checkouts));
  });

  it('gets a list of all checkout (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/checkouts.json?foo=bar')
      .reply(200, output);

    return shopify.checkout.list({ foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.checkouts));
  });
});

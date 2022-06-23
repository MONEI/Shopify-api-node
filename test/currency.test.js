describe('Shopify#currency', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/currency');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of currencies enabled on a shop', () => {
    const output = fixtures.res.list;

    scope.get('/admin/currencies.json').reply(200, output);

    return shopify.currency
      .list()
      .then((data) => expect(data).to.deep.equal(output.currencies));
  });
});

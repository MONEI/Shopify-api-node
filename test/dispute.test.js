describe('Shopify#dispute', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/dispute');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list disputes (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/shopify_payments/disputes.json').reply(200, output);

    return shopify.dispute
      .list()
      .then((data) => expect(data).to.deep.equal(output.disputes));
  });

  it('gets a list disputes (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/shopify_payments/disputes.json?since_id=35982382')
      .reply(200, output);

    return shopify.dispute
      .list({ since_id: 35982382 })
      .then((data) => expect(data).to.deep.equal(output.disputes));
  });

  it('gets a single dispute by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/shopify_payments/disputes/598735659.json')
      .reply(200, output);

    return shopify.dispute
      .get(598735659)
      .then((data) => expect(data).to.deep.equal(output.dispute));
  });
});

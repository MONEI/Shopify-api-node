describe('Shopify#balance', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/balance');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets the current balance', () => {
    const output = fixtures.res.list;

    scope.get('/admin/shopify_payments/balance.json').reply(200, output);

    return shopify.balance
      .list()
      .then((data) => expect(data).to.deep.equal(output.balance));
  });

  it('gets a list of balance transactions (1/2)', () => {
    const output = fixtures.res.transactions;

    scope
      .get('/admin/shopify_payments/balance/transactions.json')
      .reply(200, output);

    return shopify.balance
      .transactions()
      .then((data) => expect(data).to.deep.equal(output.transactions));
  });

  it('gets a list of balance transactions (2/2)', () => {
    const output = fixtures.res.transactions;
    const params = { payout_id: 623721858 };

    scope
      .get('/admin/shopify_payments/balance/transactions.json')
      .query(params)
      .reply(200, output);

    return shopify.balance
      .transactions(params)
      .then((data) => expect(data).to.deep.equal(output.transactions));
  });
});

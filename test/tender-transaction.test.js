describe('Shopify#tenderTransaction', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/tender-transaction');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of tender transactions (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/tender_transactions.json').reply(200, output);

    return shopify.tenderTransaction
      .list()
      .then((data) => expect(data).to.deep.equal(output.tender_transactions));
  });

  it('gets a list of tender transactions (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/tender_transactions.json?since_id=776836109')
      .reply(200, output);

    return shopify.tenderTransaction
      .list({ since_id: 776836109 })
      .then((data) => expect(data).to.deep.equal(output.tender_transactions));
  });
});

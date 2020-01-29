describe('Shopify#payout', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/payout');
  const common = require('./common');
  const Shopify = require('..');

  const accessToken = common.accessToken;
  const apiVersion = common.apiVersion;
  const scope = common.scope;
  const shopify = common.shopify;
  const shopName = common.shopName;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list payouts (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/shopify_payments/payouts.json').reply(200, output);

    return shopify.payout
      .list()
      .then((data) => expect(data).to.deep.equal(output.payouts));
  });

  it('gets a list payouts (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/shopify_payments/payouts.json?since_id=623721857')
      .reply(200, output);

    return shopify.payout
      .list({ since_id: 623721857 })
      .then((data) => expect(data).to.deep.equal(output.payouts));
  });

  it('gets a single payout by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/shopify_payments/payouts/623721858.json')
      .reply(200, output);

    return shopify.payout
      .get(623721858)
      .then((data) => expect(data).to.deep.equal(output.payout));
  });

  it('injects the api version to the request path if provided', () => {
    const output = fixtures.res.get;
    const shopify = new Shopify({ shopName, accessToken, apiVersion });

    scope
      .get(`/admin/api/${apiVersion}/shopify_payments/payouts/623721858.json`)
      .reply(200, output);

    return shopify.payout
      .get(623721858)
      .then((data) => expect(data).to.deep.equal(output.payout));
  });
});

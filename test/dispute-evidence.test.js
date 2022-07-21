describe('Shopify#disputeEvidence', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/dispute-evidence');
  const common = require('./common');
  const Shopify = require('..');

  const accessToken = common.accessToken;
  const scope = common.scope;
  const shopify = common.shopify;
  const shopName = common.shopName;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('get the dispute evidence associated with the dispute ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/shopify_payments/disputes/598735659/dispute_evidences.json')
      .reply(200, output);

    return shopify.disputeEvidence
      .get(598735659)
      .then((data) => expect(data).to.deep.equal(output.dispute_evidence));
  });

  it('get the dispute evidence associated with the dispute ID (2/2)', () => {
    const output = fixtures.res.get;
    const params = { foo: 'bar' };

    scope
      .get('/admin/shopify_payments/disputes/598735659/dispute_evidences.json')
      .query(params)
      .reply(200, output);

    return shopify.disputeEvidence
      .get(598735659, params)
      .then((data) => expect(data).to.deep.equal(output.dispute_evidence));
  });

  it('updates the dispute evidence associated with dispute ID', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put(
        '/admin/shopify_payments/disputes/598735659/dispute_evidences.json',
        input
      )
      .reply(200, output);

    return shopify.disputeEvidence
      .update(598735659, input.dispute_evidence)
      .then((data) => expect(data).to.deep.equal(output.dispute_evidence));
  });

  it('injects the api version to the request path if provided', () => {
    const output = fixtures.res.get;
    const apiVersion = '2022-07';
    const shopify = new Shopify({ shopName, accessToken, apiVersion });
    const pathname =
      `/admin/api/${apiVersion}/shopify_payments` +
      '/disputes/598735659/dispute_evidences.json';

    scope.get(pathname).reply(200, output);

    return shopify.disputeEvidence
      .get(598735659)
      .then((data) => expect(data).to.deep.equal(output.dispute_evidence));
  });
});

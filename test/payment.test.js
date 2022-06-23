describe('Shopify#payment', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/payment');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of payments on a particular checkout', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/checkouts/7yjf4v2we7gamku6a6h7tvm8h3mmvs4x/payments.json')
      .reply(200, output);

    return shopify.payment
      .list('7yjf4v2we7gamku6a6h7tvm8h3mmvs4x')
      .then((data) => expect(data).to.deep.equal(output.payments));
  });

  it('creates a new payment', () => {
    const token = '7yjf4v2we7gamku6a6h7tvm8h3mmvs4x';
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post(`/admin/checkouts/${token}/payments.json`, input)
      .reply(201, output);

    return shopify.payment
      .create(token, input.payment)
      .then((data) => expect(data).to.deep.equal(output.payment));
  });

  it('gets a single payment by its ID', () => {
    const token = '7yjf4v2we7gamku6a6h7tvm8h3mmvs4x';
    const output = fixtures.res.get;

    scope
      .get(`/admin/checkouts/${token}/payments/25428999.json`)
      .reply(200, output);

    return shopify.payment
      .get(token, 25428999)
      .then((data) => expect(data).to.deep.equal(output.payment));
  });

  it('counts the number of payments attempted on a checkout', () => {
    const token = '7yjf4v2we7gamku6a6h7tvm8h3mmvs4x';

    scope
      .get(`/admin/checkouts/${token}/payments/count.json`)
      .reply(200, { count: 1 });

    return shopify.payment
      .count(token)
      .then((data) => expect(data).to.equal(1));
  });
});

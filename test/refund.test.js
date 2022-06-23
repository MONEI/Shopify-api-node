describe('Shopify#refund', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/refund');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of refunds for an order (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/orders/450789469/refunds.json').reply(200, output);

    return shopify.refund
      .list(450789469)
      .then((data) => expect(data).to.deep.equal(output.refunds));
  });

  it('gets a list of refunds for an order (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders/450789469/refunds.json?foo=bar')
      .reply(200, output);

    return shopify.refund
      .list(450789469, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.refunds));
  });

  it('gets a single refund by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/refunds/509562969.json')
      .reply(200, output);

    return shopify.refund
      .get(450789469, 509562969)
      .then((data) => expect(data).to.deep.equal(output.refund));
  });

  it('gets a single refund by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/refunds/509562969.json?foo=bar')
      .reply(200, output);

    return shopify.refund
      .get(450789469, 509562969, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.refund));
  });

  it('calculates a refund', () => {
    const input = fixtures.req.calculate;
    const output = fixtures.res.calculate;

    scope
      .post('/admin/orders/450789469/refunds/calculate.json', input)
      .reply(200, output);

    return shopify.refund
      .calculate(450789469, input.refund)
      .then((data) => expect(data).to.deep.equal(output.refund));
  });

  it('creates a refund for an existing order', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/orders/450789469/refunds.json', input)
      .reply(201, output);

    return shopify.refund
      .create(450789469, input.refund)
      .then((data) => expect(data).to.deep.equal(output.refund));
  });
});

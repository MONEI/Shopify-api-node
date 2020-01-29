describe('Shopify#transaction', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/transaction');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all transactions for an order (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/orders/450789469/transactions.json').reply(200, output);

    return shopify.transaction
      .list(450789469)
      .then((data) => expect(data).to.deep.equal(output.transactions));
  });

  it('gets a list of all transactions for an order (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders/450789469/transactions.json?since_id=179259968')
      .reply(200, output);

    return shopify.transaction
      .list(450789469, { since_id: 179259968 })
      .then((data) => expect(data).to.deep.equal(output.transactions));
  });

  it('gets a count of all transactions', () => {
    scope
      .get('/admin/orders/450789469/transactions/count.json')
      .reply(200, { count: 3 });

    return shopify.transaction
      .count(450789469)
      .then((data) => expect(data).to.equal(3));
  });

  it('gets a single transaction by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/transactions/389404469.json')
      .reply(200, output);

    return shopify.transaction
      .get(450789469, 389404469)
      .then((data) => expect(data).to.deep.equal(output.transaction));
  });

  it('gets a single transaction by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/transactions/389404469.json?foo=bar')
      .reply(200, output);

    return shopify.transaction
      .get(450789469, 389404469, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.transaction));
  });

  it('creates a new transaction', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/orders/450789469/transactions.json', input)
      .reply(201, output);

    return shopify.transaction
      .create(450789469, input.transaction)
      .then((data) => expect(data).to.deep.equal(output.transaction));
  });
});

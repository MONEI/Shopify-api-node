describe('Shopify#order', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/order');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all orders (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders.json')
      .reply(200, output);

    return shopify.order.list()
      .then(data => expect(data).to.deep.equal(output.orders));
  });

  it('gets a list of all orders (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders.json?page=1')
      .reply(200, output);

    return shopify.order.list({ page: 1 })
      .then(data => expect(data).to.deep.equal(output.orders));
  });

  it('gets a single order by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469.json')
      .reply(200, output);

    return shopify.order.get(450789469)
      .then(data => expect(data).to.deep.equal(output.order));
  });

  it('gets a single order by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469.json?foo=bar')
      .reply(200, output);

    return shopify.order.get(450789469, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.order));
  });

  it('gets a count of all orders (1/2)', () => {
    scope
      .get('/admin/orders/count.json')
      .reply(200, { count: 1 });

    return shopify.order.count()
      .then(data => expect(data).to.equal(1));
  });

  it('gets a count of all orders (2/2)', () => {
    scope
      .get('/admin/orders/count.json?status=open')
      .reply(200, { count: 1 });

    return shopify.order.count({ status: 'open' })
      .then(data => expect(data).to.equal(1));
  });

  it('closes an order', () => {
    const output = fixtures.res.close;

    scope
      .post('/admin/orders/450789469/close.json')
      .reply(200, output);

    return shopify.order.close(450789469)
      .then(data => expect(data).to.deep.equal(output.order));
  });

  it('re-opens a closed order', () => {
    const output = fixtures.res.open;

    scope
      .post('/admin/orders/450789469/open.json')
      .reply(200, output);

    return shopify.order.open(450789469)
      .then(data => expect(data).to.deep.equal(output.order));
  });

  it('cancels an order (1/2)', () => {
    const output = fixtures.res.cancel;

    scope
      .post('/admin/orders/450789469/cancel.json')
      .reply(200, output);

    return shopify.order.cancel(450789469)
      .then(data => expect(data).to.deep.equal(output.order));
  });

  it('cancels an order (2/2)', () => {
    const input = { reason: 'fraud' };
    const output = fixtures.res.cancel;

    scope
      .post('/admin/orders/450789469/cancel.json', input)
      .reply(200, output);

    return shopify.order.cancel(450789469, input)
      .then(data => expect(data).to.deep.equal(output.order));
  });

  it('creates a new order', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/orders.json', input)
      .reply(201, output);

    return shopify.order.create(input.order)
      .then(data => expect(data).to.deep.equal(output.order));
  });

  it('updates an order', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/orders/450789469.json', input)
      .reply(200, output);

    return shopify.order.update(450789469, input.order)
      .then(data => expect(data).to.deep.equal(output.order));
  });

  it('deletes an order', () => {
    scope
      .delete('/admin/orders/450789469.json')
      .reply(200, {});

    return shopify.order.delete(450789469)
      .then(data => expect(data).to.deep.equal({}));
  });
});

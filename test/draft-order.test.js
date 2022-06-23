describe('Shopify#draftOrder', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/draft-order');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of draft orders (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/draft_orders.json').reply(200, output);

    return shopify.draftOrder
      .list()
      .then((data) => expect(data).to.deep.equal(output.draft_orders));
  });

  it('gets a list of draft orders (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/draft_orders.json?since_id=58379909').reply(200, output);

    return shopify.draftOrder
      .list({ since_id: 58379909 })
      .then((data) => expect(data).to.deep.equal(output.draft_orders));
  });

  it('gets a count of all draft orders', () => {
    const output = { count: 2 };

    scope.get('/admin/draft_orders/count.json').reply(200, output);

    return shopify.draftOrder.count().then((data) => expect(data).to.equal(2));
  });

  it('gets a single draft order by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/draft_orders/59743814.json').reply(200, output);

    return shopify.draftOrder
      .get(59743814)
      .then((data) => expect(data).to.deep.equal(output.draft_order));
  });

  it('gets a single draft order by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/draft_orders/59743814.json?foo=bar').reply(200, output);

    return shopify.draftOrder
      .get(59743814, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.draft_order));
  });

  it('creates a new draft order', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/draft_orders.json', input).reply(201, output);

    return shopify.draftOrder
      .create(input.draft_order)
      .then((data) => expect(data).to.deep.equal(output.draft_order));
  });

  it('updates a draft order', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope.put('/admin/draft_orders/59734918.json', input).reply(200, output);

    return shopify.draftOrder
      .update(59734918, input.draft_order)
      .then((data) => expect(data).to.deep.equal(output.draft_order));
  });

  it('deletes a draft order', () => {
    scope.delete('/admin/draft_orders/59734918.json').reply(200, {});

    return shopify.draftOrder
      .delete(59734918)
      .then((data) => expect(data).to.deep.equal({}));
  });

  it('completes a draft order', () => {
    const output = fixtures.res.complete;

    scope
      .put('/admin/draft_orders/59743814/complete.json?payment_pending=false')
      .reply(200, output);

    return shopify.draftOrder
      .complete(59743814, { payment_pending: false })
      .then((data) => expect(data).to.deep.equal(output.draft_order));
  });

  it('sends an invoice for a draft order', () => {
    const input = fixtures.req.sendInvoice;
    const output = fixtures.res.sendInvoice;

    scope
      .post('/admin/draft_orders/59743814/send_invoice.json', input)
      .reply(201, output);

    return shopify.draftOrder
      .sendInvoice(59743814, input.draft_order_invoice)
      .then((data) => expect(data).to.deep.equal(output.draft_order_invoice));
  });
});

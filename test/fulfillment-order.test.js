describe('Shopify#fulfillmentOrder', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/fulfillment-order');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of fulfillment orders for a specific order', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders/450789469/fulfillment_orders.json')
      .reply(200, output);

    return shopify.fulfillmentOrder
      .list(450789469)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_orders));
  });

  it('gets a single fulfillment order by its ID', () => {
    const output = fixtures.res.get;

    scope.get('/admin/fulfillment_orders/1025578639.json').reply(200, output);

    return shopify.fulfillmentOrder
      .get(1025578639)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('cancels a fulfillment order', () => {
    const input = fixtures.req.cancel;
    const output = fixtures.res.cancel;

    scope
      .post('/admin/fulfillment_orders/1025578640/cancel.json', input)
      .reply(200, output);

    return shopify.fulfillmentOrder
      .cancel(1025578640, input.fulfillment_order)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('marks a fulfillment order as incomplete (1/2)', () => {
    const input = fixtures.req.close;
    const output = fixtures.res.close;

    scope
      .post('/admin/fulfillment_orders/1025578642/close.json', input)
      .reply(200, output);

    return shopify.fulfillmentOrder
      .close(1025578642, 'Not enough inventory to complete this work.')
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('marks a fulfillment order as incomplete (2/2)', () => {
    const output = fixtures.res.close;

    scope
      .post('/admin/fulfillment_orders/1025578642/close.json', {
        fulfillment_order: { message: '' }
      })
      .reply(200, output);

    return shopify.fulfillmentOrder
      .close(1025578642)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('moves a fulfillment order to a new location', () => {
    const input = fixtures.req.move;
    const output = fixtures.res.move;

    scope
      .post('/admin/fulfillment_orders/1025578643/move.json', input)
      .reply(200, output);

    return shopify.fulfillmentOrder.move(1025578643, 905684977).then((data) => {
      expect(data).to.deep.equal(output.original_fulfillment_order);
    });
  });
});

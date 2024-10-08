describe('Shopify#fulfillmentOrder', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/fulfillment-order');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of fulfillment orders on a shop for a specific app', () => {
    const output = fixtures.res.list;

    scope
      .get(
        '/admin/assigned_fulfillment_orders.json' +
          '?assignment_status=cancellation_requested&location_ids[]=48752903'
      )
      .reply(200, output);

    return shopify.fulfillmentOrder
      .list({
        assignment_status: 'cancellation_requested',
        location_ids: ['48752903']
      })
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
    const output = fixtures.res.cancel;

    scope
      .post('/admin/fulfillment_orders/1046000791/cancel.json', {})
      .reply(200, output);

    return shopify.fulfillmentOrder
      .cancel(1046000791)
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

  it('gets a list of locations that a fulfillment order can move to', () => {
    const output = fixtures.res.locationsForMove;

    scope
      .get('/admin/fulfillment_orders/1025578643/locations_for_move.json')
      .reply(200, output);

    return shopify.fulfillmentOrder
      .locationsForMove(1025578643)
      .then((data) => {
        expect(data).to.deep.equal(output.locations_for_move);
      });
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

  it('reschedules the fulfill_at time of a scheduled fulfillment order', () => {
    const input = fixtures.req.setFulfillmentOrdersDeadline;

    scope
      .post(
        '/admin/fulfillment_orders/set_fulfillment_orders_deadline.json',
        input
      )
      .reply(200, {});

    return shopify.fulfillmentOrder
      .setFulfillmentOrdersDeadline(input)
      .then((data) => {
        expect(data).to.deep.equal({});
      });
  });

  it('retrieves fulfillments associated with a fulfillment order', () => {
    const output = fixtures.res.fulfillments;

    scope
      .get('/admin/fulfillment_orders/1046000823/fulfillments.json')
      .reply(200, output);

    return shopify.fulfillmentOrder
      .fulfillments(1046000823)
      .then((data) => expect(data).to.deep.equal(output.fulfillments));
  });

  it('applies a fulfillment hold on an open fulfillment order', () => {
    const input = fixtures.req.hold;
    const output = fixtures.res.hold;

    scope
      .post('/admin/fulfillment_orders/1046000789/hold.json', input)
      .reply(200, output);

    return shopify.fulfillmentOrder
      .hold(1046000789, input.fulfillment_hold)
      .then((data) => {
        expect(data).to.deep.equal(output.fulfillment_order);
      });
  });

  it('releases the fulfillment hold on a fulfillment order', () => {
    const output = fixtures.res.releaseHold;

    scope
      .post('/admin/fulfillment_orders/1046000790/release_hold.json', {})
      .reply(200, output);

    return shopify.fulfillmentOrder.releaseHold(1046000790).then((data) => {
      expect(data).to.deep.equal(output.fulfillment_order);
    });
  });

  it('reschedules the fulfill_at time of a scheduled fulfillment order', () => {
    const input = fixtures.req.reschedule;
    const output = fixtures.res.reschedule;

    scope
      .post('/admin/fulfillment_orders/1046000788/reschedule.json', input)
      .reply(200, output);

    return shopify.fulfillmentOrder
      .reschedule(1046000788, '2025-08-24 10:26 UTC')
      .then((data) => {
        expect(data).to.deep.equal(output.fulfillment_order);
      });
  });
});

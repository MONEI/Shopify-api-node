describe('Shopify#fulfillment-order', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/fulfillment-order');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all fulfillment orders', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/api/2020-01/orders/450789469/fulfillment_orders.json')
      .reply(200, output);

    return shopify.fulfillmentOrder.list(450789469)
      .then(data => expect(data).to.deep.equal(output.fulfillment_orders));
  });


  it('gets a single fulfillment order by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/api/2020-01/fulfillment_orders/450789469.json')
      .reply(200, output);

    return shopify.fulfillmentOrder.get(450789469)
      .then(data => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('cancels a fulfillment order', () => {
    const output = fixtures.res.close;

    scope
      .post('/admin/api/2020-01/fulfillment_orders/450789469/cancel.json')
      .reply(200, output);

    return shopify.fulfillmentOrder.cancel(450789469)
      .then(data => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('closes a fulfillment order', () => {
    const output = fixtures.res.close;

    scope
      .post('/admin/api/2020-01/fulfillment_orders/450789469/close.json')
      .reply(200, output);

    return shopify.fulfillmentOrder.close(450789469)
      .then(data => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('moves a fulfillment order', () => {
    const output = fixtures.res.close;

    scope
      .post('/admin/api/2020-01/fulfillment_orders/450789469/move.json')
      .reply(200, output);

    return shopify.fulfillmentOrder.move(450789469, { new_location_id: 333 })
      .then(data => expect(data).to.deep.equal(output.fulfillment_order));
  });

});

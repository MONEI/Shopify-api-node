describe('Shopify#fulfillment-request', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/fulfillment-request');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('sends a fulfillment request', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post(
        '/admin/fulfillment_orders/1025578619/fulfillment_request.json',
        input
      )
      .reply(200, output);

    return shopify.fulfillmentRequest
      .create(1025578619, input.fulfillment_request)
      .then((data) => {
        expect(data).to.deep.equal(output.original_fulfillment_order);
      });
  });

  it('accepts a fulfillment request (1/2)', () => {
    const output = fixtures.res.accept;

    scope
      .post(
        '/admin/fulfillment_orders/1025578623/fulfillment_request/accept.json',
        {
          fulfillment_request: { message: '' }
        }
      )
      .reply(200, output);

    return shopify.fulfillmentRequest
      .accept(1025578623)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('accepts a fulfillment request (2/2)', () => {
    const message =
      'We will start processing your fulfillment on the next business day.';
    const output = fixtures.res.accept;

    scope
      .post(
        '/admin/fulfillment_orders/1025578623/fulfillment_request/accept.json',
        {
          fulfillment_request: { message }
        }
      )
      .reply(200, output);

    return shopify.fulfillmentRequest
      .accept(1025578623, message)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('rejects a fulfillment request (1/2)', () => {
    const output = fixtures.res.reject;

    scope
      .post(
        '/admin/fulfillment_orders/1025578624/fulfillment_request/reject.json',
        {
          fulfillment_request: { message: '' }
        }
      )
      .reply(200, output);

    return shopify.fulfillmentRequest
      .reject(1025578624)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('rejects a fulfillment request (2/2)', () => {
    const message = 'Not enough inventory on hand to complete the work.';
    const output = fixtures.res.reject;

    scope
      .post(
        '/admin/fulfillment_orders/1025578624/fulfillment_request/reject.json',
        {
          fulfillment_request: { message }
        }
      )
      .reply(200, output);

    return shopify.fulfillmentRequest
      .reject(1025578624, message)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });
});

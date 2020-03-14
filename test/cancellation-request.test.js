describe('Shopify#cancellation-request', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/cancellation-request');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('sends a cancellation request (1/2)', () => {
    const output = fixtures.res.create;

    scope
      .post('/admin/fulfillment_orders/1025578633/cancellation_request.json', {
        cancellation_request: { message: '' }
      })
      .reply(200, output);

    return shopify.cancellationRequest
      .create(1025578633)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('sends a cancellation request (2/2)', () => {
    const message = 'The customer changed his mind.';
    const output = fixtures.res.create;

    scope
      .post('/admin/fulfillment_orders/1025578633/cancellation_request.json', {
        cancellation_request: { message }
      })
      .reply(200, output);

    return shopify.cancellationRequest
      .create(1025578633, message)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('accepts a cancellation request (1/2)', () => {
    const output = fixtures.res.accept;

    scope
      .post(
        '/admin/fulfillment_orders/1025578634/cancellation_request/accept.json',
        {
          cancellation_request: { message: '' }
        }
      )
      .reply(200, output);

    return shopify.cancellationRequest
      .accept(1025578634)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('accepts a cancellation request (2/2)', () => {
    const message = 'We had not started any processing yet.';
    const output = fixtures.res.accept;

    scope
      .post(
        '/admin/fulfillment_orders/1025578634/cancellation_request/accept.json',
        {
          cancellation_request: { message }
        }
      )
      .reply(200, output);

    return shopify.cancellationRequest
      .accept(1025578634, message)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('rejects a cancellation request (1/2)', () => {
    const output = fixtures.res.reject;

    scope
      .post(
        '/admin/fulfillment_orders/1025578635/cancellation_request/reject.json',
        {
          cancellation_request: { message: '' }
        }
      )
      .reply(200, output);

    return shopify.cancellationRequest
      .reject(1025578635)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });

  it('rejects a cancellation request (2/2)', () => {
    const message = 'We have already send the shipment out.';
    const output = fixtures.res.reject;

    scope
      .post(
        '/admin/fulfillment_orders/1025578635/cancellation_request/reject.json',
        {
          cancellation_request: { message }
        }
      )
      .reply(200, output);

    return shopify.cancellationRequest
      .reject(1025578635, message)
      .then((data) => expect(data).to.deep.equal(output.fulfillment_order));
  });
});

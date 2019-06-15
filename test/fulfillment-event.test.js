describe('Shopify#fulfillmentEvent', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/fulfillment-event');
  const common = require('./common');
  const Shopify = require('..');

  const shopify = common.shopify;
  const scope = common.scope;

  const accessToken = common.accessToken;
  const shopName = common.shopName;
  const apiVersion = common.apiVersion;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all fulfillments events for a fulfillment (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders/450789469/fulfillments/255858046/events.json')
      .reply(200, output);

    return shopify.fulfillmentEvent.list(450789469, 255858046)
      .then(data => expect(data).to.deep.equal(output.fulfillment_events));
  });

  it('gets a list of all fulfillments events for a fulfillment (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders/450789469/fulfillments/255858046/events.json?foo=bar')
      .reply(200, output);

    return shopify.fulfillmentEvent.list(450789469, 255858046, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.fulfillment_events));
  });

  it('gets a single fulfillment event by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/fulfillments/255858046/events/3.json')
      .reply(200, output);

    return shopify.fulfillmentEvent.get(450789469, 255858046, 3)
      .then(data => expect(data).to.deep.equal(output.fulfillment_event));
  });

  it('create a fulfillment event', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/orders/450789469/fulfillments/255858046/events.json', input)
      .reply(201, output);

    return shopify.fulfillmentEvent.create(450789469, 255858046, input.event)
      .then(data => expect(data).to.deep.equal(output.fulfillment_event));
  });

  it('updates a fulfillment event', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/orders/450789469/fulfillments/255858046/events/1.json', input)
      .reply(200, output);

    return shopify.fulfillmentEvent.update(450789469, 255858046, 1, input.event)
      .then(data => expect(data).to.deep.equal(output.fulfillment_event));
  });

  it('deletes a fulfillment event', () => {
    scope
      .delete('/admin/orders/450789469/fulfillments/255858046/events/2.json')
      .reply(200, {});

    return shopify.fulfillmentEvent.delete(450789469, 255858046, 2)
      .then(data => expect(data).to.deep.equal({}));
  });

  it('injects the api version to the request path if provided', () => {
    const shopify = new Shopify({ shopName, accessToken, apiVersion });

    scope
      .delete(`/admin/api/${apiVersion}/orders/450789469/fulfillments/255858046/events/2.json`)
      .reply(200, {});

    return shopify.fulfillmentEvent.delete(450789469, 255858046, 2)
      .then(data => expect(data).to.deep.equal({}));
  });
});

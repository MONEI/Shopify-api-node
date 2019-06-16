describe('Shopify#fulfillment', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/fulfillment');
  const common = require('./common');
  const Shopify = require('..');

  const accessToken = common.accessToken;
  const apiVersion = common.apiVersion;
  const scope = common.scope;
  const shopify = common.shopify;
  const shopName = common.shopName;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all fulfillments for an order (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders/450789469/fulfillments.json')
      .reply(200, output);

    return shopify.fulfillment.list(450789469)
      .then(data => expect(data).to.deep.equal(output.fulfillments));
  });

  it('gets a list of all fulfillments for an order (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders/450789469/fulfillments.json?since_id=255858045')
      .reply(200, output);

    return shopify.fulfillment.list(450789469, { since_id: 255858045 })
      .then(data => expect(data).to.deep.equal(output.fulfillments));
  });

  it('gets a count of all fulfillments for an order (1/2)', () => {
    scope
      .get('/admin/orders/450789469/fulfillments/count.json')
      .reply(200, { count: 1 });

    return shopify.fulfillment.count(450789469)
      .then(data => expect(data).to.equal(1));
  });

  it('gets a count of all fulfillments for an order (2/2)', () => {
    scope
      .get('/admin/orders/450789469/fulfillments/count.json?foo=bar')
      .reply(200, { count: 1 });

    return shopify.fulfillment.count(450789469, { foo: 'bar' })
      .then(data => expect(data).to.equal(1));
  });

  it('gets a single fulfillment by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/fulfillments/255858046.json')
      .reply(200, output);

    return shopify.fulfillment.get(450789469, 255858046)
      .then(data => expect(data).to.deep.equal(output.fulfillment));
  });

  it('gets a single fulfillment by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/fulfillments/255858046.json?foo=bar')
      .reply(200, output);

    return shopify.fulfillment.get(450789469, 255858046, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.fulfillment));
  });

  it('create a fulfillment for an order', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/orders/450789469/fulfillments.json', input)
      .reply(201, output);

    return shopify.fulfillment.create(450789469, input.fulfillment)
      .then(data => expect(data).to.deep.equal(output.fulfillment));
  });

  it('updates a fulfillment', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/orders/450789469/fulfillments/255858046.json', input)
      .reply(200, output);

    return shopify.fulfillment.update(450789469, 255858046, input.fulfillment)
      .then(data => expect(data).to.deep.equal(output.fulfillment));
  });

  it('completes a pending fulfillment', () => {
    const output = fixtures.res.complete;

    scope
      .post('/admin/orders/450789469/fulfillments/255858046/complete.json', {})
      .reply(201, output);

    return shopify.fulfillment.complete(450789469, 255858046)
      .then(data => expect(data).to.deep.equal(output.fulfillment));
  });

  it('opens a pending fulfillment', () => {
    const output = fixtures.res.open;

    scope
      .post('/admin/orders/450789469/fulfillments/255858046/open.json', {})
      .reply(201, output);

    return shopify.fulfillment.open(450789469, 255858046)
      .then(data => expect(data).to.deep.equal(output.fulfillment));
  });

  it('cancels a pending fulfillment', () => {
    const output = fixtures.res.cancel;

    scope
      .post('/admin/orders/450789469/fulfillments/255858046/cancel.json', {})
      .reply(201, output);

    return shopify.fulfillment.cancel(450789469, 255858046)
      .then(data => expect(data).to.deep.equal(output.fulfillment));
  });

  it('injects the api version to the request path if provided', () => {
    scope
      .get(`/admin/api/${apiVersion}/orders/450789469/fulfillments/count.json`)
      .reply(200, { count: 1 });

    const shopify = new Shopify({ shopName, accessToken, apiVersion });

    return shopify.fulfillment.count(450789469)
      .then(data => expect(data).to.equal(1));
  });
});

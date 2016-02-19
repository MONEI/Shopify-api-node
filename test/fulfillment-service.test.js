describe('Shopify#fulfillmentService', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/fulfillment-service');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all fulfillment services', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/fulfillment_services.json?scope=all')
      .reply(200, output);

    return shopify.fulfillmentService.list({ scope: 'all' })
      .then(data => expect(data).to.deep.equal(output.fulfillment_services));
  });

  it('creates a new fulfillment service', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/fulfillment_services.json', input)
      .reply(201, output);

    return shopify.fulfillmentService.create(input.fulfillment_service)
      .then(data => expect(data).to.deep.equal(output.fulfillment_service));
  });

  it('gets a single fulfillment service by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/fulfillment_services/755357713.json')
      .reply(200, output);

    return shopify.fulfillmentService.get(755357713)
      .then(data => expect(data).to.deep.equal(output.fulfillment_service));
  });

  it('updates a fulfillment service', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/fulfillment_services/755357713.json', input)
      .reply(200, output);

    return shopify.fulfillmentService.update(755357713, input.fulfillment_service)
      .then(data => expect(data).to.deep.equal(output.fulfillment_service));
  });

  it('deletes a fulfillment service', () => {
    scope
      .delete('/admin/fulfillment_services/755357713.json')
      .reply(200, {});

    return shopify.fulfillmentService.delete(755357713)
      .then(data => expect(data).to.deep.equal({}));
  });
});

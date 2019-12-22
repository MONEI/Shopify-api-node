describe('Shopify#carrierService', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/carrier-service');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates a carrier service', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/carrier_services.json', input).reply(201, output);

    return shopify.carrierService
      .create(input.carrier_service)
      .then((data) => expect(data).to.deep.equal(output.carrier_service));
  });

  it('updates a carrier service', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/carrier_services/962683579.json', input)
      .reply(200, output);

    return shopify.carrierService
      .update(962683579, input.carrier_service)
      .then((data) => expect(data).to.deep.equal(output.carrier_service));
  });

  it('gets a list of all carrier services', () => {
    const output = fixtures.res.list;

    scope.get('/admin/carrier_services.json').reply(200, output);

    return shopify.carrierService
      .list()
      .then((data) => expect(data).to.deep.equal(output.carrier_services));
  });

  it('gets a single carrier service by its ID', () => {
    const output = fixtures.res.get;

    scope.get('/admin/carrier_services/962683576.json').reply(200, output);

    return shopify.carrierService
      .get(962683576)
      .then((data) => expect(data).to.deep.equal(output.carrier_service));
  });

  it('deletes a carrier service', () => {
    scope.delete('/admin/carrier_services/962683575.json').reply(200, {});

    return shopify.carrierService
      .delete(962683575)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

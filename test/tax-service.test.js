describe('Shopify#taxService', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/tax-service');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates a new tax service', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/tax_services.json', input)
      .reply(201, output);

    return shopify.taxService.create(input.tax_service)
      .then(data => expect(data).to.deep.equal(output.tax_service));
  });

  it('updates a tax service', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/tax_services/760126902.json', input)
      .reply(200, output);

    return shopify.taxService.update(760126902, input.tax_service)
      .then(data => expect(data).to.deep.equal(output.tax_service));
  });

  it('gets a list of all tax services', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/tax_services.json')
      .reply(200, output);

    return shopify.taxService.list()
      .then(data => expect(data).to.deep.equal(output.tax_services));
  });

  it('gets a single tax service by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/tax_services/760126902.json')
      .reply(200, output);

    return shopify.taxService.get(760126902)
      .then(data => expect(data).to.deep.equal(output.tax_service));
  });

  it('deletes a tax service', () => {
    scope
      .delete('/admin/tax_services/760126902.json')
      .reply(200, {});

    return shopify.taxService.delete(760126902)
      .then(data => expect(data).to.deep.equal({}));
  });
});

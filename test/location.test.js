describe('Shopify#location', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/location');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all locations', () => {
    const output = fixtures.res.list;

    scope.get('/admin/locations.json').reply(200, output);

    return shopify.location
      .list()
      .then((data) => expect(data).to.deep.equal(output.locations));
  });

  it('gets a single location by its ID', () => {
    const output = fixtures.res.get;

    scope.get('/admin/locations/487838322.json').reply(200, output);

    return shopify.location
      .get(487838322)
      .then((data) => expect(data).to.deep.equal(output.location));
  });

  it('gets a count of locations', () => {
    const output = { count: 4 };

    scope.get('/admin/locations/count.json').reply(200, output);

    return shopify.location.count().then((data) => expect(data).to.equal(4));
  });

  it('gets a list of inventory levels for a location (1/2)', () => {
    const output = fixtures.res.inventoryLevels;

    scope
      .get('/admin/locations/487838322/inventory_levels.json')
      .reply(200, output);

    return shopify.location
      .inventoryLevels(487838322)
      .then((data) => expect(data).to.deep.equal(output.inventory_levels));
  });

  it('gets a list of inventory levels for a location (2/2)', () => {
    const output = fixtures.res.inventoryLevels;

    scope
      .get('/admin/locations/487838322/inventory_levels.json?limit=50')
      .reply(200, output);

    return shopify.location
      .inventoryLevels(487838322, { limit: 50 })
      .then((data) => expect(data).to.deep.equal(output.inventory_levels));
  });
});

describe('Shopify#location', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/location');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all locations', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/locations.json')
      .reply(200, output);

    return shopify.location.list()
      .then(data => expect(data).to.deep.equal(output.locations));
  });

  it('gets a single location by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/locations/487838322.json')
      .reply(200, output);

    return shopify.location.get(487838322)
      .then(data => expect(data).to.deep.equal(output.location));
  });
});

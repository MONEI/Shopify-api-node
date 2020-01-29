describe('Shopify#collectionListing', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/collection-listing');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets collection listings published to an application (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/collection_listings.json').reply(200, output);

    return shopify.collectionListing
      .list()
      .then((data) => expect(data).to.deep.equal(output.collection_listings));
  });

  it('gets collection listings published to an application (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/collection_listings.json?page=1').reply(200, output);

    return shopify.collectionListing
      .list({ page: 1 })
      .then((data) => expect(data).to.deep.equal(output.collection_listings));
  });

  it('gets product IDs published to a collection (1/2)', () => {
    const output = fixtures.res.productIds;

    scope
      .get('/admin/collection_listings/841564295/product_ids.json')
      .reply(200, output);

    return shopify.collectionListing
      .productIds(841564295)
      .then((data) => expect(data).to.deep.equal(output.product_ids));
  });

  it('gets product IDs published to a collection (2/2)', () => {
    const output = fixtures.res.productIds;

    scope
      .get('/admin/collection_listings/841564295/product_ids.json?limit=50')
      .reply(200, output);

    return shopify.collectionListing
      .productIds(841564295, { limit: 50 })
      .then((data) => expect(data).to.deep.equal(output.product_ids));
  });

  it('gets a collection listing by its ID', () => {
    const output = fixtures.res.get;

    scope.get('/admin/collection_listings/482865238.json').reply(200, output);

    return shopify.collectionListing
      .get(482865238)
      .then((data) => expect(data).to.deep.equal(output.collection_listing));
  });
});

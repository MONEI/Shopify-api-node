describe('Shopify#productListing', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/product-listing');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets product listings published to an application (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/applications/1337/product_listings.json')
      .reply(200, output);

    return shopify.productListing.list(1337)
      .then(data => expect(data).to.deep.equal(output.product_listings));
  });

  it('gets product listings published to an application (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/applications/1337/product_listings.json?page=1')
      .reply(200, output);

    return shopify.productListing.list(1337, { page: 1 })
      .then(data => expect(data).to.deep.equal(output.product_listings));
  });

  it('gets product IDs published to an application (1/2)', () => {
    const output = fixtures.res.productIds;

    scope
      .get('/admin/applications/1337/product_listings/product_ids.json')
      .reply(200, output);

    return shopify.productListing.productIds(1337)
      .then(data => expect(data).to.deep.equal(output.product_ids));
  });

  it('gets product IDs published to an application (2/2)', () => {
    const output = fixtures.res.productIds;

    scope
      .get('/admin/applications/1337/product_listings/product_ids.json?page=1')
      .reply(200, output);

    return shopify.productListing.productIds(1337, { page: 1 })
      .then(data => expect(data).to.deep.equal(output.product_ids));
  });

  it('gets a count of products published to an application', () => {
    scope
      .get('/admin/applications/1337/product_listings/count.json')
      .reply(200, { count: 2 });

    return shopify.productListing.count(1337)
      .then(data => expect(data).to.equal(2));
  });

  it('gets a product listing by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/applications/1337/product_listings/921728736.json')
      .reply(200, output);

    return shopify.productListing.get(1337, 921728736)
      .then(data => expect(data).to.deep.equal(output.product_listing));
  });
});

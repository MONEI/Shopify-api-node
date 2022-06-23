describe('Shopify#productListing', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/product-listing');
  const common = require('./common');

  const shopify = common.shopify;
  const shopifyWithPresenmentOption = common.shopifyWithPresentmentOption;
  const standardScope = common.scope;
  const presentmentApiScope = common.presentmentApiScope;

  afterEach(() => {
    expect(presentmentApiScope.pendingMocks()).to.deep.equal([]);
    expect(standardScope.pendingMocks()).to.deep.equal([]);
  });

  it('gets product listings published to an application (1/4)', () => {
    const output = fixtures.res.list;

    standardScope.get('/admin/product_listings.json').reply(200, output);

    return shopify.productListing
      .list()
      .then((data) => expect(data).to.deep.equal(output.product_listings));
  });

  it('gets product listings published to an application (2/4)', () => {
    const output = fixtures.res.list;

    standardScope.get('/admin/product_listings.json?page=1').reply(200, output);

    return shopify.productListing
      .list({ page: 1 })
      .then((data) => expect(data).to.deep.equal(output.product_listings));
  });

  it('gets product listings published to an application (3/4)', () => {
    const output = fixtures.res.list;

    presentmentApiScope.get('/admin/product_listings.json').reply(200, output);

    return shopifyWithPresenmentOption.productListing
      .list()
      .then((data) => expect(data).to.deep.equal(output.product_listings));
  });

  it('gets product listings published to an application (4/4)', () => {
    const output = fixtures.res.list;

    presentmentApiScope
      .get('/admin/product_listings.json?page=1')
      .reply(200, output);

    return shopifyWithPresenmentOption.productListing
      .list({ page: 1 })
      .then((data) => expect(data).to.deep.equal(output.product_listings));
  });

  it('gets product IDs published to an application (1/2)', () => {
    const output = fixtures.res.productIds;

    standardScope
      .get('/admin/product_listings/product_ids.json')
      .reply(200, output);

    return shopify.productListing
      .productIds()
      .then((data) => expect(data).to.deep.equal(output.product_ids));
  });

  it('gets product IDs published to an application (2/2)', () => {
    const output = fixtures.res.productIds;

    standardScope
      .get('/admin/product_listings/product_ids.json?page=1')
      .reply(200, output);

    return shopify.productListing
      .productIds({ page: 1 })
      .then((data) => expect(data).to.deep.equal(output.product_ids));
  });

  it('gets a count of products published to an application', () => {
    standardScope
      .get('/admin/product_listings/count.json')
      .reply(200, { count: 2 });

    return shopify.productListing
      .count()
      .then((data) => expect(data).to.equal(2));
  });

  it('gets a specific product listing', () => {
    const output = fixtures.res.get;

    standardScope
      .get('/admin/product_listings/921728736.json')
      .reply(200, output);

    return shopify.productListing
      .get(921728736)
      .then((data) => expect(data).to.deep.equal(output.product_listing));
  });

  it('gets a specific product listing with presentment option', () => {
    const output = fixtures.res.get;

    presentmentApiScope
      .get('/admin/product_listings/921728736.json')
      .reply(200, output);

    return shopifyWithPresenmentOption.productListing
      .get(921728736)
      .then((data) => expect(data).to.deep.equal(output.product_listing));
  });

  it('creates a product listing (1/4)', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    standardScope
      .put('/admin/product_listings/921728736.json', input)
      .reply(200, output);

    return shopify.productListing
      .create(921728736)
      .then((data) => expect(data).to.deep.equal(output.product_listing));
  });

  it('creates a product listing (2/4)', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    standardScope
      .put('/admin/product_listings/921728736.json', input)
      .reply(200, output);

    return shopify.productListing
      .create(921728736, input.product_listing)
      .then((data) => expect(data).to.deep.equal(output.product_listing));
  });

  it('creates a product listing (3/4)', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    presentmentApiScope
      .put('/admin/product_listings/921728736.json', input)
      .reply(200, output);

    return shopifyWithPresenmentOption.productListing
      .create(921728736)
      .then((data) => expect(data).to.deep.equal(output.product_listing));
  });

  it('creates a product listing (4/4)', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    presentmentApiScope
      .put('/admin/product_listings/921728736.json', input)
      .reply(200, output);

    return shopifyWithPresenmentOption.productListing
      .create(921728736, input.product_listing)
      .then((data) => expect(data).to.deep.equal(output.product_listing));
  });

  it('deletes a product listing', () => {
    standardScope.delete('/admin/product_listings/921728736.json').reply(200);

    return shopify.productListing
      .delete(921728736)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

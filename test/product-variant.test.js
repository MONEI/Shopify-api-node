describe('Shopify#productVariant', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/product-variant');
  const common = require('./common');

  const shopify = common.shopify;
  const shopifyWithPresenmentOption = common.shopifyWithPresentmentOption;
  const standardScope = common.scope;
  const presentmentApiScope = common.presentmentApiScope;

  afterEach(() => {
    expect(presentmentApiScope.isDone()).to.be.true;
    expect(standardScope.isDone()).to.be.true;
  });

  it('gets a list of all product variants for a product (1/4)', () => {
    const output = fixtures.res.list;

    standardScope
      .get('/admin/products/632910392/variants.json')
      .reply(200, output);

    return shopify.productVariant
      .list(632910392)
      .then((data) => expect(data).to.deep.equal(output.variants));
  });

  it('gets a list of all product variants for a product (2/4)', () => {
    const output = fixtures.res.list;

    standardScope
      .get('/admin/products/632910392/variants.json?since_id=39072855')
      .reply(200, output);

    return shopify.productVariant
      .list(632910392, { since_id: 39072855 })
      .then((data) => expect(data).to.deep.equal(output.variants));
  });

  it('gets a list of all product variants for a product (3/4)', () => {
    const output = fixtures.res.list;

    presentmentApiScope
      .get('/admin/products/632910392/variants.json')
      .reply(200, output);

    return shopifyWithPresenmentOption.productVariant
      .list(632910392)
      .then((data) => expect(data).to.deep.equal(output.variants));
  });

  it('gets a list of all product variants for a product (4/4)', () => {
    const output = fixtures.res.list;

    presentmentApiScope
      .get('/admin/products/632910392/variants.json?since_id=39072855')
      .reply(200, output);

    return shopifyWithPresenmentOption.productVariant
      .list(632910392, { since_id: 39072855 })
      .then((data) => expect(data).to.deep.equal(output.variants));
  });

  it('gets a count of all product variants', () => {
    standardScope
      .get('/admin/products/632910392/variants/count.json')
      .reply(200, { count: 4 });

    return shopify.productVariant
      .count(632910392)
      .then((data) => expect(data).to.equal(4));
  });

  it('gets a single product variant by its ID (1/4)', () => {
    const output = fixtures.res.get;

    standardScope.get('/admin/variants/808950810.json').reply(200, output);

    return shopify.productVariant
      .get(808950810)
      .then((data) => expect(data).to.deep.equal(output.variant));
  });

  it('gets a single product variant by its ID (2/4)', () => {
    const output = fixtures.res.get;

    standardScope
      .get('/admin/variants/808950810.json?foo=bar')
      .reply(200, output);

    return shopify.productVariant
      .get(808950810, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.variant));
  });

  it('gets a single product variant by its ID (3/4)', () => {
    const output = fixtures.res.get;

    presentmentApiScope
      .get('/admin/variants/808950810.json')
      .reply(200, output);

    return shopifyWithPresenmentOption.productVariant
      .get(808950810)
      .then((data) => expect(data).to.deep.equal(output.variant));
  });

  it('gets a single product variant by its ID (4/4)', () => {
    const output = fixtures.res.get;

    presentmentApiScope
      .get('/admin/variants/808950810.json?foo=bar')
      .reply(200, output);

    return shopifyWithPresenmentOption.productVariant
      .get(808950810, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.variant));
  });

  it('creates a new product variant', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    standardScope
      .post('/admin/products/632910392/variants.json', input)
      .reply(201, output);

    return shopify.productVariant
      .create(632910392, input.variant)
      .then((data) => expect(data).to.deep.equal(output.variant));
  });

  it('creates a new product variant with presentment option', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    presentmentApiScope
      .post('/admin/products/632910392/variants.json', input)
      .reply(201, output);

    return shopifyWithPresenmentOption.productVariant
      .create(632910392, input.variant)
      .then((data) => expect(data).to.deep.equal(output.variant));
  });

  it('updates a product variant', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    standardScope
      .put('/admin/variants/808950810.json', input)
      .reply(200, output);

    return shopify.productVariant
      .update(808950810, input.variant)
      .then((data) => expect(data).to.deep.equal(output.variant));
  });

  it('updates a product variant with presentment option', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    presentmentApiScope
      .put('/admin/variants/808950810.json', input)
      .reply(200, output);

    return shopifyWithPresenmentOption.productVariant
      .update(808950810, input.variant)
      .then((data) => expect(data).to.deep.equal(output.variant));
  });

  it('deletes a product variant', () => {
    standardScope
      .delete('/admin/products/632910392/variants/808950810.json')
      .reply(200, {});

    return shopify.productVariant
      .delete(632910392, 808950810)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

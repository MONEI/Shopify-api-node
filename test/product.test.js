describe('Shopify#product', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/product');
  const common = require('./common');

  const shopify = common.shopify;
  const standardScope = common.scope;
  const productApiScope = common.productApiScope;

  afterEach(() => expect(standardScope.isDone()).to.be.true);

  it('gets a list of all products (1/2)', () => {
    const output = fixtures.res.list;

    productApiScope
      .get('/admin/products.json')
      .reply(200, output);

    return shopify.product.list()
      .then(data => expect(data).to.deep.equal(output.products));
  });

  it('gets a list of all products (2/2)', () => {
    const output = fixtures.res.list;

    productApiScope
      .get('/admin/products.json?published_status=any')
      .reply(200, output);

    return shopify.product.list({ published_status: 'any' })
      .then(data => expect(data).to.deep.equal(output.products));
  });

  it('gets a count of all products (1/2)', () => {
    standardScope
      .get('/admin/products/count.json')
      .reply(200, { count: 2 });

    return shopify.product.count()
      .then(data => expect(data).to.equal(2));
  });

  it('gets a count of all products (2/2)', () => {
    standardScope
      .get('/admin/products/count.json?published_status=any')
      .reply(200, { count: 2 });

    return shopify.product.count({ published_status: 'any' })
      .then(data => expect(data).to.equal(2));
  });

  it('gets a single product by its ID (1/2)', () => {
    const output = fixtures.res.get;

    productApiScope
      .get('/admin/products/632910392.json')
      .reply(200, output);

    return shopify.product.get(632910392)
      .then(data => expect(data).to.deep.equal(output.product));
  });

  it('gets a single product by its ID (2/2)', () => {
    const output = fixtures.res.get;

    productApiScope
      .get('/admin/products/632910392.json?foo=bar')
      .reply(200, output);

    return shopify.product.get(632910392, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.product));
  });

  it('creates a new product', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    standardScope
      .post('/admin/products.json', input)
      .reply(201, output);

    return shopify.product.create(input.product)
      .then(data => expect(data).to.deep.equal(output.product));
  });

  it('updates a product', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    standardScope
      .put('/admin/products/632910392.json', input)
      .reply(200, output);

    return shopify.product.update(632910392, input.product)
      .then(data => expect(data).to.deep.equal(output.product));
  });

  it('deletes a product', () => {
    standardScope
      .delete('/admin/products/632910392.json')
      .reply(200, {});

    return shopify.product.delete(632910392)
      .then(data => expect(data).to.deep.equal({}));
  });
});

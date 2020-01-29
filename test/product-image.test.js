describe('Shopify#productImage', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/product-image');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all product images for a product (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/products/632910392/images.json').reply(200, output);

    return shopify.productImage
      .list(632910392)
      .then((data) => expect(data).to.deep.equal(output.images));
  });

  it('gets a list of all product images for a product (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/products/632910392/images.json?since_id=562641782')
      .reply(200, output);

    return shopify.productImage
      .list(632910392, { since_id: 562641782 })
      .then((data) => expect(data).to.deep.equal(output.images));
  });

  it('gets a count of all product images (1/2)', () => {
    scope
      .get('/admin/products/632910392/images/count.json')
      .reply(200, { count: 2 });

    return shopify.productImage
      .count(632910392)
      .then((data) => expect(data).to.equal(2));
  });

  it('gets a count of all product images (2/2)', () => {
    scope
      .get('/admin/products/632910392/images/count.json?since_id=562641782')
      .reply(200, { count: 2 });

    return shopify.productImage
      .count(632910392, { since_id: 562641782 })
      .then((data) => expect(data).to.equal(2));
  });

  it('gets a single product image by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/products/632910392/images/850703190.json')
      .reply(200, output);

    return shopify.productImage
      .get(632910392, 850703190)
      .then((data) => expect(data).to.deep.equal(output.image));
  });

  it('gets a single product image by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/products/632910392/images/850703190.json?foo=bar')
      .reply(200, output);

    return shopify.productImage
      .get(632910392, 850703190, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.image));
  });

  it('creates a new product image', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/products/632910392/images.json', input)
      .reply(201, output);

    return shopify.productImage
      .create(632910392, input.image)
      .then((data) => expect(data).to.deep.equal(output.image));
  });

  it('updates a product image', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/products/632910392/images/850703190.json', input)
      .reply(200, output);

    return shopify.productImage
      .update(632910392, 850703190, input.image)
      .then((data) => expect(data).to.deep.equal(output.image));
  });

  it('deletes a product image', () => {
    scope
      .delete('/admin/products/632910392/images/850703190.json')
      .reply(200, {});

    return shopify.productImage
      .delete(632910392, 850703190)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

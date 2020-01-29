describe('Shopify#collection', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/collection');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a collection by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/collections/841564295.json').reply(200, output);

    return shopify.collection
      .get(841564295)
      .then((data) => expect(data).to.deep.equal(output.collection));
  });

  it('gets a collection by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/collections/841564295.json?foo=bar').reply(200, output);

    return shopify.collection
      .get(841564295, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.collection));
  });

  it('gets a list of products belonging to a collection (1/2)', () => {
    const output = fixtures.res.products;

    scope.get('/admin/collections/841564295/products.json').reply(200, output);

    return shopify.collection
      .products(841564295)
      .then((data) => expect(data).to.deep.equal(output.products));
  });

  it('gets a list of products belonging to a collection (2/2)', () => {
    const output = fixtures.res.products;

    scope
      .get('/admin/collections/841564295/products.json?limit=50')
      .reply(200, output);

    return shopify.collection
      .products(841564295, { limit: 50 })
      .then((data) => expect(data).to.deep.equal(output.products));
  });
});

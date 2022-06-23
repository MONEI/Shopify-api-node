describe('Shopify#collect', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/collect');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('adds a product to collection', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/collects.json', input).reply(201, output);

    return shopify.collect
      .create(input.collect)
      .then((data) => expect(data).to.deep.equal(output.collect));
  });

  it('removes a product from a collection', () => {
    scope.delete('/admin/collects/841564295.json').reply(200, {});

    return shopify.collect
      .delete(841564295)
      .then((data) => expect(data).to.deep.equal({}));
  });

  it('gets a list of all collects (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/collects.json').reply(200, output);

    return shopify.collect
      .list()
      .then((data) => expect(data).to.deep.equal(output.collects));
  });

  it('gets a list of all collects (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/collects.json?page=1').reply(200, output);

    return shopify.collect
      .list({ page: 1 })
      .then((data) => expect(data).to.deep.equal(output.collects));
  });

  it('gets a count of all collects (1/2)', () => {
    scope.get('/admin/collects/count.json').reply(200, { count: 2 });

    return shopify.collect.count().then((data) => expect(data).to.equal(2));
  });

  it('gets a count of all collects (2/2)', () => {
    scope
      .get('/admin/collects/count.json?product_id=632910392')
      .reply(200, { count: 2 });

    return shopify.collect
      .count({ product_id: 632910392 })
      .then((data) => expect(data).to.equal(2));
  });

  it('gets a single collect by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/collects/841564295.json').reply(200, output);

    return shopify.collect
      .get(841564295)
      .then((data) => expect(data).to.deep.equal(output.collect));
  });

  it('gets a single collect by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/collects/841564295.json?foo=bar').reply(200, output);

    return shopify.collect
      .get(841564295, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.collect));
  });
});

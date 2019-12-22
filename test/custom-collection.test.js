describe('Shopify#customCollection', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/custom-collection');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all custom collections (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/custom_collections.json').reply(200, output);

    return shopify.customCollection
      .list()
      .then((data) => expect(data).to.deep.equal(output.custom_collections));
  });

  it('gets a list of all custom collections (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/custom_collections.json?since_id=395646239')
      .reply(200, output);

    return shopify.customCollection
      .list({ since_id: 395646239 })
      .then((data) => expect(data).to.deep.equal(output.custom_collections));
  });

  it('gets a count of all custom collections (1/2)', () => {
    scope.get('/admin/custom_collections/count.json').reply(200, { count: 3 });

    return shopify.customCollection
      .count()
      .then((data) => expect(data).to.equal(3));
  });

  it('gets a count of all custom collections (2/2)', () => {
    scope
      .get('/admin/custom_collections/count.json?product_id=632910392')
      .reply(200, { count: 2 });

    return shopify.customCollection
      .count({ product_id: 632910392 })
      .then((data) => expect(data).to.equal(2));
  });

  it('gets a single custom collection by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/custom_collections/841564295.json').reply(200, output);

    return shopify.customCollection
      .get(841564295)
      .then((data) => expect(data).to.deep.equal(output.custom_collection));
  });

  it('gets a single custom collection by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/custom_collections/841564295.json?foo=bar')
      .reply(200, output);

    return shopify.customCollection
      .get(841564295, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.custom_collection));
  });

  it('creates a new custom collection', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/custom_collections.json', input).reply(201, output);

    return shopify.customCollection
      .create(input.custom_collection)
      .then((data) => expect(data).to.deep.equal(output.custom_collection));
  });

  it('updates a custom collection', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/custom_collections/841564295.json', input)
      .reply(200, output);

    return shopify.customCollection
      .update(841564295, input.custom_collection)
      .then((data) => expect(data).to.deep.equal(output.custom_collection));
  });

  it('deletes a custom collection', () => {
    scope.delete('/admin/custom_collections/841564295.json').reply(200, {});

    return shopify.customCollection
      .delete(841564295)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

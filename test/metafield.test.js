describe('Shopify#metafield', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/metafield');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of metafields that belong to a store (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/metafields.json')
      .reply(200, output);

    return shopify.metafield.list()
      .then(data => expect(data).to.deep.equal(output.metafields));
  });

  it('gets a list of metafields that belong to a store (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/metafields.json?since_id=721389481')
      .reply(200, output);

    return shopify.metafield.list({ since_id: 721389481 })
      .then(data => expect(data).to.deep.equal(output.metafields));
  });

  it('gets a count of metafields that belong to a store (1/2)', () => {
    scope
      .get('/admin/metafields/count.json')
      .reply(200, { count: 1 });

    return shopify.metafield.count()
      .then(data => expect(data).to.equal(1));
  });

  it('gets a count of metafields that belong to a store (2/2)', () => {
    scope
      .get('/admin/metafields/count.json?foo=bar')
      .reply(200, { count: 1 });

    return shopify.metafield.count({ foo: 'bar' })
      .then(data => expect(data).to.equal(1));
  });

  it('gets a single metafield by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/metafields/721389482.json')
      .reply(200, output);

    return shopify.metafield.get(721389482)
      .then(data => expect(data).to.deep.equal(output.metafield));
  });

  it('gets a single metafield by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/metafields/721389482.json?foo=bar')
      .reply(200, output);

    return shopify.metafield.get(721389482, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.metafield));
  });

  it('creates a new metafield for a store', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/metafields.json', input)
      .reply(201, output);

    return shopify.metafield.create(input.metafield)
      .then(data => expect(data).to.deep.equal(output.metafield));
  });

  it('updates a metafield', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/metafields/721389482.json', input)
      .reply(200, output);

    return shopify.metafield.update(721389482, input.metafield)
      .then(data => expect(data).to.deep.equal(output.metafield));
  });

  it('deletes a metafield', () => {
    scope
      .delete('/admin/metafields/721389482.json')
      .reply(200, {});

    return shopify.metafield.delete(721389482)
      .then(data => expect(data).to.deep.equal({}));
  });
});

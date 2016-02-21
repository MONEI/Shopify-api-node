describe('Shopify#smartCollection', () => {
  'use strict';

  const expect = require('chai').expect;
  const qs = require('qs');

  const fixtures = require('./fixtures/smart-collection');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all smart collections (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/smart_collections.json')
      .reply(200, output);

    return shopify.smartCollection.list()
      .then(data => expect(data).to.deep.equal(output.smart_collections));
  });

  it('gets a list of all smart collections (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/smart_collections.json?since_id=482865238')
      .reply(200, output);

    return shopify.smartCollection.list({ since_id: 482865238 })
      .then(data => expect(data).to.deep.equal(output.smart_collections));
  });

  it('gets a count of all smart collections (1/2)', () => {
    scope
      .get('/admin/smart_collections/count.json')
      .reply(200, { count: 1 });

    return shopify.smartCollection.count()
      .then(data => expect(data).to.equal(1));
  });

  it('gets a count of all smart collections (2/2)', () => {
    scope
      .get('/admin/smart_collections/count.json?published_status=any')
      .reply(200, { count: 1 });

    return shopify.smartCollection.count({ published_status: 'any' })
      .then(data => expect(data).to.equal(1));
  });

  it('gets a single smart collection by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/smart_collections/482865238.json')
      .reply(200, output);

    return shopify.smartCollection.get(482865238)
      .then(data => expect(data).to.deep.equal(output.smart_collection));
  });

  it('gets a single smart collection by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/smart_collections/482865238.json?foo=bar')
      .reply(200, output);

    return shopify.smartCollection.get( 482865238, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.smart_collection));
  });

  it('creates a new smart collection', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/smart_collections.json', input)
      .reply(201, output);

    return shopify.smartCollection.create(input.smart_collection)
      .then(data => expect(data).to.deep.equal(output.smart_collection));
  });

  it('updates a smart collection', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/smart_collections/482865238.json', input)
      .reply(200, output);

    return shopify.smartCollection.update(482865238, input.smart_collection)
      .then(data => expect(data).to.deep.equal(output.smart_collection));
  });

  it('sets the ordering type of products in a smart collection (1/2)', () => {
    const query = { sort_order: 'alpha-desc' };
    const search = '?' + qs.stringify(query);

    scope
      .put('/admin/smart_collections/482865238/order.json' + search, {})
      .reply(200, {});

    return shopify.smartCollection.order(482865238, query)
      .then(data => expect(data).to.deep.equal({}));
  });

  it('sets the ordering type of products in a smart collection (2/2)', () => {
    const query = { products: [ 921728736, 632910392 ] };
    const search = '?' + qs.stringify(query, { arrayFormat: 'brackets' });

    scope
      .put('/admin/smart_collections/482865238/order.json' + search, {})
      .reply(200, {});

    return shopify.smartCollection.order(482865238, query)
      .then(data => expect(data).to.deep.equal({}));
  });

  it('deletes a smart collection', () => {
    scope
      .delete('/admin/smart_collections/482865238.json')
      .reply(200, {});

    return shopify.smartCollection.delete(482865238)
      .then(data => expect(data).to.deep.equal({}));
  });
});

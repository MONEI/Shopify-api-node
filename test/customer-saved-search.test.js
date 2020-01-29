describe('Shopify#customerSavedSearch', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/customer-saved-search');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all customers saved searches (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/customer_saved_searches.json').reply(200, output);

    return shopify.customerSavedSearch
      .list()
      .then((data) =>
        expect(data).to.deep.equal(output.customer_saved_searches)
      );
  });

  it('gets a list of all customers saved searches (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/customer_saved_searches.json?since_id=20610972')
      .reply(200, output);

    return shopify.customerSavedSearch
      .list({ since_id: 20610972 })
      .then((data) =>
        expect(data).to.deep.equal(output.customer_saved_searches)
      );
  });

  it('gets a count of all customer saved searches (1/2)', () => {
    scope
      .get('/admin/customer_saved_searches/count.json')
      .reply(200, { count: 3 });

    return shopify.customerSavedSearch
      .count()
      .then((data) => expect(data).to.equal(3));
  });

  it('gets a count of all customer saved searches (2/2)', () => {
    scope
      .get('/admin/customer_saved_searches/count.json?since_id=20610973')
      .reply(200, { count: 2 });

    return shopify.customerSavedSearch
      .count({ since_id: 20610973 })
      .then((data) => expect(data).to.equal(2));
  });

  it('gets a single customer saved search by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/customer_saved_searches/789629109.json')
      .reply(200, output);

    return shopify.customerSavedSearch
      .get(789629109)
      .then((data) => expect(data).to.deep.equal(output.customer_saved_search));
  });

  it('gets a single customer saved search by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/customer_saved_searches/789629109.json?foo=bar')
      .reply(200, output);

    return shopify.customerSavedSearch
      .get(789629109, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.customer_saved_search));
  });

  it('gets all customers who match the criteria of a customer saved search (1/2)', () => {
    const output = fixtures.res.customers;

    scope
      .get('/admin/customer_saved_searches/789629109/customers.json')
      .reply(200, output);

    return shopify.customerSavedSearch
      .customers(789629109)
      .then((data) => expect(data).to.deep.equal(output.customers));
  });

  it('gets all customers who match the criteria of a customer saved search (2/2)', () => {
    const output = fixtures.res.customers;

    scope
      .get('/admin/customer_saved_searches/789629109/customers.json?page=1')
      .reply(200, output);

    return shopify.customerSavedSearch
      .customers(789629109, { page: 1 })
      .then((data) => expect(data).to.deep.equal(output.customers));
  });

  it('creates a new customer saved search', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/customer_saved_searches.json', input).reply(201, output);

    return shopify.customerSavedSearch
      .create(input.customer_saved_search)
      .then((data) => expect(data).to.deep.equal(output.customer_saved_search));
  });

  it('updates a customer saved search', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/customer_saved_searches/789629109.json', input)
      .reply(200, output);

    return shopify.customerSavedSearch
      .update(789629109, input.customer_saved_search)
      .then((data) => expect(data).to.deep.equal(output.customer_saved_search));
  });

  it('deletes a customer saved search', () => {
    scope
      .delete('/admin/customer_saved_searches/789629109.json')
      .reply(200, {});

    return shopify.customerSavedSearch
      .delete(789629109)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

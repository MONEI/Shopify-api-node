describe('Shopify#customer', () => {
  'use strict';

  const expect = require('chai').expect;
  const qs = require('qs');

  const fixtures = require('./fixtures/customer');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all customers (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/customers.json')
      .reply(200, output);

    return shopify.customer.list()
      .then(data => expect(data).to.deep.equal(output.customers));
  });

  it('gets a list of all customers (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/customers.json?since_id=207119550')
      .reply(200, output);

    return shopify.customer.list({ since_id: 207119550 })
      .then(data => expect(data).to.deep.equal(output.customers));
  });

  it('gets a list of customers matching a given query', () => {
    const params = { query: 'Bob country:United States' };
    const output = fixtures.res.search;

    scope
      .get('/admin/customers/search.json?' + qs.stringify(params))
      .reply(200, output);

    return shopify.customer.search(params)
      .then(data => expect(data).to.deep.equal(output.customers));
  });

  it('gets a single customer by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/customers/207119551.json')
      .reply(200, output);

    return shopify.customer.get(207119551)
      .then(data => expect(data).to.deep.equal(output.customer));
  });

  it('gets a single customer by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/customers/207119551.json?foo=bar')
      .reply(200, output);

    return shopify.customer.get(207119551, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.customer));
  });

  it('creates a new customer', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/customers.json', input)
      .reply(201, output);

    return shopify.customer.create(input.customer)
      .then(data => expect(data).to.deep.equal(output.customer));
  });

  it('updates a customer', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/customers/207119551.json', input)
      .reply(200, output);

    return shopify.customer.update(207119551, input.customer)
      .then(data => expect(data).to.deep.equal(output.customer));
  });

  it('creates an account activation URL for a customer', () => {
    const input = fixtures.req.accountActivationUrl;
    const output = fixtures.res.accountActivationUrl;

    scope
      .post('/admin/customers/207119551/account_activation_url.json', input)
      .reply(200, output);

    return shopify.customer.accountActivationUrl(207119551)
      .then(data => expect(data).to.equal(output.account_activation_url));
  });

  it('deletes a customer', () => {
    scope
      .delete('/admin/customers/207119551.json')
      .reply(200, {});

    return shopify.customer.delete(207119551)
      .then(data => expect(data).to.deep.equal({}));
  });

  it('gets a count of all customers', () => {
    scope
      .get('/admin/customers/count.json')
      .reply(200, { count: 1 });

    return shopify.customer.count()
      .then(data => expect(data).to.equal(1));
  });
});

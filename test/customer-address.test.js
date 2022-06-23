describe('Shopify#customerAddress', () => {
  'use strict';

  const expect = require('chai').expect;
  const qs = require('qs');

  const fixtures = require('./fixtures/customer-address');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of all addresses from a customer (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/customers/207119551/addresses.json').reply(200, output);

    return shopify.customerAddress
      .list(207119551)
      .then((data) => expect(data).to.deep.equal(output.addresses));
  });

  it('gets a list of all articles from a certain blog (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/customers/207119551/addresses.json?page=1')
      .reply(200, output);

    return shopify.customerAddress
      .list(207119551, { page: 1 })
      .then((data) => expect(data).to.deep.equal(output.addresses));
  });

  it('gets a single address by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/customers/207119551/addresses/207119551.json')
      .reply(200, output);

    return shopify.customerAddress
      .get(207119551, 207119551)
      .then((data) => expect(data).to.deep.equal(output.customer_address));
  });

  it('creates a new address for a customer', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/customers/207119551/addresses.json', input)
      .reply(201, output);

    return shopify.customerAddress
      .create(207119551, input.address)
      .then((data) => expect(data).to.deep.equal(output.customer_address));
  });

  it('updates an address', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/customers/207119551/addresses/207119551.json', input)
      .reply(200, output);

    return shopify.customerAddress
      .update(207119551, 207119551, input.address)
      .then((data) => expect(data).to.deep.equal(output.customer_address));
  });

  it('deletes an address', () => {
    scope
      .delete('/admin/customers/207119551/addresses/207119551.json')
      .reply(200, {});

    return shopify.customerAddress
      .delete(207119551, 207119551)
      .then((data) => expect(data).to.deep.equal({}));
  });

  it('performs bulk operations against a number of addresses', () => {
    const query = {
      address_ids: [1053317300],
      operations: 'destroy'
    };

    scope
      .put(
        '/admin/customers/207119551/addresses/set.json?' +
          qs.stringify(query, {
            arrayFormat: 'brackets'
          })
      )
      .reply(200, {});

    return shopify.customerAddress
      .set(207119551, query)
      .then((data) => expect(data).to.deep.equal({}));
  });

  it('sets default address for a customer', () => {
    const output = fixtures.res.default;

    scope
      .put('/admin/customers/207119551/addresses/1053317297/default.json')
      .reply(200, output);

    return shopify.customerAddress
      .default(207119551, 1053317297)
      .then((data) => expect(data).to.deep.equal(output.customer_address));
  });
});

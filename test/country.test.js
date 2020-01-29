describe('Shopify#country', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/country');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all countries (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/countries.json').reply(200, output);

    return shopify.country
      .list()
      .then((data) => expect(data).to.deep.equal(output.countries));
  });

  it('gets a list of all countries (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/countries.json?since_id=359115487').reply(200, output);

    return shopify.country
      .list({ since_id: 359115487 })
      .then((data) => expect(data).to.deep.equal(output.countries));
  });

  it('gets a count of all countries', () => {
    scope.get('/admin/countries/count.json').reply(200, { count: 3 });

    return shopify.country.count().then((data) => expect(data).to.equal(3));
  });

  it('gets a single country by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/countries/879921427.json').reply(200, output);

    return shopify.country
      .get(879921427)
      .then((data) => expect(data).to.deep.equal(output.country));
  });

  it('gets a single country by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/countries/879921427.json?foo=bar').reply(200, output);

    return shopify.country
      .get(879921427, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.country));
  });

  it('creates a new country', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/countries.json', input).reply(201, output);

    return shopify.country
      .create(input.country)
      .then((data) => expect(data).to.deep.equal(output.country));
  });

  it('updates a country', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope.put('/admin/countries/879921427.json', input).reply(200, output);

    return shopify.country
      .update(879921427, input.country)
      .then((data) => expect(data).to.deep.equal(output.country));
  });

  it('deletes a country', () => {
    scope.delete('/admin/countries/879921427.json').reply(200, {});

    return shopify.country
      .delete(879921427)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

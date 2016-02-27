describe('Shopify#province', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/province');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all provinces for a country (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/countries/879921427/provinces.json')
      .reply(200, output);

    return shopify.province.list(879921427)
      .then(data => expect(data).to.deep.equal(output.provinces));
  });

  it('gets a list of all provinces for a country (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/countries/879921427/provinces.json?since_id=92264566')
      .reply(200, output);

    return shopify.province.list(879921427, { since_id: 92264566 })
      .then(data => expect(data).to.deep.equal(output.provinces));
  });

  it('gets a count of all provinces (1/2)', () => {
    scope
      .get('/admin/countries/879921427/provinces/count.json')
      .reply(200, { count: 13 });

    return shopify.province.count(879921427)
      .then(data => expect(data).to.equal(13));
  });

  it('gets a count of all provinces (2/2)', () => {
    scope
      .get('/admin/countries/879921427/provinces/count.json?since_id=92264566')
      .reply(200, { count: 13 });

    return shopify.province.count(879921427, { since_id: 92264566 })
      .then(data => expect(data).to.equal(13));
  });

  it('gets a single province by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/countries/879921427/provinces/224293623.json')
      .reply(200, output);

    return shopify.province.get(879921427, 224293623)
      .then(data => expect(data).to.deep.equal(output.province));
  });

  it('gets a single province by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/countries/879921427/provinces/224293623.json?foo=bar')
      .reply(200, output);

    return shopify.province.get(879921427, 224293623, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.province));
  });

  it('updates a province', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/countries/879921427/provinces/224293623.json', input)
      .reply(200, output);

    return shopify.province.update(879921427, 224293623, input.province)
      .then(data => expect(data).to.deep.equal(output.province));
  });
});

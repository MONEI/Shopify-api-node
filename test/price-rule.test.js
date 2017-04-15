describe('Shopify#priceRule', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/price-rule');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates a new price rule', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/price_rules.json', input)
      .reply(201, output);

    return shopify.priceRule.create(input.price_rule)
      .then(data => expect(data).to.deep.equal(output.price_rule));
  });

  it('updates a price rule', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/price_rules/2762402181.json', input)
      .reply(200, output);

    return shopify.priceRule.update(2762402181, input.price_rule)
      .then(data => expect(data).to.deep.equal(output.price_rule));
  });

  it('gets a list of price rule objects (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/price_rules.json')
      .reply(200, output);

    return shopify.priceRule.list()
      .then(data => expect(data).to.deep.equal(output.price_rules));
  });

  it('gets a list of price rule objects (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/price_rules.json?limit=25')
      .reply(200, output);

    return shopify.priceRule.list({ limit: 25 })
      .then(data => expect(data).to.deep.equal(output.price_rules));
  });

  it('gets a single price rule by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/price_rules/2762402181.json')
      .reply(200, output);

    return shopify.priceRule.get(2762402181)
      .then(data => expect(data).to.deep.equal(output.price_rule));
  });

  it('deletes a price rule', () => {
    scope
      .delete('/admin/price_rules/2762402181.json')
      .reply(200);

    return shopify.priceRule.delete(2762402181)
      .then(data => expect(data).to.deep.equal({}));
  });
});

describe('Shopify#checkout', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/checkout');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a count of all checkout (1/2)', () => {
    scope
      .get('/admin/checkouts/count.json')
      .reply(200, { count: 5 });

    return shopify.checkout.count()
      .then(data => expect(data).to.equal(5));
  });

  it('gets a count of all checkout (2/2)', () => {
    scope
      .get('/admin/checkouts/count.json?foo=bar')
      .reply(200, { count: 5 });

    return shopify.checkout.count({ foo: 'bar' })
      .then(data => expect(data).to.equal(5));
  });

  it('gets a list of all checkout (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/checkouts.json')
      .reply(200, output);

    return shopify.checkout.list()
      .then(data => expect(data).to.deep.equal(output.checkouts));
  });

  it('gets a list of all checkout (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/checkouts.json?foo=bar')
      .reply(200, output);

    return shopify.checkout.list({ foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.checkouts));
  });

  it('creates a new checkout', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/checkouts.json', input)
      .reply(201, output);

    return shopify.checkout.create(input.checkout)
      .then(data => expect(data).to.deep.equal(output.checkout));
  });

  it('completes a free checkout', () => {
    const token = 'b490a9220cd14d7344024f4874f640a6';
    const output = fixtures.res.complete;

    scope
      .post(`/admin/checkouts/${token}/complete.json`, {})
      .reply(202, output);

    return shopify.checkout.complete(token)
      .then(data => expect(data).to.deep.equal(output.checkout));
  });

  it('gets a single checkout by its token', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/checkouts/bd5a8aa1ecd019dd3520ff791ee3a24c.json')
      .reply(200, output);

    return shopify.checkout.get('bd5a8aa1ecd019dd3520ff791ee3a24c')
      .then(data => expect(data).to.deep.equal(output.checkout));
  });

  it('updates an existing checkout', () => {
    const token = 'exuw7apwoycchjuwtiqg8nytfhphr62a';
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put(`/admin/checkouts/${token}.json`, input)
      .reply(202, output);

    return shopify.checkout.update(token, input.checkout)
      .then(data => expect(data).to.deep.equal(output.checkout));
  });

  it('gets a list of shipping rates', () => {
    const token = 'exuw7apwoycchjuwtiqg8nytfhphr62a';
    const output = fixtures.res.shippingRates;

    scope
      .get(`/admin/checkouts/${token}/shipping_rates.json`)
      .reply(200, output);

    return shopify.checkout.shippingRates(token)
      .then(data => expect(data).to.deep.equal(output.shipping_rates));
  });
});

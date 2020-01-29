describe('Shopify#discountCode', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/discount-code');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates a new discount code', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/price_rules/2772974277/discount_codes.json', input)
      .reply(201, output);

    return shopify.discountCode
      .create(2772974277, input.discount_code)
      .then((data) => expect(data).to.deep.equal(output.discount_code));
  });

  it('updates a single discount code', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;
    const id = 2769077509;

    scope
      .put(`/admin/price_rules/2772974277/discount_codes/${id}.json`, input)
      .reply(200, output);

    return shopify.discountCode
      .update(2772974277, id, input.discount_code)
      .then((data) => expect(data).to.deep.equal(output.discount_code));
  });

  it('gets a list of discount codes', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/price_rules/2772974277/discount_codes.json')
      .reply(200, output);

    return shopify.discountCode
      .list(2772974277)
      .then((data) => expect(data).to.deep.equal(output.discount_codes));
  });

  it('gets a single discount code by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/price_rules/2772974277/discount_codes/2769077509.json')
      .reply(200, output);

    return shopify.discountCode
      .get(2772974277, 2769077509)
      .then((data) => expect(data).to.deep.equal(output.discount_code));
  });

  it('looks up a discount code', () => {
    const baseUrl = shopify.baseUrl;
    const pathname = '/admin/price_rules/2772974277/discount_codes/2769077509';
    const href = `${baseUrl.protocol}//${baseUrl.hostname}${pathname}`;
    const output = fixtures.res.get;

    scope
      .get('/admin/discount_codes/lookup.json?code=10OFF')
      .reply(303, fixtures.res.lookup.replace('{{href}}', href), {
        Location: href
      })
      .get(pathname)
      .reply(200, output);

    return shopify.discountCode
      .lookup({ code: '10OFF' })
      .then((data) => expect(data).to.deep.equal(output.discount_code));
  });

  it('deletes an existing discount code', () => {
    scope
      .delete('/admin/price_rules/2772974277/discount_codes/2769077509.json')
      .reply(204);

    return shopify.discountCode
      .delete(2772974277, 2769077509)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

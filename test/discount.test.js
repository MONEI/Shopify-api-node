describe('Shopify#discount', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/discount');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('creates a new discount', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/discounts.json', input)
      .reply(201, output);

    return shopify.discount.create(input.discount)
      .then(data => expect(data).to.deep.equal(output.discount));
  });

  it('gets a list of all discounts (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/discounts.json')
      .reply(200, output);

    return shopify.discount.list()
      .then(data => expect(data).to.deep.equal(output.discounts));
  });

  it('gets a list of all discounts (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/discounts.json?page=1')
      .reply(200, output);

    return shopify.discount.list({ page: 1 })
      .then(data => expect(data).to.deep.equal(output.discounts));
  });

  it('gets a single discount by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/discounts/680866.json')
      .reply(200, output);

    return shopify.discount.get(680866)
      .then(data => expect(data).to.deep.equal(output.discount));
  });

  it('disables a discount', () => {
    const output = fixtures.res.disable;

    scope
      .post('/admin/discounts/680866/disable.json', {})
      .reply(201, output);

    return shopify.discount.disable(680866)
      .then(data => expect(data).to.deep.equal(output.discount));
  });

  it('enables a discount', () => {
    const output = fixtures.res.enable;

    scope
      .post('/admin/discounts/949676421/enable.json', {})
      .reply(201, output);

    return shopify.discount.enable(949676421)
      .then(data => expect(data).to.deep.equal(output.discount));
  });

  it('deletes a discount', () => {
    scope
      .delete('/admin/discounts/680866.json')
      .reply(200, {});

    return shopify.discount.delete(680866)
      .then(data => expect(data).to.deep.equal({}));
  });
});

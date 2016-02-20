describe('Shopify#giftCard', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/gift-card');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all gift cards (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/gift_cards.json')
      .reply(200, output);

    return shopify.giftCard.list()
      .then(data => expect(data).to.deep.equal(output.gift_cards));
  });

  it('gets a list of all gift cards (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/gift_cards.json?status=enabled')
      .reply(200, output);

    return shopify.giftCard.list({ status: 'enabled' })
      .then(data => expect(data).to.deep.equal(output.gift_cards));
  });

  it('gets a single gift card by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/gift_cards/48394658.json')
      .reply(200, output);

    return shopify.giftCard.get(48394658)
      .then(data => expect(data).to.deep.equal(output.gift_card));
  });

  it('gets a count of all gift cards (1/2)', () => {
    scope
      .get('/admin/gift_cards/count.json')
      .reply(200, { count: 2 });

    return shopify.giftCard.count()
      .then(data => expect(data).to.equal(2));
  });

  it('gets a count of all gift cards (2/2)', () => {
    scope
      .get('/admin/gift_cards/count.json?status=enabled')
      .reply(200, { count: 2 });

    return shopify.giftCard.count({ status: 'enabled' })
      .then(data => expect(data).to.equal(2));
  });

  it('creates a new gift card', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/gift_cards.json', input)
      .reply(201, output);

    return shopify.giftCard.create(input.gift_card)
      .then(data => expect(data).to.deep.equal(output.gift_card));
  });

  it('updates a gift card', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/gift_cards/48394658.json', input)
      .reply(200, output);

    return shopify.giftCard.update(48394658, input.gift_card)
      .then(data => expect(data).to.deep.equal(output.gift_card));
  });

  it('disables a gift card', () => {
    const input = fixtures.req.disable;
    const output = fixtures.res.disable;

    scope
      .post('/admin/gift_cards/48394658/disable.json', input)
      .reply(201, output);

    return shopify.giftCard.disable(48394658)
      .then(data => expect(data).to.deep.equal(output.gift_card));
  });

  it('searches for gift cards matching a given query', () => {
    const output = fixtures.res.search;

    scope
      .get('/admin/gift_cards/search.json?query=Bob')
      .reply(200, output);

    return shopify.giftCard.search({ query: 'Bob' })
      .then(data => expect(data).to.deep.equal(output.gift_cards));
  });
});

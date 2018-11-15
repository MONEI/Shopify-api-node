describe('Shopify#giftCardAdjustmentAdjustment', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/gift-card-adjustment');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all gift card adjustments', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/gift_cards/48394658/adjustments.json')
      .reply(200, output);

    return shopify.giftCardAdjustment.list(48394658)
      .then(data => expect(data).to.deep.equal(output.adjustments));
  });

  it('gets a single gift card adjustment by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/gift_cards/48394658/adjustments/2.json')
      .reply(200, output);

    return shopify.giftCardAdjustment.get(48394658, 2)
      .then(data => expect(data).to.deep.equal(output.adjustment));
  });

  it('creates a new gift card adjustment (1/4)', () => {
    const input = fixtures.req.create_credit;
    const output = fixtures.res.create_credit;

    scope
      .post('/admin/gift_cards/48394658/adjustments.json', input)
      .reply(201, output);

    return shopify.giftCardAdjustment.create(48394658, input.adjustment)
      .then(data => expect(data).to.deep.equal(output.adjustment));
  });

  it('creates a new gift card adjustment (2/4)', () => {
    const input = fixtures.req.create_debit;
    const output = fixtures.res.create_debit;

    scope
      .post('/admin/gift_cards/48394658/adjustments.json', input)
      .reply(201, output);

    return shopify.giftCardAdjustment.create(48394658, input.adjustment)
      .then(data => expect(data).to.deep.equal(output.adjustment));
  });

  it('creates a new gift card adjustment (3/4)', () => {
    const input = fixtures.req.create_credit_past;
    const output = fixtures.res.create_credit_past;

    scope
      .post('/admin/gift_cards/48394658/adjustments.json', input)
      .reply(201, output);

    return shopify.giftCardAdjustment.create(48394658, input.adjustment)
      .then(data => expect(data).to.deep.equal(output.adjustment));
  });

  it('creates a new gift card adjustment (4/4)', () => {
    const input = fixtures.req.create_credit_w_ref;
    const output = fixtures.res.create_credit_w_ref;

    scope
      .post('/admin/gift_cards/48394658/adjustments.json', input)
      .reply(201, output);

    return shopify.giftCardAdjustment.create(48394658, input.adjustment)
      .then(data => expect(data).to.deep.equal(output.adjustment));
  });

});

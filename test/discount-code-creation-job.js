describe('Shopify#discountCodeCreationJob', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/discount-code-creation-job');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates a new discount code creation job', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/price_rules/507328175/batch.json', input)
      .reply(201, output);

    return shopify.discountCodeCreationJob
      .create(507328175, input.discount_codes)
      .then((data) =>
        expect(data).to.deep.equal(output.discount_code_creation)
      );
  });

  it('gets a single discount code creation job by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/price_rules/507328175/batch/173232803.json')
      .reply(200, output);

    return shopify.discountCodeCreationJob
      .get(507328175, 173232803)
      .then((data) =>
        expect(data).to.deep.equal(output.discount_code_creation)
      );
  });

  it('gets a list of discount codes for a discount code creation job', () => {
    const output = fixtures.res.discountCodes;

    scope
      .get('/admin/price_rules/507328175/batch/173232803/discount_codes.json')
      .reply(200, output);

    return shopify.discountCodeCreationJob
      .discountCodes(507328175, 173232803)
      .then((data) => expect(data).to.deep.equal(output.discount_codes));
  });
});

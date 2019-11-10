describe('Shopify#productResourceFeedback', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/product-resource-feedback');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates a resource feedback', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/products/632910392/resource_feedback.json', input)
      .reply(201, output);

    return shopify.productResourceFeedback.create(632910392, input.resource_feedback)
      .then(data => expect(data).to.deep.equal(output.resource_feedback));
  });

  it('gets a list of resource feedbacks', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/products/632910392/resource_feedback.json')
      .reply(200, output);

    return shopify.productResourceFeedback.list(632910392)
      .then(data => expect(data).to.deep.equal(output.resource_feedback));
  });
});

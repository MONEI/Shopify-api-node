describe('Shopify#resourceFeedback', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/resource-feedback');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('creates a resource feedback', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/resource_feedback.json', input).reply(202, output);

    return shopify.resourceFeedback
      .create(input.resource_feedback)
      .then((data) => expect(data).to.deep.equal(output.resource_feedback));
  });

  it('gets a list of resource feedbacks', () => {
    const output = fixtures.res.list;

    scope.get('/admin/resource_feedback.json').reply(200, output);

    return shopify.resourceFeedback
      .list()
      .then((data) => expect(data).to.deep.equal(output.resource_feedback));
  });
});

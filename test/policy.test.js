describe('Shopify#policy', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/policy');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of all policies (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/policies.json').reply(200, output);

    return shopify.policy
      .list()
      .then((data) => expect(data).to.deep.equal(output.policies));
  });

  it('gets a list of all policies (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/policies.json?foo=bar').reply(200, output);

    return shopify.policy
      .list({ foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.policies));
  });
});

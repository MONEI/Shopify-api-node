describe('Shopify#deprecatedApiCall', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/deprecated-api-call');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of deprecated API calls', () => {
    const output = fixtures.res.list;

    scope.get('/admin/deprecated_api_calls.json').reply(200, output);

    return shopify.deprecatedApiCall
      .list()
      .then((data) => expect(data).to.deep.equal(output.deprecated_api_calls));
  });
});

describe('Shopify#accessScope', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/access-scope');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of access scopes associated to the access token', () => {
    const output = fixtures.res.list;

    scope.get('/admin/oauth/access_scopes.json').reply(200, output);

    return shopify.accessScope
      .list()
      .then((data) => expect(data).to.deep.equal(output.access_scopes));
  });
});

describe('Shopify#apiPermission', () => {
  'use strict';

  const expect = require('chai').expect;

  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('deletes an api permission', () => {
    scope.delete('/admin/api_permissions/current.json').reply(200);

    return shopify.apiPermission
      .delete()
      .then((data) => expect(data).to.deep.equal({}));
  });
});

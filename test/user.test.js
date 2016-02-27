describe('Shopify#user', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/user');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all users', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/users.json')
      .reply(200, output);

    return shopify.user.list()
      .then(data => expect(data).to.deep.equal(output.users));
  });

  it('gets a single user by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/users/799407056.json')
      .reply(200, output);

    return shopify.user.get(799407056)
      .then(data => expect(data).to.deep.equal(output.user));
  });
});

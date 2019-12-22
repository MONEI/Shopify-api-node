describe('Shopify#storefrontAccessToken', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/storefront-access-token');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates a storefront access token', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/storefront_access_tokens.json', input)
      .reply(200, output);

    return shopify.storefrontAccessToken
      .create(input.storefront_access_token)
      .then((data) => {
        expect(data).to.deep.equal(output.storefront_access_token);
      });
  });

  it('deletes an existing/issued public access token', () => {
    scope.delete('/admin/storefront_access_tokens/755357713.json').reply(200);

    return shopify.storefrontAccessToken
      .delete(755357713)
      .then((data) => expect(data).to.deep.equal({}));
  });

  it('gets a list of public access tokens', () => {
    const output = fixtures.res.list;

    scope.get('/admin/storefront_access_tokens.json').reply(200, output);

    return shopify.storefrontAccessToken.list().then((data) => {
      expect(data).to.deep.equal(output.storefront_access_tokens);
    });
  });
});

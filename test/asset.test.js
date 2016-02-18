describe('Shopify#asset', () => {
  'use strict';

  const expect = require('chai').expect;
  const qs = require('qs');

  const fixtures = require('./fixtures/asset');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all theme assets (1/2)', () => {
    const output = fixtures.res.all;

    scope
      .get('/admin/themes/828155753/assets.json')
      .reply(200, output);

    return shopify.asset.all(828155753)
      .then(data => expect(data).to.deep.equal(output.assets));
  });

  it('gets a list of all theme assets (2/2)', () => {
    const output = fixtures.res.all;

    scope
      .get('/admin/themes/828155753/assets.json?foo=bar')
      .reply(200, output);

    return shopify.asset.all(828155753, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.assets));
  });

  it('gets a single asset', () => {
    const output = fixtures.res.single;
    const query = {
      asset: { key: 'templates/index.liquid' },
      theme_id: 828155753
    };

    scope
      .get('/admin/themes/828155753/assets.json?' + qs.stringify(query))
      .reply(200, output);

    return shopify.asset.get(828155753, query)
      .then(data => expect(data).to.deep.equal(output.asset));
  });

  it('updates an asset', () => {
    const input = fixtures.res.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/themes/828155753/assets.json', input)
      .reply(200, output);

    return shopify.asset.update(828155753, input.asset)
      .then(data => expect(data).to.deep.equal(output.asset));
  });

  it('creates an asset', () => {
    const input = fixtures.res.create;
    const output = fixtures.res.create;

    scope
      .put('/admin/themes/828155753/assets.json', input)
      .reply(200, output);

    return shopify.asset.create(828155753, input.asset)
      .then(data => expect(data).to.deep.equal(output.asset));
  });

  it('deletes an asset', () => {
    const query = {
      asset: { key: 'assets/bg-body.gif' }
    };

    scope
      .delete('/admin/themes/828155753/assets.json?' + qs.stringify(query))
      .reply(200, {});

    return shopify.asset.delete(828155753, query)
      .then(data => expect(data).to.deep.equal({}));
  });
});

describe('Shopify#theme', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/theme');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all themes (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/themes.json')
      .reply(200, output);

    return shopify.theme.list()
      .then(data => expect(data).to.deep.equal(output.themes));
  });

  it('gets a list of all themes (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/themes.json?foo=bar')
      .reply(200, output);

    return shopify.theme.list({ foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.themes));
  });

  it('gets a single theme by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/themes/828155753.json')
      .reply(200, output);

    return shopify.theme.get(828155753)
      .then(data => expect(data).to.deep.equal(output.theme));
  });

  it('gets a single theme by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/themes/828155753.json?foo=bar')
      .reply(200, output);

    return shopify.theme.get(828155753, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.theme));
  });

  it('creates a new theme', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/themes.json', input)
      .reply(201, output);

    return shopify.theme.create(input.theme)
      .then(data => expect(data).to.deep.equal(output.theme));
  });

  it('updates a theme', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/themes/752253240.json', input)
      .reply(200, output);

    return shopify.theme.update(752253240, input.theme)
      .then(data => expect(data).to.deep.equal(output.theme));
  });

  it('deletes a theme', () => {
    scope
      .delete('/admin/themes/752253240.json')
      .reply(200, {});

    return shopify.theme.delete(752253240)
      .then(data => expect(data).to.deep.equal({}));
  });
});

describe('Shopify#page', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/page');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all pages (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/pages.json')
      .reply(200, output);

    return shopify.page.list()
      .then(data => expect(data).to.deep.equal(output.pages));
  });

  it('gets a list of all pages (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/pages.json?since_id=108828308')
      .reply(200, output);

    return shopify.page.list({ since_id: 108828308 })
      .then(data => expect(data).to.deep.equal(output.pages));
  });

  it('gets a count of all pages (1/2)', () => {
    scope
      .get('/admin/pages/count.json')
      .reply(200, { count: 4 });

    return shopify.page.count()
      .then(data => expect(data).to.equal(4));
  });

  it('gets a count of all pages (2/2)', () => {
    scope
      .get('/admin/pages/count.json?published_status=any')
      .reply(200, { count: 4 });

    return shopify.page.count({ published_status: 'any' })
      .then(data => expect(data).to.equal(4));
  });

  it('gets a single page by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/pages/131092082.json')
      .reply(200, output);

    return shopify.page.get(131092082)
      .then(data => expect(data).to.deep.equal(output.page));
  });

  it('gets a single page by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/pages/131092082.json?foo=bar')
      .reply(200, output);

    return shopify.page.get(131092082, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.page));
  });

  it('creates a new page', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/pages.json', input)
      .reply(201, output);

    return shopify.page.create(input.page)
      .then(data => expect(data).to.deep.equal(output.page));
  });

  it('updates a page', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/pages/131092082.json', input)
      .reply(200, output);

    return shopify.page.update(131092082, input.page)
      .then(data => expect(data).to.deep.equal(output.page));
  });

  it('deletes a page', () => {
    scope
      .delete('/admin/pages/131092082.json')
      .reply(200, {});

    return shopify.page.delete(131092082)
      .then(data => expect(data).to.deep.equal({}));
  });
});

describe('Shopify#redirect', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/redirect');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of all redirects (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/redirects.json').reply(200, output);

    return shopify.redirect
      .list()
      .then((data) => expect(data).to.deep.equal(output.redirects));
  });

  it('gets a list of all redirects (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/redirects.json?since_id=304339088').reply(200, output);

    return shopify.redirect
      .list({ since_id: 304339088 })
      .then((data) => expect(data).to.deep.equal(output.redirects));
  });

  it('gets a count of all redirects (1/2)', () => {
    scope.get('/admin/redirects/count.json').reply(200, { count: 3 });

    return shopify.redirect.count().then((data) => expect(data).to.equal(3));
  });

  it('gets a count of all redirects (2/2)', () => {
    scope.get('/admin/redirects/count.json?foo=bar').reply(200, { count: 3 });

    return shopify.redirect
      .count({ foo: 'bar' })
      .then((data) => expect(data).to.equal(3));
  });

  it('gets a single redirect by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/redirects/668809255.json').reply(200, output);

    return shopify.redirect
      .get(668809255)
      .then((data) => expect(data).to.deep.equal(output.redirect));
  });

  it('gets a single redirect by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/redirects/668809255.json?foo=bar').reply(200, output);

    return shopify.redirect
      .get(668809255, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.redirect));
  });

  it('creates a new redirect', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/redirects.json', input).reply(201, output);

    return shopify.redirect
      .create(input.redirect)
      .then((data) => expect(data).to.deep.equal(output.redirect));
  });

  it('updates a redirect', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope.put('/admin/redirects/668809255.json', input).reply(200, output);

    return shopify.redirect
      .update(668809255, input.redirect)
      .then((data) => expect(data).to.deep.equal(output.redirect));
  });

  it('deletes a redirect', () => {
    scope.delete('/admin/redirects/668809255.json').reply(200, {});

    return shopify.redirect
      .delete(668809255)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

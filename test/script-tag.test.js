describe('Shopify#scriptTag', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/script-tag');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all script tags (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/script_tags.json').reply(200, output);

    return shopify.scriptTag
      .list()
      .then((data) => expect(data).to.deep.equal(output.script_tags));
  });

  it('gets a list of all script tags (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/script_tags.json?page=1').reply(200, output);

    return shopify.scriptTag
      .list({ page: 1 })
      .then((data) => expect(data).to.deep.equal(output.script_tags));
  });

  it('gets a count of all script tags (1/2)', () => {
    scope.get('/admin/script_tags/count.json').reply(200, { count: 2 });

    return shopify.scriptTag.count().then((data) => expect(data).to.equal(2));
  });

  it('gets a count of all script tags (2/2)', () => {
    scope.get('/admin/script_tags/count.json?foo=bar').reply(200, { count: 2 });

    return shopify.scriptTag
      .count({ foo: 'bar' })
      .then((data) => expect(data).to.equal(2));
  });

  it('gets a single script tag by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/script_tags/596726825.json').reply(200, output);

    return shopify.scriptTag
      .get(596726825)
      .then((data) => expect(data).to.deep.equal(output.script_tag));
  });

  it('gets a single script tag by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/script_tags/596726825.json?foo=bar').reply(200, output);

    return shopify.scriptTag
      .get(596726825, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.script_tag));
  });

  it('creates a new script tag', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/script_tags.json', input).reply(201, output);

    return shopify.scriptTag
      .create(input.script_tag)
      .then((data) => expect(data).to.deep.equal(output.script_tag));
  });

  it('updates a script tag', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope.put('/admin/script_tags/596726825.json', input).reply(200, output);

    return shopify.scriptTag
      .update(596726825, input.script_tag)
      .then((data) => expect(data).to.deep.equal(output.script_tag));
  });

  it('deletes a script tag', () => {
    scope.delete('/admin/script_tags/596726825.json').reply(200, {});

    return shopify.scriptTag
      .delete(596726825)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

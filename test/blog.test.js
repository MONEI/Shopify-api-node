describe('Shopify#blog', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/blog');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all blogs (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/blogs.json')
      .reply(200, output);

    return shopify.blog.list()
      .then(data => expect(data).to.deep.equal(output.blogs));
  });

  it('gets a list of all blogs (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/blogs.json?since_id=241253186')
      .reply(200, output);

    return shopify.blog.list({ since_id: 241253186 })
      .then(data => expect(data).to.deep.equal(output.blogs));
  });

  it('gets a count of all blogs', () => {
    const output = { count: 2 };

    scope
      .get('/admin/blogs/count.json')
      .reply(200, output);

    return shopify.blog.count()
      .then(data => expect(data).to.equal(2));
  });

  it('gets a single blog by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/blogs/241253187.json')
      .reply(200, output);

    return shopify.blog.get(241253187)
      .then(data => expect(data).to.deep.equal(output.blog));
  });

  it('gets a single blog by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/blogs/241253187.json?foo=bar')
      .reply(200, output);

    return shopify.blog.get(241253187, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.blog));
  });

  it('creates a new blog', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/blogs.json', input)
      .reply(201, output);

    return shopify.blog.create(input.blog)
      .then(data => expect(data).to.deep.equal(output.blog));
  });

  it('updates a blog', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/blogs/241253187.json', input)
      .reply(200, output);

    return shopify.blog.update(241253187, input.blog)
      .then(data => expect(data).to.deep.equal(output.blog));
  });

  it('deletes a blog', () => {
    scope
      .delete('/admin/blogs/241253187.json')
      .reply(200, {});

    return shopify.blog.delete(241253187)
      .then(data => expect(data).to.deep.equal({}));
  });
});

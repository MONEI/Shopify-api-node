describe('Shopify#article', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/article');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  it('gets a list of all articles from a certain blog (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/blogs/241253187/articles.json')
      .reply(200, output);

    return shopify.article.list(241253187)
      .then(data => expect(data).to.deep.equal(output.articles));
  });

  it('gets a list of all articles from a certain blog (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/blogs/241253187/articles.json?since_id=134645307')
      .reply(200, output);

    return shopify.article.list(241253187, { since_id: 134645307 })
      .then(data => expect(data).to.deep.equal(output.articles));
  });

  it('gets a count of all articles from a certain blog (1/2)', () => {
    const output = { count: 4 };

    scope
      .get('/admin/blogs/241253187/articles/count.json')
      .reply(200, output);

    return shopify.article.count(241253187)
      .then(data => expect(data).to.equal(4));
  });

  it('gets a count of all articles from a certain blog (2/2)', () => {
    const output = { count: 4 };

    scope
      .get('/admin/blogs/241253187/articles/count.json?foo=bar')
      .reply(200, output);

    return shopify.article.count(241253187, { foo: 'bar' })
      .then(data => expect(data).to.equal(4));
  });

  it('gets a single article by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/blogs/241253187/articles/134645308.json')
      .reply(200, output);

    return shopify.article.get(241253187, 134645308)
      .then(data => expect(data).to.deep.equal(output.article));
  });

  it('gets a single article by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/blogs/241253187/articles/134645308.json?foo=bar')
      .reply(200, output);

    return shopify.article.get(241253187, 134645308, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.article));
  });

  it('create a new article for a blog', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/blogs/241253187/articles.json', input)
      .reply(201, output);

    return shopify.article.create(241253187, input.article)
      .then(data => expect(data).to.deep.equal(output.article));
  });

  it('updates an article', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/blogs/241253187/articles/134645308.json', input)
      .reply(200, output);

    return shopify.article.update(241253187, 134645308, input.article)
      .then(data => expect(data).to.deep.equal(output.article));
  });

  it('gets a list all the authors of articles', () => {
    const output = fixtures.res.authors;

    scope
      .get('/admin/articles/authors.json')
      .reply(200, output);

    return shopify.article.authors()
      .then(data => expect(data).to.deep.equal(output.authors));
  });

  it('gets a list of all the tags of articles (1/x)', () => {
    const output = fixtures.res.tags;

    scope
      .get('/admin/articles/tags.json')
      .reply(200, output);

    return shopify.article.tags()
      .then(data => expect(data).to.deep.equal(output.tags));
  });

  it('gets a list of all tags of articles (1/3)', () => {
    const output = fixtures.res.tags;

    scope
      .get('/admin/articles/tags.json')
      .reply(200, output);

    return shopify.article.tags()
      .then(data => expect(data).to.deep.equal(output.tags));
  });

  it('gets a list of all tags of articles (2/3)', () => {
    const output = fixtures.res.tags;

    scope
      .get('/admin/articles/tags.json?foo=bar')
      .reply(200, output);

    return shopify.article.tags({ foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.tags));
  });

  it('gets a list of all tags of articles (3/3)', () => {
    const output = fixtures.res.tags;

    scope
      .get('/admin/articles/tags.json?foo=bar')
      .reply(200, output);

    return shopify.article.tags(undefined, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.tags));
  });

  it('gets a list of all tags from a specific blog (1/2)', () => {
    const output = fixtures.res.tags;

    scope
      .get('/admin/blogs/241253187/articles/tags.json')
      .reply(200, output);

    return shopify.article.tags(241253187)
      .then(data => expect(data).to.deep.equal(output.tags));
  });

  it('gets a list of all tags from a specific blog (2/2)', () => {
    const output = fixtures.res.tags;

    scope
      .get('/admin/blogs/241253187/articles/tags.json?foo=bar')
      .reply(200, output);

    return shopify.article.tags(241253187, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.tags));
  });

  it('deletes an article of a blog', () => {
    scope
      .delete('/admin/blogs/241253187/articles/134645308.json')
      .reply(200, {});

    return shopify.article.delete(241253187, 134645308)
      .then(data => expect(data).to.deep.equal({}));
  });
});

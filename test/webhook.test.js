describe('Shopify#webhook', () => {
  'use strict';

  const expect = require('chai').expect;
  const qs = require('qs');

  const fixtures = require('./fixtures/webhook');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all webhooks (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/webhooks.json').reply(200, output);

    return shopify.webhook
      .list()
      .then((data) => expect(data).to.deep.equal(output.webhooks));
  });

  it('gets a list of all webhooks (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/webhooks.json?page=1').reply(200, output);

    return shopify.webhook
      .list({ page: 1 })
      .then((data) => expect(data).to.deep.equal(output.webhooks));
  });

  it('gets a count of all webhooks (1/2)', () => {
    scope.get('/admin/webhooks/count.json').reply(200, { count: 2 });

    return shopify.webhook.count().then((data) => expect(data).to.equal(2));
  });

  it('gets a count of all webhooks (2/2)', () => {
    const query = { topic: 'orders/create' };

    scope
      .get('/admin/webhooks/count.json?' + qs.stringify(query))
      .reply(200, { count: 1 });

    return shopify.webhook
      .count(query)
      .then((data) => expect(data).to.equal(1));
  });

  it('gets a single webhook by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/webhooks/4759306.json').reply(200, output);

    return shopify.webhook
      .get(4759306)
      .then((data) => expect(data).to.deep.equal(output.webhook));
  });

  it('gets a single webhook by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/webhooks/4759306.json?foo=bar').reply(200, output);

    return shopify.webhook
      .get(4759306, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.webhook));
  });

  it('creates a new webhook', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/webhooks.json', input).reply(201, output);

    return shopify.webhook
      .create(input.webhook)
      .then((data) => expect(data).to.deep.equal(output.webhook));
  });

  it('updates a webhook', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope.put('/admin/webhooks/4759306.json', input).reply(200, output);

    return shopify.webhook
      .update(4759306, input.webhook)
      .then((data) => expect(data).to.deep.equal(output.webhook));
  });

  it('deletes a webhook', () => {
    scope.delete('/admin/webhooks/4759306.json').reply(200, {});

    return shopify.webhook
      .delete(4759306)
      .then((data) => expect(data).to.deep.equal({}));
  });
});

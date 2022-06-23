describe('Shopify#marketingEvent', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/marketing-event');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('gets a list of all marketing events (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/marketing_events.json').reply(200, output);

    return shopify.marketingEvent
      .list()
      .then((data) => expect(data).to.deep.equal(output.marketing_events));
  });

  it('gets a list of all marketing events (2/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/marketing_events.json?limit=50').reply(200, output);

    return shopify.marketingEvent
      .list({ limit: 50 })
      .then((data) => expect(data).to.deep.equal(output.marketing_events));
  });

  it('gets a count of all marketing events', () => {
    const output = { count: 1 };

    scope.get('/admin/marketing_events/count.json').reply(200, output);

    return shopify.marketingEvent
      .count()
      .then((data) => expect(data).to.equal(1));
  });

  it('gets a single marketing event by its ID', () => {
    const output = fixtures.res.get;

    scope.get('/admin/marketing_events/998730532.json').reply(200, output);

    return shopify.marketingEvent
      .get(998730532)
      .then((data) => expect(data).to.deep.equal(output.marketing_event));
  });

  it('creates a new marketing event', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/marketing_events.json', input).reply(201, output);

    return shopify.marketingEvent
      .create(input.marketing_event)
      .then((data) => expect(data).to.deep.equal(output.marketing_event));
  });

  it('updates a marketing event', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/marketing_events/998730532.json', input)
      .reply(200, output);

    return shopify.marketingEvent
      .update(998730532, input.marketing_event)
      .then((data) => expect(data).to.deep.equal(output.marketing_event));
  });

  it('deletes a marketing event', () => {
    scope.delete('/admin/marketing_events/998730532.json').reply(200, {});

    return shopify.marketingEvent
      .delete(998730532)
      .then((data) => expect(data).to.deep.equal({}));
  });

  it('creates marketing engagements', () => {
    const input = fixtures.req.engagements;
    const output = fixtures.res.engagements;

    scope
      .post('/admin/marketing_events/998730532/engagements.json', input)
      .reply(201, output);

    return shopify.marketingEvent
      .engagements(998730532, input.engagements)
      .then((data) => expect(data).to.deep.equal(output.engagements));
  });
});

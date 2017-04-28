describe('Shopify#applicationCredit', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/application-credit');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates an application credit', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/application_credits.json', input)
      .reply(201, output);

    return shopify.applicationCredit.create(input.application_credit)
      .then(data => expect(data).to.deep.equal(output.application_credit));
  });

  it('retrieves a single application charge by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/application_credits/445365009.json')
      .reply(200, output);

    return shopify.applicationCredit.get(445365009)
      .then(data => expect(data).to.deep.equal(output.application_credit));
  });

  it('retrieves a single application charge by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/application_credits/445365009.json?foo=bar')
      .reply(200, output);

    return shopify.applicationCredit.get(445365009, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.application_credit));
  });

  it('retrieves all application credits (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/application_credits.json')
      .reply(200, output);

    return shopify.applicationCredit.list()
      .then(data => expect(data).to.deep.equal(output.application_credits));
  });

  it('retrieves all application credits (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/application_credits.json?foo=bar')
      .reply(200, output);

    return shopify.applicationCredit.list({ foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.application_credits));
  });
});

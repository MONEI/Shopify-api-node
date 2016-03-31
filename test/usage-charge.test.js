describe('Shopify#usageCharge', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/usage-charge');
  const common = require('./common');

  const parent = 'recurring_application_charges';
  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates a new usage charge', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post(`/admin/${parent}/455696195/usage_charges.json`, input)
      .reply(201, output);

    return shopify.usageCharge.create(455696195, input.usage_charge)
      .then(data => expect(data).to.deep.equal(output.usage_charge));
  });

  it('gets a single usage charge by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get(`/admin/${parent}/455696195/usage_charges/329049015.json`)
      .reply(200, output);

    return shopify.usageCharge.get(455696195, 329049015)
      .then(data => expect(data).to.deep.equal(output.usage_charge));
  });

  it('gets a single usage charge by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get(`/admin/${parent}/455696195/usage_charges/329049015.json?foo=bar`)
      .reply(200, output);

    return shopify.usageCharge.get(455696195, 329049015, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.usage_charge));
  });

  it('gets a list of all usage charges (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get(`/admin/${parent}/455696195/usage_charges.json`)
      .reply(200, output);

    return shopify.usageCharge.list(455696195)
      .then(data => expect(data).to.deep.equal(output.usage_charges));
  });

  it('gets a list of all usage charges (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get(`/admin/${parent}/455696195/usage_charges.json?foo=bar`)
      .reply(200, output);

    return shopify.usageCharge.list(455696195, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.usage_charges));
  });
});

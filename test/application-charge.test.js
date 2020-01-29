describe('Shopify#applicationCharge', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/application-charge');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('create a new one-time application charge', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope.post('/admin/application_charges.json', input).reply(201, output);

    return shopify.applicationCharge
      .create(input.application_charge)
      .then((data) => expect(data).to.deep.equal(output.application_charge));
  });

  it('retrieves a single one-time application charge by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope.get('/admin/application_charges/675931192.json').reply(200, output);

    return shopify.applicationCharge
      .get(675931192)
      .then((data) => expect(data).to.deep.equal(output.application_charge));
  });

  it('retrieves a single one-time application charge by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/application_charges/675931192.json?foo=bar')
      .reply(200, output);

    return shopify.applicationCharge
      .get(675931192, { foo: 'bar' })
      .then((data) => expect(data).to.deep.equal(output.application_charge));
  });

  it('retrieves all one-time application charges (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/application_charges.json').reply(200, output);

    return shopify.applicationCharge
      .list()
      .then((data) => expect(data).to.deep.equal(output.application_charges));
  });

  it('retrieves all one-time application charges (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/application_charges.json?since_id=556467233')
      .reply(200, output);

    return shopify.applicationCharge
      .list({ since_id: 556467233 })
      .then((data) => expect(data).to.deep.equal(output.application_charges));
  });

  it('activates a one-time application charge', () => {
    const input = fixtures.req.activate;
    const output = fixtures.res.activate;
    const id = 675931192;

    scope
      .post(`/admin/application_charges/${id}/activate.json`, input)
      .reply(200, output);

    return shopify.applicationCharge
      .activate(id, input.application_charge)
      .then((data) => expect(data).to.deep.equal(output.application_charge));
  });
});

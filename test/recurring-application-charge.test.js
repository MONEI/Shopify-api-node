describe('Shopify#recurringApplicationCharge', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/recurring-application-charge');
  const common = require('./common');

  const resource = common.shopify.recurringApplicationCharge;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('creates a recurring application charge', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/recurring_application_charges.json', input)
      .reply(201, output);

    return resource.create(input.recurring_application_charge).then((data) => {
      expect(data).to.deep.equal(output.recurring_application_charge);
    });
  });

  it('gets a single recurring application charge by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/recurring_application_charges/455696195.json')
      .reply(200, output);

    return resource.get(455696195).then((data) => {
      expect(data).to.deep.equal(output.recurring_application_charge);
    });
  });

  it('gets a single recurring application charge by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/recurring_application_charges/455696195.json?foo=bar')
      .reply(200, output);

    return resource.get(455696195, { foo: 'bar' }).then((data) => {
      expect(data).to.deep.equal(output.recurring_application_charge);
    });
  });

  it('gets a list of all recurring application charges (1/2)', () => {
    const output = fixtures.res.list;

    scope.get('/admin/recurring_application_charges.json').reply(200, output);

    return resource.list().then((data) => {
      expect(data).to.deep.equal(output.recurring_application_charges);
    });
  });

  it('gets a list of all recurring application charges (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/recurring_application_charges.json?since_id=455696195')
      .reply(200, output);

    return resource.list({ since_id: '455696195' }).then((data) => {
      expect(data).to.deep.equal(output.recurring_application_charges);
    });
  });

  it('activates a recurring application charge', () => {
    const input = fixtures.req.activate;
    const output = fixtures.res.activate;
    const id = 455696195;

    scope
      .post(`/admin/recurring_application_charges/${id}/activate.json`, input)
      .reply(200, output);

    return resource
      .activate(id, input.recurring_application_charge)
      .then((data) => {
        expect(data).to.deep.equal(output.recurring_application_charge);
      });
  });

  it('deletes a recurring application charge', () => {
    scope
      .delete('/admin/recurring_application_charges/455696195.json')
      .reply(200);

    return resource
      .delete(455696195)
      .then((data) => expect(data).to.deep.equal({}));
  });

  it('customizes a recurring application charge', () => {
    const output = fixtures.res.customize;
    const id = 455696195;

    scope
      .put(`/admin/recurring_application_charges/${id}/customize.json`)
      .query({
        recurring_application_charge: { capped_amount: 200 }
      })
      .reply(200, output);

    return resource.customize(id, { capped_amount: 200 }).then((data) => {
      expect(data).to.deep.equal(output.recurring_application_charge);
    });
  });
});

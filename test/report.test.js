describe('Shopify#report', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/report');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of all reports (1/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/reports.json')
      .reply(200, output);

    return shopify.report.list()
      .then(data => expect(data).to.deep.equal(output.reports));
  });

  it('gets a list of all reports (2/2)', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/reports.json?since_id=517154477')
      .reply(200, output);

    return shopify.report.list({ since_id: 517154477 })
      .then(data => expect(data).to.deep.equal(output.reports));
  });

  it('gets a single report by its ID (1/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/reports/517154478.json')
      .reply(200, output);

    return shopify.report.get(517154478)
      .then(data => expect(data).to.deep.equal(output.report));
  });

  it('gets a single report by its ID (2/2)', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/reports/517154478.json?foo=bar')
      .reply(200, output);

    return shopify.report.get(517154478, { foo: 'bar' })
      .then(data => expect(data).to.deep.equal(output.report));
  });

  it('creates a new report', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/reports.json', input)
      .reply(201, output);

    return shopify.report.create(input.report)
      .then(data => expect(data).to.deep.equal(output.report));
  });

  it('updates a report', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/reports/517154478.json', input)
      .reply(200, output);

    return shopify.report.update(517154478, input.report)
      .then(data => expect(data).to.deep.equal(output.report));
  });

  it('deletes a report', () => {
    scope
      .delete('/admin/reports/517154478.json')
      .reply(200, {});

    return shopify.report.delete(517154478)
      .then(data => expect(data).to.deep.equal({}));
  });
});

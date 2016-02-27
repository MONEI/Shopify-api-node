describe('Shopify#orderRisk', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/order-risk');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('create a new order risk for an order', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post('/admin/orders/450789469/risks.json', input)
      .reply(201, output);

    return shopify.orderRisk.create(450789469, input.risk)
      .then(data => expect(data).to.deep.equal(output.risk));
  });

  it('gets a list of all order risks from an order', () => {
    const output = fixtures.res.list;

    scope
      .get('/admin/orders/450789469/risks.json')
      .reply(200, output);

    return shopify.orderRisk.list(450789469)
      .then(data => expect(data).to.deep.equal(output.risks));
  });

  it('gets a single order risk by its ID', () => {
    const output = fixtures.res.get;

    scope
      .get('/admin/orders/450789469/risks/284138680.json')
      .reply(200, output);

    return shopify.orderRisk.get(450789469, 284138680)
      .then(data => expect(data).to.deep.equal(output.risk));
  });

  it('updates an order risk', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/orders/450789469/risks/284138680.json', input)
      .reply(200, output);

    return shopify.orderRisk.update(450789469, 284138680, input.risk)
      .then(data => expect(data).to.deep.equal(output.risk));
  });

  it('deletes an order risk', () => {
    scope
      .delete('/admin/orders/450789469/risks/284138680.json')
      .reply(200, {});

    return shopify.orderRisk.delete(450789469, 284138680)
      .then(data => expect(data).to.deep.equal({}));
  });
});

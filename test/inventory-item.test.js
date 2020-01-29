describe('Shopify#inventoryItem', () => {
  'use strict';

  const expect = require('chai').expect;
  const qs = require('qs');

  const fixtures = require('./fixtures/inventory-item');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of inventory items', () => {
    const query = { ids: '808950810,39072856,457924702' };
    const output = fixtures.res.list;

    scope
      .get('/admin/inventory_items.json?' + qs.stringify(query))
      .reply(200, output);

    return shopify.inventoryItem
      .list(query)
      .then((data) => expect(data).to.deep.equal(output.inventory_items));
  });

  it('updates an existing inventory item', () => {
    const input = fixtures.req.update;
    const output = fixtures.res.update;

    scope
      .put('/admin/inventory_items/808950810.json', input)
      .reply(200, output);

    return shopify.inventoryItem
      .update(808950810, input.inventory_item)
      .then((data) => expect(data).to.deep.equal(output.inventory_item));
  });

  it('gets an inventory item by its ID', () => {
    const output = fixtures.res.get;

    scope.get('/admin/inventory_items/808950810.json').reply(200, output);

    return shopify.inventoryItem
      .get(808950810)
      .then((data) => expect(data).to.deep.equal(output.inventory_item));
  });
});

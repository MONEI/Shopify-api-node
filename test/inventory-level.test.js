describe('Shopify#inventoryLevel', () => {
  'use strict';

  const expect = require('chai').expect;
  const qs = require('qs');

  const fixtures = require('./fixtures/inventory-level');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.isDone()).to.be.true);

  it('gets a list of inventory levels', () => {
    const query = { inventory_item_ids: 808950810 };
    const output = fixtures.res.list;

    scope
      .get('/admin/inventory_levels.json?' + qs.stringify(query))
      .reply(200, output);

    return shopify.inventoryLevel.list(query)
      .then(data => expect(data).to.deep.equal(output.inventory_levels));
  });

  it('adjusts the inventory level for an inventory item at a location', () => {
    const input = fixtures.req.adjust;
    const output = fixtures.res.adjust;

    scope
      .post('/admin/inventory_levels/adjust.json')
      .reply(200, output);

    return shopify.inventoryLevel.adjust(input)
      .then(data => expect(data).to.deep.equal(output.inventory_level));
  });

  it('removes an inventory level from a location', () => {
    const query = {
      inventory_item_id: 808950810,
      location_id: 905684977
    };

    scope
      .delete('/admin/inventory_levels.json?' + qs.stringify(query))
      .reply(204);

    return shopify.inventoryLevel.delete(query)
      .then(data => expect(data).to.deep.equal({}));
  });

  it('connects an inventory item to a location', () => {
    const input = fixtures.req.connect;
    const output = fixtures.res.connect;

    scope
      .post('/admin/inventory_levels/connect.json')
      .reply(201, output);

    return shopify.inventoryLevel.connect(input)
      .then(data => expect(data).to.deep.equal(output.inventory_level));
  });

  it('sets the inventory level for an inventory item at a location', () => {
    const input = fixtures.req.set;
    const output = fixtures.res.set;

    scope
      .post('/admin/inventory_levels/set.json')
      .reply(200, output);

    return shopify.inventoryLevel.set(input)
      .then(data => expect(data).to.deep.equal(output.inventory_level));
  });
});

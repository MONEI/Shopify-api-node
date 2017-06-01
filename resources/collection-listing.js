'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a CollectionListing instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function CollectionListing(shopify) {
  this.shopify = shopify;

  this.name = 'collection_listings';
  this.key = 'collection_listing';
}

assign(CollectionListing.prototype, pick(base, [
  'get',
  'list',
  'buildUrl'
]));

/**
 * Retrieves product IDs that are published to a particular collection.
 *
 * @param {Number} id Collection ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CollectionListing.prototype.productIds = function productIds(id) {
  const url = this.buildUrl(`${id}/product_ids`);
  return this.shopify.request(url, 'GET', 'product_ids');
};

module.exports = CollectionListing;

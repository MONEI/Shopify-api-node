'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a ScriptTag instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ScriptTag(shopify) {
  this.shopify = shopify;

  this.name = 'script_tags';
  this.key = 'script_tag';
}

assign(ScriptTag.prototype, base);

module.exports = ScriptTag;

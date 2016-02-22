'use strict';

const _ = require('lodash');

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

_.assign(ScriptTag.prototype, base);

module.exports = ScriptTag;

'use strict';

const Base = require('./base');

/**
 * ScriptTag resource.
 *
 * @public
 */
class ScriptTag extends Base {
  /**
   * Creates a ScriptTag instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'script_tags';
    this.key = 'script_tag';
  }
}

module.exports = ScriptTag;

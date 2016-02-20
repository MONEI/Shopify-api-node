'use strict';

const Base = require('./base');

/**
 * Page resource.
 *
 * @public
 */
class Page extends Base {
  /**
   * Creates a Page instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'pages';
    this.key = 'page';
  }
}

module.exports = Page;

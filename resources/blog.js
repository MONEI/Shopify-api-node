'use strict';

const Base = require('./base');

/**
 * Blog resource.
 *
 * @public
 */
class Blog extends Base {
  /**
   * Creates Blog instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'blogs';
    this.key = 'blog';
  }
}

module.exports = Blog;

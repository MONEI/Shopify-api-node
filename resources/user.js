'use strict';

const Base = require('./base');

/**
 * User resource.
 *
 * @public
 */
class User extends Base {
  /**
   * Creates a User instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'users';
    this.key = 'user';
  }
}

module.exports = User;

'use strict';

const _ = require('lodash');

const base = require('../mixins/base');

/**
 * Creates a User instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function User(shopify) {
  this.shopify = shopify;

  this.name = 'users';
  this.key = 'user';
}

_.assign(User.prototype, _.pick(base, ['get', 'list', 'buildUrl']));

module.exports = User;

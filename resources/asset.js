'use strict';

const BaseChild = require('./base-child');

/**
 * Asset resource.
 *
 * @public
 */
class Asset extends BaseChild {
  /**
   * Creates an Asset instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.parentName = 'themes';
    this.name = 'assets';
    this.key = 'asset';
  }

  /**
   * Get a single asset by its ID.
   *
   * @param {Number} themeId Theme ID
   * @param {Object} params Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  get(themeId, params) {
    return super.get(themeId, undefined, params);
  }

  /**
   * Creates an asset.
   *
   * @param {Number} themeId Theme ID
   * @param {Object} params Asset properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  create(themeId, params) {
    return super.update(themeId, undefined, params);
  }

  /**
   * Updates an asset.
   *
   * @param {Number} themeId Theme ID
   * @param {Object} params Asset properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  update(themeId, params) {
    return super.update(themeId, undefined, params);
  }

  /**
   * Deletes an asset.
   *
   * @param {Number} themeId Theme ID
   * @param {Object} params Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  delete(themeId, params) {
    return super.delete(themeId, undefined, params);
  }
}

module.exports = Asset;

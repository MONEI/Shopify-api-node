'use strict';

const Base = require('./base');

/**
 * Comment resource.
 *
 * @public
 */
class Comment extends Base {
  /**
   * Creates a Comment instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.name = 'comments';
    this.key = 'comment';
  }

  /**
   * Marks a comment as spam.
   *
   * @param {Number} id Comment ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  spam(id) {
    const url = this.buildUrl(`${id}/spam`);
    return this.shopify.request(url, 'POST', undefined, {});
  }

  /**
   * Marks a comment as not spam.
   *
   * @param {Number} id Comment ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  notSpam(id) {
    const url = this.buildUrl(`${id}/not_spam`);
    return this.shopify.request(url, 'POST', undefined, {});
  }

  /**
   * Approves a pending comment.
   *
   * @param {Number} id Comment ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  approve(id) {
    const url = this.buildUrl(`${id}/approve`);
    return this.shopify.request(url, 'POST', undefined, {});
  }

  /**
   * Removes a comment.
   *
   * @param {Number} id Comment ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  remove(id) {
    const url = this.buildUrl(`${id}/remove`);
    return this.shopify.request(url, 'POST', undefined, {});
  }

  /**
   * Restores a comment.
   *
   * @param {Number} id Comment ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  restore(id) {
    const url = this.buildUrl(`${id}/restore`);
    return this.shopify.request(url, 'POST', undefined, {});
  }
}

module.exports = Comment;

'use strict';

const qs = require('qs');

const BaseChild = require('./base-child');

/**
 * Article resource.
 *
 * @public
 */
class Article extends BaseChild {
  /**
   * Creates an Article instance.
   *
   * @param {Shopify} shopify Reference to the Shopify instance
   */
  constructor(shopify) {
    super(shopify);

    this.parentName = 'blogs';
    this.name = 'articles';
    this.key = 'article';
  }

  /**
   * Gets a list of all the authors of articles.
   *
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  authors() {
    const url = Object.assign({
      path: `/admin/${this.name}/authors.json`
    }, this.shopify.baseUrl);

    return this.shopify.request(url, 'GET', 'authors');
  }

  /**
   * Gets a list of all the tags of articles.
   *
   * @param {Number} [blogId] Blog ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  tags(blogId, params) {
    let path = '/admin';

    if (!params && typeof blogId === 'object') {
      params = blogId;
      blogId = undefined;
    }

    if (blogId || blogId === 0) path += `/blogs/${blogId}`;

    path += `/${this.name}/tags.json`;

    if (params) path += '?' + qs.stringify(params);

    const url = Object.assign({ path }, this.shopify.baseUrl);
    return this.shopify.request(url, 'GET', 'tags');
  }
}

module.exports = Article;

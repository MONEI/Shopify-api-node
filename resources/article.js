'use strict';

const assign = require('lodash/assign');
const qs = require('qs');

const baseChild = require('../mixins/base-child');
const base = require('../mixins/base');

/**
 * Creates an Article instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Article(shopify) {
  this.shopify = shopify;

  this.parentName = 'blogs';
  this.name = 'articles';
  this.key = 'article';
}

assign(Article.prototype, baseChild);

/**
 * Gets a list of all the authors of articles.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Article.prototype.authors = function authors() {
  const key = 'authors';
  const url = base.buildUrl.call(this, key);
  return this.shopify.request(url, 'GET', key);
};

/**
 * Gets a list of all the tags of articles.
 *
 * @param {Number} [blogId] Blog ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Article.prototype.tags = function tags(blogId, params) {
  let pathname = '/admin';

  if (!params && typeof blogId === 'object') {
    params = blogId;
    blogId = undefined;
  }

  if (blogId || blogId === 0) pathname += `/blogs/${blogId}`;

  pathname += `/${this.name}/tags.json`;

  const url = { pathname };

  if (params) {
    url.search = '?' + qs.stringify(params, { arrayFormat: 'brackets' });
  }

  return this.shopify.request(assign(url, this.shopify.baseUrl), 'GET', 'tags');
};

module.exports = Article;

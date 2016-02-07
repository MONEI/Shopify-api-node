'use strict';
const Base = require('../components/base');

module.exports = class ProductSearchEngine extends Base {

  get entity() {
    return 'product_search_engine';
  }

  get entityRoute() {
    return '/product_search_engines';
  }

};

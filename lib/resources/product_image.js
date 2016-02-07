'use strict';
const BaseChild = require('../components/base_child');

module.exports = class ProductImage extends BaseChild {

  get entity() {
    return 'image';
  }

  get parentRoute() {
    return '/products';
  }

  get entityRoute() {
    return '/images';
  }

};

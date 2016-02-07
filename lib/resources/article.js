'use strict';
const BaseChild = require('../components/base_child');

module.exports = class Article extends BaseChild {

  get entity() {
    return 'article';
  }

  get parentRoute() {
    return '/blogs';
  }

  get entityRoute() {
    return '/articles';
  }

};

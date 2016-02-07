'use strict';
const BaseDescendant = require('../components/base_descendant');

module.exports = class MetaField extends BaseDescendant {

  get entity() {
    return 'metafield';
  }

  get entityRoute() {
    return '/metafields';
  }

};

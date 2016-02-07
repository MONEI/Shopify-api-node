'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');

module.exports = class ProductVariant extends BaseChild {

  get entity() {
    return 'variant';
  }

  get parentRoute() {
    return '/products';
  }

  get entityRoute() {
    return '/variants';
  }

  get(id) {
    let url = this._route.replace(this.parentRoute, '');
    return Adapter.get(url + '/variants/' + id + '.json');
  }

  update(id, fields) {
    let url = this._route.replace(this.parentRoute, '');
    return Adapter.put(url + '/variants/' + id + '.json', this.entity, fields);
  }

};

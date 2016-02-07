'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class Shop extends Base {

  get entity() {
    return 'shop';
  }

  get entityRoute() {
    return '/shops';
  }

  get() {
    let url = this._route.replace('shops', 'shop.json');
    return Adapter.get(url);
  }

};

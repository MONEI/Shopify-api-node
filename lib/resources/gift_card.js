'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

module.exports = class GiftCard extends Base {

  get entity() {
    return 'gift_card';
  }

  get entityRoute() {
    return '/gift_cards';
  }

  disable(id) {
    return Adapter.post(this.buildURL(id + '/disable'), this.entity, {id: id});
  }

  search(params) {
    return Adapter.get(this.buildURL('search', params));
  }

};

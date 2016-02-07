'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');

module.exports = class Asset extends BaseChild {

  get entity() {
    return 'asset';
  }

  get parentRoute() {
    return '/themes';
  }

  get entityRoute() {
    return '/assets';
  }

  create(parentId, fields) {
    return this.update(parentId, fields);
  }

  update(parentId, fields) {
    return Adapter.put(this.buildURL(parentId), this.entity, fields);
  }

  get(parentId, params) {
    if (!params.asset) {
      params.asset = {
        key: params.key
      };
    }
    delete params.key;
    return Adapter.get(this.buildURL(parentId, '', params), this.entity);
  }

  delete(parentId, key) {
    let params = {
      asset: {
        key: key
      }
    };
    return Adapter.delete(this.buildURL(parentId, '', params));
  }

};

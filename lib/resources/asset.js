/**
 * @public
 * @class Asset
 * @description
 * @extends BaseChild
 * @requires base_child
 * @requires adapter
 */
'use strict';
const BaseChild = require('../components/base_child');
const Adapter = require('../components/adapter');

class Asset extends BaseChild {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'asset';
  }

  /**
  * @public
  * @description Getter method that returns the entity's parent route.
  * @returns {string} parentRoute - entity parent route
  */
  get parentRoute() {
    return '/themes';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/assets';
  }

  /**
  * @public
  * @description
  * @param {int} parentId - the parent id
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  create(parentId, fields) {
    return this.update(parentId, fields);
  }

  /**
  * @public
  * @description
  * @param {int} parentId - the parent id
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  update(parentId, fields) {
    return Adapter.put(this.buildURL(parentId), this.entity, fields);
  }

  /**
  * @public
  * @description
  * @param {int} parentId - the parent id
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  get(parentId, params) {
    if (!params.asset) {
      params.asset = {
        key: params.key
      };
    }
    delete params.key;
    return Adapter.get(this.buildURL(parentId, '', params), this.entity);
  }

  /**
  * @public
  * @description
  * @param {int} parentId - the parent id
  * @param {string} key - the asset key
  * @returns {object} promise - request promise
  */
  delete(parentId, key) {
    let params = {
      asset: {
        key: key
      }
    };
    return Adapter.delete(this.buildURL(parentId, '', params));
  }

}

module.exports = Asset;

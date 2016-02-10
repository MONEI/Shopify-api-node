/**
 * @public
 * @class GiftCard
 * @extends BaseChild
 * @description
 * @requires base
 * @requires adapter
 */
'use strict';
const Base = require('../components/base');
const Adapter = require('../components/adapter');

class GiftCard extends Base {

  /**
  * @public
  * @description Getter method that returns the entity value.
  * @returns {string} entity - entity value
  */
  get entity() {
    return 'gift_card';
  }

  /**
  * @public
  * @description Getter method that returns the entity route.
  * @returns {string} entityRoute - entity route value
  */
  get entityRoute() {
    return '/gift_cards';
  }

  /**
  * @public
  * @param {int} id - record id
  * @description
  * @returns {object} promise - request promise
  */
  disable(id) {
    return Adapter.post(this.buildURL(id + '/disable'), this.entity, {id: id});
  }

  /**
  * @public
  * @param {object} params - get parameters
  * @description
  * @returns {object} promise - request promise
  */
  search(params) {
    return Adapter.get(this.buildURL('search', params));
  }

}

module.exports = GiftCard;

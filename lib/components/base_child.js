/**
 * @public
 * @class BaseChild
 * @description Concrete class for resources with child relationship
 * @requires pluralize
 * @requires adapter
 * @requires qs
 */
'use strict';
const pluralize = require('pluralize');
const Adapter = require('./adapter');
const qs = require('qs');

module.exports = class BaseChild {

  /**
  * @private
  * @method constructor
  * @description sets the starting route for the current resource
  */
  constructor(site) {
    this._route = site + this.parentRoute;
  }

  /**
  * @public
  * @method all
  * @description Get all child records for respective resource.
  * @param {int} parentId - id of parent
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  all(parentId, params) {
    let url = this.buildURL(parentId, '', params);
    return Adapter.get(url, pluralize(this.entity));
  }

  /**
  * @public
  * @method count
  * @description Get number of child records for respective parent resource.
  * @param {int} parentId - id of parent
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  count(parentId, params) {
    return Adapter.get(this.buildURL(parentId, 'count', params), 'count');
  }

  /**
  * @public
  * @method get
  * @description Get single child record by parent id and params.
  * @param {int} parentId - id of parent
  * @param {int} id - record id
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  get(parentId, id, params) {
    return Adapter.get(this.buildURL(parentId, id, params), this.entity);
  }

  /**
  * @public
  * @method create
  * @description Create new child record for parent id, using fields.
  * @param {int} parentId - id of parent
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  create(parentId, fields) {
    return Adapter.post(this.buildURL(parentId), this.entity, fields);
  }

  /**
  * @public
  * @method update
  * @description Update child record id using fields.
  * @param {int} parentId - id of parent
  * @param {int} id - id to be updated
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  update(parentId, id, fields) {
    return Adapter.put(this.buildURL(parentId, id), this.entity, fields);
  }

  /**
  * @public
  * @method delete
  * @description Deletes child record by parent and record id
  * @param {int} parentId - id of parent
  * @param {int} id - id to be deleted
  * @returns {object} promise - request promise
  */
  delete(parentId, id) {
    return Adapter.delete(this.buildURL(parentId, id), id);
  }


  /**
  * @public
  * @method buildURL
  * @description Builds a url, by concatenating the parentId, the route,
  * the record, the format, and the get parameters.
  * @param {int} parentId - id of parent
  * @param {string|int} record - current record
  * @param {object} params - get parameters
  * @param {string} format - format type
  * @returns {string} url - the built url link
  */
  buildURL(parentId, record, params, format) {
    let url = this._route + '/' + parentId + this.entityRoute;
    record = record ? '/' + record : '';
    format = format || 'json';
    url += record + '.' + format;
    url += params ? '?' + qs.stringify(params, {arrayFormat: 'brackets'}) : '';
    return url;
  }

};

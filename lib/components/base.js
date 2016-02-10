/**
 * @private
 * @class Base
 * @description Concrete class for resources without any child / descendant
 * relationship
 * @requires pluralize
 * @requires adapter
 * @requires qs
 */
'use strict';
const pluralize = require('pluralize');
const Adapter = require('./adapter');
const qs = require('qs');

class Base {

  /**
  * @private
  * @method constructor
  * @description sets the starting route for the current resource
  */
  constructor(site) {
    this._route = site + this.entityRoute;
  }

  /**
  * @public
  * @description Get all records for respective resource.
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  all(params) {
    return Adapter.get(this.buildURL('', params), pluralize(this.entity));
  }

  /**
  * @public
  * @description Get number of records for respective resource.
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  count(params) {
    return Adapter.get(this.buildURL('count', params), 'count');
  }

  /**
  * @public
  * @description Get single record by id and params.
  * @param {int} id - record id
  * @param {object} params - get parameters
  * @returns {object} promise - request promise
  */
  get(id, params) {
    return Adapter.get(this.buildURL(id, params), this.entity);
  }

  /**
  * @public
  * @description Create new record using fields.
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  create(fields) {
    return Adapter.post(this.buildURL(), this.entity, fields);
  }

  /**
  * @public
  * @description Update record id using fields.
  * @param {int} id - id to be updated
  * @param {object} fields - record properties
  * @returns {object} promise - request promise
  */
  update(id, fields) {
    return Adapter.put(this.buildURL(id), this.entity, fields);
  }

  /**
  * @public
  * @description Deletes record by id
  * @param {int} id - id to be deleted
  * @returns {object} promise - request promise
  */
  delete(id) {
    return Adapter.delete(this.buildURL(id), id);
  }

  /**
  * @private
  * @description Builds a url, by concatenating the route, the record,
  * the format, and the get parameters.
  * @param {string|int} record - current record
  * @param {object} params - get parameters
  * @param {string} format - format type
  * @returns {string} url - the built url link
  */
  buildURL(record, params, format) {
    record = record ? '/' + record : '';
    format = format || 'json';
    let url = this._route + record + '.' + format;
    url += params ? '?' + qs.stringify(params, {arrayFormat: 'brackets'}) : '';
    return url;
  }

}

module.exports = Base;

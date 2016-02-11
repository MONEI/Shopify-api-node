/**
 * @private
 * @class Resources
 * @description Access all available resources
 * @requires fs
 * @requires path
 */
'use strict';
const fs = require('fs');
const path = require('path');

class Resources {

  /**
  * @private
  * @description Get all available resources.
  * @param {string} site - The starting route for the current resource
  * @returns {object} resources - all available resources
  */
  static getResources(site) {
    let resourcesDir = path.join(__dirname, '..', 'resources');
    let files = fs.readdirSync(resourcesDir);
    let resources = {};
    files.map(file => {
      let Resource = require(path.join(resourcesDir, file));
      let name = Resource.name;
      name = name.charAt(0).toLowerCase() + name.slice(1);
      resources[name] = new Resource(site);
    });
    return resources;
  }

}

module.exports = Resources;

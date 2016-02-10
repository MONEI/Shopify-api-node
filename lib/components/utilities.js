/**
 * @private
 * @class Utilities
 * @description Container of utility methods which could be used in the package
 */
'use strict';
class Utilities {

  /**
  * @private
  * @static
  * @method isEmptyString
  * @description Check if the string is empty.
  * @param {string} string
  * @returns {boolean} - true / false
  */
  static isEmptyString(string) {
    return string ? string.trim().length === 0 : true;
  }

  /**
  * @private
  * @static
  * @method isNumeric
  * @description Check if the passed param is a numeric
  * @param {number} number
  * @returns {boolean} - true / false
  */
  static isNumeric(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }

  /**
  * @private
  * @static
  * @method sortObj
  * @description Sort an object by keys.
  * @param {object} obj - the object to be sorted
  * @returns {object} obj - the sorted object
  */
  static sortObj(obj) {
    let sorted = {};
    Object.keys(obj).sort().map(key => {
      sorted[key] = obj[key];
    });
    return sorted;
  }

}

module.exports = Utilities;

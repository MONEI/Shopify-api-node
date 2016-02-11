/**
 * @private
 * @class Main
 * @description The main module
 * @requires session-oauth
 * @requires session
 */
'use strict';
const AuthSession = require('./sessions/session-oauth');
const Session = require('./sessions/session');

class Main {

  /**
  * @public
  * @static
  * @method createSession
  * @description Create a session.
  * @param {string} storename - name of store to access
  * @param {string} apiKey - your api key
  * @param {string} secret - your api secret key
  * @param {string} token - persistent Oauth2 Token
  * @returns {object} - returns resources
  */
  static createSession(storename, apiKey, secret, token) {
    return new AuthSession(storename, apiKey, secret, token);
  }

  /**
  * @public
  * @static
  * @method createPrivateAppSession
  * @description Create a private session.
  * @param {string} storename - name of store to access
  * @param {string} apiKey - your api key
  * @param {string} secret - your api secret key
  * @param {object} params - session parameters
  * @returns {object} - returns resources
  */
  static createPrivateAppSession(storename, apiKey, password, params) {
    return new Session(storename, apiKey, password, params);
  }

}

module.exports = Main;

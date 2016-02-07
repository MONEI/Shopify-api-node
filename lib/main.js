'use strict';
const AuthSession = require('./sessions/session-oauth');
const Session = require('./sessions/session');

module.exports = class Main {

  static createSession(storename, apiKey, secret, params) {
    return new AuthSession(storename, apiKey, secret, params);
  }

  static createPrivateAppSession(storename, apiKey, password, params) {
    return new Session(storename, apiKey, password, params);
  }

};

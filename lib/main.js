(function() {
  var Session;

  Session = require('./session-oauth');

  exports.createSession = function(url, token, apiKey, secret, params) {
    return new Session(url, token, apiKey, secret, params);
  };

}).call(this);

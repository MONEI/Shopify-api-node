(function() {
  var Session;

  Session = require('./session-oauth');

  exports.createSession = function(storename, apiKey, secret, params) {
    return new Session(storename, apiKey, secret, params);
  };

}).call(this);

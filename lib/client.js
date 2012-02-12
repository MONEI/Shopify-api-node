(function() {
  var Client;

  Client = (function() {
    var resources;

    resources = ['blog'];

    function Client(pass, key) {
      var resource, _fn, _i, _len;
      var _this = this;
      this.pass = pass;
      this.key = key;
      if (!((pass != null) && (key != null))) {
        throw new Error('pass or key missing');
      }
      _fn = function(resource) {
        return _this["" + resource] = (function() {
          var Resource;
          Resource = require("./resources/" + resource);
          return new Resource;
        })();
      };
      for (_i = 0, _len = resources.length; _i < _len; _i++) {
        resource = resources[_i];
        _fn(resource);
      }
    }

    return Client;

  })();

  module.exports = Client;

}).call(this);

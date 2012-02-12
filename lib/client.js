(function() {
  var Client;

  Client = (function() {
    var resources;

    resources = {
      article: '',
      asset: ''
    };

    function Client(pass, key) {
      this.pass = pass;
      this.key = key;
      if (!((pass != null) && (key != null))) {
        throw new Error('pass or key missing');
      }
    }

    Client.prototype.get = function(resource, opts) {
      var Resource;
      if (!((resource != null) && (resources["" + resource] != null))) {
        throw new Error('resource id missing or invalid');
      }
      if (!(typeof resources["" + resource] === 'function')) {
        Resource = require("./resources/" + resource);
        resources["" + resource] = new Resource(opts);
      }
      return resources["" + resource];
    };

    return Client;

  })();

  module.exports = Client;

}).call(this);

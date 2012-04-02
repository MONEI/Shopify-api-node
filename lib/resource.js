(function() {
  var Resource, request;

  request = require('request');

  Resource = (function() {

    Resource.prototype.format = "json";

    function Resource() {}

    Resource.prototype.__request__ = function(path, method, body, cb) {
      var options;
      if (typeof body === 'function') {
        cb = body;
        body = null;
      }
      options = {
        uri: "https://" + this.key + ":" + this.pass + "@" + this.shop + ".myshopify.com/admin" + path,
        method: method
      };
      if (body != null) options.body = body;
      return request(options, function(err, response, body) {
        var status;
        status = parseInt(response.statusCode);
        if (status >= 300) {
          err = new Error("Status code " + status);
        } else {
          err = null;
        }
        if (err == null) {
          return process.nextTick(function() {
            return cb(err, JSON.parse(body));
          });
        } else {
          return process.nextTick(function() {
            return cb(err);
          });
        }
      });
    };

    Resource.prototype.get = function(path, cb) {
      return this.__request__(path, 'GET', cb);
    };

    Resource.prototype.post = function(path, body, cb) {
      return this.__request__(path, 'POST', JSON.stringify(body), cb);
    };

    Resource.prototype.update = function(path, body, cb) {
      return this.__request__(path, 'PUT', JSON.stringify(body), cb);
    };

    return Resource;

  })();

  module.exports = Response;

}).call(this);

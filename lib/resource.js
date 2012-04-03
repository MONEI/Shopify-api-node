(function() {
  var Resource, querystring, request;

  request = require('request');

  querystring = require('querystring');

  Resource = (function() {

    function Resource() {}

    Resource.prototype.__request__ = function(url, method, fields, callback) {
      var options, _ref;
      if (typeof fields === 'function') {
        _ref = [callback, fields], fields = _ref[0], callback = _ref[1];
      }
      options = {
        uri: url,
        method: method,
        json: true
      };
      if (fields != null) options.body = JSON.stringify(fields);
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
            var b;
            for (b in body) {
              body = body[b];
              break;
            }
            return callback(err, body);
          });
        } else {
          return process.nextTick(function() {
            console.log(body);
            return callback(err);
          });
        }
      });
    };

    Resource.prototype.get = function(url, callback) {
      return this.__request__(url, 'GET', callback);
    };

    Resource.prototype.post = function(url, fields, callback) {
      return this.__request__(url, 'POST', fields, callback);
    };

    Resource.prototype.put = function(url, fields, callback) {
      return this.__request__(url, 'PUT', fields, callback);
    };

    Resource.prototype["delete"] = function(url, callback) {
      return this.__request__(url, 'DELETE', callback);
    };

    Resource.prototype.queryString = function(url, params, format) {
      var query;
      if (format == null) format = "json";
      query = "" + url + "." + format;
      if (params) {
        query += "?";
        query += querystring.stringify(params);
      }
      return query;
    };

    return Resource;

  })();

  module.exports = new Resource;

}).call(this);

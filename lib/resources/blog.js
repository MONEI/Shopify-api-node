(function() {
  var Blog, request;

  request = require('request');

  Blog = (function() {

    function Blog(key, pass, shop) {
      this.key = key;
      this.pass = pass;
      this.shop = shop;
      if (!(pass != null) || !(key != null) || !(shop != null)) {
        throw new Error('Blog missing parameters');
      }
    }

    Blog.prototype.__get__ = function(path, cb) {
      return request("http://" + this.shop + ".myshopify.com/admin" + path, function(err, response, body) {
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

    Blog.prototype.all = function(since, cb, path) {
      if (path == null) path = '/blogs.json';
      if (typeof since === 'function') {
        cb = since;
      } else {
        if (typeof since === 'number') path += "?since_id=" + since;
      }
      return this.__get__(path, cb);
    };

    Blog.prototype.count = function(cb, path) {
      if (path == null) path = '/blogs/count.json';
      return this.__get__(path, cb);
    };

    return Blog;

  })();

  module.exports = Blog;

}).call(this);

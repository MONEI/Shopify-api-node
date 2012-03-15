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

    Blog.prototype.__request__ = function(path, method, body, cb) {
      var options;
      if (typeof body === 'function') {
        cb = body;
        body = null;
      }
      options = {
        uri: "http://" + this.shop + ".myshopify.com/admin" + path,
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

    Blog.prototype.__get__ = function(path, cb) {
      return this.__request__(path, 'GET', cb);
    };

    Blog.prototype.__post__ = function(path, body, cb) {
      return this.__request__(path, 'POST', JSON.stringify(body), cb);
    };

    Blog.prototype.__update__ = function(path, body, cb) {
      return this.__request__(path, 'PUT', JSON.stringify(body), cb);
    };

    Blog.prototype.all = function(since, cb, path) {
      if (path == null) path = '/blogs.json';
      if (typeof since === 'function') {
        cb = since;
      } else {
        path += "?since_id=" + since;
      }
      return this.__get__(path, cb);
    };

    Blog.prototype.count = function(cb, path) {
      if (path == null) path = '/blogs/count.json';
      return this.__get__(path, cb);
    };

    Blog.prototype.get = function(id, cb) {
      if (id == null) throw new Error('missing id');
      return this.__get__("/blogs/" + id + ".json", cb);
    };

    Blog.prototype.create = function(title, metas, cb, path) {
      var body;
      if (path == null) path = '/blogs.json';
      if (title == null) throw new Error('missing title');
      if (typeof metas === 'function') {
        cb = metas;
        metas = null;
      }
      body = {
        blog: {
          title: title
        }
      };
      if (metas != null) body.blog.metafields = metas;
      return this.__post__(path, body, cb);
    };

    Blog.prototype.update = function(id, field, cb) {
      var body;
      if (!(id != null) || !(field != null)) throw new Error('missing params');
      body = {
        blog: {
          id: id
        }
      };
      if (typeof field === 'string') {
        body.blog.title = field;
      } else {
        body.blog.metafields = field;
      }
      return this.__update__("/blogs/" + id + ".json", body, cb);
    };

    return Blog;

  })();

  module.exports = Blog;

}).call(this);

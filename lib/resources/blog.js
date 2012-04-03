(function() {
  var Blog, resource;

  resource = require('../resource');

  Blog = (function() {

    Blog.prototype.prefix = "/blogs";

    Blog.prototype.format = "json";

    function Blog(site) {
      this.prefix = "" + site + this.prefix;
    }

    Blog.prototype.all = function(params, callback) {
      var url;
      if (typeof params === 'function') {
        callback = params;
        params = null;
      }
      url = resource.queryString(this.prefix, params);
      console.log(url);
      return resource.get(url, callback);
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

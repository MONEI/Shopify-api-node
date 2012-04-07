(function() {
  var Base, Blog, Metafields,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Metafields = require('./metafield');

  Blog = (function(_super) {

    __extends(Blog, _super);

    Blog.prototype.slug = "blog";

    Blog.prototype.prefix = "/blogs";

    function Blog(site) {
      this.metafields = new Metafields(this.prefix, site);
      Blog.__super__.constructor.call(this, site);
    }

    return Blog;

  })(Base);

  module.exports = Blog;

}).call(this);

(function() {
  var Base, Metafields, Product,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Metafields = require('./metafield');

  Product = (function(_super) {

    __extends(Product, _super);

    Product.prototype.slug = "product";

    Product.prototype.prefix = "/products";

    function Product(site) {
      this.metafields = new Metafields(this.prefix, site);
      Product.__super__.constructor.call(this, site);
    }

    Product.prototype.events = function(id, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/events", params);
      return this.resource.get(url, "events", callback);
    };

    return Product;

  })(Base);

  module.exports = Product;

}).call(this);

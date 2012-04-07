(function() {
  var Base, Product,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Product = (function(_super) {

    __extends(Product, _super);

    Product.prototype.slug = "product";

    Product.prototype.prefix = "/products";

    function Product(site) {
      this.prefix = "" + site + this.prefix;
    }

    return Product;

  })(Base);

  module.exports = Product;

}).call(this);

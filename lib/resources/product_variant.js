(function() {
  var BaseChild, Metafields, ProductVariant,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Metafields = require('./metafield');

  ProductVariant = (function(_super) {

    __extends(ProductVariant, _super);

    ProductVariant.prototype.parent = "/products";

    ProductVariant.prototype.slug = "variant";

    ProductVariant.prototype.child = "/variants";

    function ProductVariant(site) {
      ProductVariant.__super__.constructor.call(this, site);
    }

    return ProductVariant;

  })(BaseChild);

  module.exports = ProductVariant;

}).call(this);

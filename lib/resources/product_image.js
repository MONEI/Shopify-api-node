(function() {
  var BaseChild, Metafields, ProductImage,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Metafields = require('./metafield');

  ProductImage = (function(_super) {

    __extends(ProductImage, _super);

    ProductImage.prototype.parent = "/products";

    ProductImage.prototype.slug = "image";

    ProductImage.prototype.child = "/images";

    function ProductImage(site) {
      ProductImage.__super__.constructor.call(this, site);
    }

    return ProductImage;

  })(BaseChild);

  module.exports = ProductImage;

}).call(this);

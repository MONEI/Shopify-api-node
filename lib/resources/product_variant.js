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

  ProductVariant.prototype.update = function(id, fields, callback) {
    var url;
    if (id == null) callback(new Error('missing id'));
    url = this.resource.queryString("" + this.site + this.child + "/" + id);
    return this.resource.put(url, this.slug, fields, callback);
  };

  ProductVariant.prototype.get = function(id, params, callback) {
    var url, _ref;
    if (typeof params === 'function') {
      _ref = [callback, params], params = _ref[0], callback = _ref[1];
    }
    if (id == null) callback(new Error('missing id'));
    url = this.resource.queryString("" + this.site + this.child + "/" + id, params);
    return this.resource.get(url, this.slug, callback);
  };

  module.exports = ProductVariant;

}).call(this);

(function() {
  var Base, Metafields, ProductSearchEngine,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Metafields = require('./metafield');

  ProductSearchEngine = (function(_super) {

    __extends(ProductSearchEngine, _super);

    ProductSearchEngine.prototype.slug = "product_search_engine";

    ProductSearchEngine.prototype.prefix = "/product_search_engines";

    function ProductSearchEngine(site) {
      ProductSearchEngine.__super__.constructor.call(this, site);
    }

    return ProductSearchEngine;

  })(Base);

  module.exports = ProductSearchEngine;

}).call(this);

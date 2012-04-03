(function() {
  var Product, resource;

  resource = require('../resource');

  Product = (function() {

    Product.prototype.prefix = "/products";

    function Product(site) {
      this.prefix = "" + site + this.prefix;
    }

    Product.prototype.all = function(params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = resource.queryString(this.prefix, params);
      return resource.get(url, callback);
    };

    Product.prototype.count = function(params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = resource.queryString("" + this.prefix + "/count", params);
      return resource.get(url, callback);
    };

    Product.prototype.get = function(id, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = resource.queryString("" + this.prefix + "/" + id, params);
      return resource.get(url, callback);
    };

    Product.prototype.create = function(fields, callback) {
      var url;
      if (fields.product.title == null) callback(new Error('Title is required'));
      url = resource.queryString(this.prefix);
      return resource.post(url, fields, callback);
    };

    Product.prototype.update = function(id, fields, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = resource.queryString("" + this.prefix + "/" + id);
      return resource.put(url, fields, callback);
    };

    return Product;

  })();

  module.exports = Product;

}).call(this);

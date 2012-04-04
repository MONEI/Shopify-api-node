(function() {
  var Order, resource;

  resource = require('../resource');

  Order = (function() {

    Order.prototype.slug = "order";

    Order.prototype.prefix = "/orders";

    function Order(site) {
      this.prefix = "" + site + this.prefix;
    }

    Order.prototype.all = function(params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = resource.queryString(this.prefix, params);
      return resource.get(url, "" + this.slug + "s", callback);
    };

    Order.prototype.count = function(params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = resource.queryString("" + this.prefix + "/count", params);
      return resource.get(url, "count", callback);
    };

    Order.prototype.get = function(id, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = resource.queryString("" + this.prefix + "/" + id, params);
      console.log(url);
      return resource.get(url, this.slug, callback);
    };

    Order.prototype.close = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = resource.queryString("" + this.prefix + "/" + id + "/close");
      return resource.get(url, this.slug, callback);
    };

    Order.prototype.open = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = resource.queryString("" + this.prefix + "/" + id + "/open");
      return resource.get(url, this.slug, callback);
    };

    Order.prototype.cancel = function(id, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = resource.queryString("" + this.prefix + "/" + id + "/cancel", params);
      return resource.get(url, this.slug, callback);
    };

    Order.prototype.update = function(id, fields, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = resource.queryString("" + this.prefix + "/" + id);
      return resource.put(url, this.slug, fields, callback);
    };

    Order.prototype["delete"] = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing'));
      url = resource.queryString("" + this.prefix + "/" + id);
      return resource["delete"](url, id, callback);
    };

    return Order;

  })();

  module.exports = Order;

}).call(this);

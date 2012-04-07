(function() {
  var Base, Metafields, Order,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Metafields = require('./metafield');

  Order = (function(_super) {

    __extends(Order, _super);

    Order.prototype.slug = "order";

    Order.prototype.prefix = "/orders";

    function Order(site) {
      this.metafields = new Metafields(this.prefix, site);
      Order.__super__.constructor.call(this, site);
    }

    Order.prototype.close = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/close");
      return this.resource.get(url, this.slug, callback);
    };

    Order.prototype.open = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/open");
      return this.resource.get(url, this.slug, callback);
    };

    Order.prototype.cancel = function(id, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/cancel", params);
      return this.resource.get(url, this.slug, callback);
    };

    Order.prototype.events = function(id, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/events", params);
      return this.resource.get(url, "events", callback);
    };

    return Order;

  })(Base);

  module.exports = Order;

}).call(this);

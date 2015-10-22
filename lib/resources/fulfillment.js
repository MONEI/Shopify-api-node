(function() {
  var BaseChild, Fulfillment,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Fulfillment = (function(_super) {

    __extends(Fulfillment, _super);

    Fulfillment.prototype.parent = "/orders";

    Fulfillment.prototype.slug = "fulfillment";

    Fulfillment.prototype.child = "/fulfillments";

    function Fulfillment(site) {
      Fulfillment.__super__.constructor.call(this, site);
    }

    Fulfillment.prototype.complete = function(orderId, id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + orderId + this.child + "/" + id +"/complete");
      return this.resource.post(url, this.slug, callback);
    };

    Fulfillment.prototype.cancel = function(orderId, id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + orderId + this.child + "/" + id +"/cancel");
      return this.resource.post(url, this.slug, callback);
    };

    Fulfillment.prototype["delete"] = function(orderId, id, callback) {
      return this.cancel(orderId, id, callback);
    };

    return Fulfillment;

  })(BaseChild);

  module.exports = Fulfillment;

}).call(this);

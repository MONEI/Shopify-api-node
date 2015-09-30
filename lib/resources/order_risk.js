(function() {
  var OrderRisk, BaseChild, Metafields,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Metafields = require('./metafield');

  OrderRisk = (function(_super) {

    __extends(OrderRisk, _super);

    OrderRisk.prototype.parent = "/orders";

    OrderRisk.prototype.slug = "risk";

    OrderRisk.prototype.child = "/risks";

    function OrderRisk(site) {
      OrderRisk.__super__.constructor.call(this, site);
    }

    return OrderRisk;

  })(BaseChild);

  module.exports = OrderRisk;

}).call(this);

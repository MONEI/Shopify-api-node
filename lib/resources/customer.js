(function() {
  var Base, Customer,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Customer = (function(_super) {

    __extends(Customer, _super);

    Customer.prototype.slug = "customer";

    Customer.prototype.prefix = "/customers";

    function Customer(site) {
      Customer.__super__.constructor.call(this, site);
    }

    return Customer;

  })(Base);

  module.exports = Customer;

}).call(this);
